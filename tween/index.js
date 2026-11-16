import Circle from "./class/Circle.js";
import PointerMultitouch from "./class/PointerMultiTouch.js"
import Tweens from "./class/Tweens.js";

/* Init canvas keybaord and tween manager */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
const tweens = new Tweens();

/* Init synth and midi notes */
const synth = new WebAudioTinySynth({ quality: 1, useReverb: 1 });
const audio = synth.getAudioContext();
synth.setMasterVol(0.35);
synth.setProgram(0, 89);
// C major pentatonic: C, D, E, G, A  (Do, Ré, Mi, Sol, La)
const notes = [60, 62, 64, 67, 69];

/* Handle pointer multi touch (click to generate circle and sound) */
const pointersManager = new PointerMultitouch();
const pointersData = new Map();
const circles = new Set();

pointersManager.setOnTouchStart((id, pos) => {
  if (pointersData.has(id)) return;

  // Play note
  const position = pos.clone();
  const noteInd = Math.floor(pos.x / canvas.clientWidth * notes.length);
  const note = notes[noteInd];
  audio.resume();
  synth.noteOn(0, note, 90);

  // Pulse feedback
  const circle = new Circle({position, radius: 40, color: 'oklch(95% 0 0)'});
  const pulse = tweens.create({
    dur: 500, from: 40, to: 60, loop: true, yoyo: true, ease: 'quadInOut',
    animate: r => circle.radius = r
  });
  const opacity = tweens.create({
    dur: 500, from: 1, to: 0.5,
    animate: o => circle.opacity = o,
  });

  // Store data for later use
  pointersData.set(id, { circle, pulse, opacity, note });
  circles.add(circle);
});

pointersManager.setOnTouchEnd(id => {
  const pointer = pointersData.get(id);
  if (!pointer) return;

  const {circle, note, pulse, opacity} = pointer;

  // End note
  synth.noteOff(0, note);

  // Fade out feedback
  tweens.delete(pulse);
  tweens.delete(opacity);
  tweens.create({
    dur: 500, from: circle.radius, to: circle.radius + 80,
    loop: true, yoyo: true, ease: 'quadInOut',
    animate: r => circle.radius = r
  });
  tweens.create({
    dur: 500, from: circle.opacity, to: 0,
    animate: o => circle.opacity = o,
    onComplete: () => circles.delete(circle),
  });

  // Clear data from the store
  pointersData.delete(id);
});

/* Main Loop (tick, render and loop management) */
function tickUpdate(dt) {
  tweens.update(dt);
}

function tickRender(t) {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  for (const circle of circles) {
    circle.draw(ctx);
  }
}


MainLoop.setSimulationTimestep(1000/60);
MainLoop
  .setUpdate(tickUpdate)
  .setDraw(tickRender)
  .start();

document.addEventListener('visibilitychange', () => {
  document.hidden ? MainLoop.stop() : MainLoop.start();
});