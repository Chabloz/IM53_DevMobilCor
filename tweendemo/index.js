import Vector2 from "./class/Vector2.js";
import Circle from "./class/Circle.js";
import Tweens, { easings } from "./class/Tweens.js";

/* Init canvas */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
const tweens = new Tweens();

/* Generate all circles */
const circles = [];
const radius = 10;
const gap = 10;
const rowWidth = easings.length * radius * 2 + (easings.length - 1) * gap;
const startX = (ctx.canvas.width - rowWidth) / 2 + radius;
for (const [i, ease] of easings.entries()) {
  const position = new Vector2({
    x: startX + i * (radius * 2 + gap),
    y: ctx.canvas.height * 2 / 3
  });
  const circle = new Circle({
    position,
    radius,
    velocity: new Vector2(),
    color: 'oklch(75% 0.15 30)'
  });
  circles.push(circle);

  tweens.create({
    dur: 2000, from: position.y, to: position.y - 300, loop: true, yoyo: true, ease,
    animate: y => { circle.position.y = y; }
  });

  tweens.create({
    dur: 2000, from: 30, to: 300, loop: true, yoyo: true, ease,
    animate: hue => {
      circle.color = `oklch(75% 0.15 ${hue})`;
      circle.blurColor = circle.color;
    }
  });
}

/* Main Loop (tick, render and loop management) */
function tickUpdate(dt) {
  tweens.update(dt);
}

function tickRender(t) {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  circles.forEach(c => c.draw(ctx));
}

MainLoop.setSimulationTimestep(1000/60);
MainLoop
  .setUpdate(tickUpdate)
  .setDraw(tickRender)
  .start();

document.addEventListener('visibilitychange', () => {
  document.hidden ? MainLoop.stop() : MainLoop.start();
});
