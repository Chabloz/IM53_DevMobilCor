import Automaton from "./class/Automaton.js";
import AutomatonRenderer2D from "./class/AutomatonRenderer2D.js";
import Tweens from "./class/Tweens.js";

/* Init canvas */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

/* Init automaton */
const cellSize = 10;
const aliveProbability = 0.5;
const rows = Math.floor(ctx.canvas.clientHeight / cellSize);
const cols = Math.floor(ctx.canvas.clientWidth / cellSize);

const automaton = new Automaton({ rows, cols, aliveProbability });
const automatonRenderer = new AutomatonRenderer2D({ automaton, ctx });

/* Animate automaton color */
const tweens = new Tweens();
tweens.create({dur: 10000, from: 0, to: 360, loop: true, animate : (hue) => {
  automatonRenderer.setColorAlive(`oklch(75% 0.3 ${hue})`);
}})

/* Mainloop management (with auto pause/resume on visibility change) */
function tickUpdate(dt) {
  tweens.update(dt);
  automaton.applyRule();
}

function tickRender(t) {
  automatonRenderer.redraw();
}

MainLoop.setSimulationTimestep(1000/60);
MainLoop
  .setUpdate(tickUpdate)
  .setDraw(tickRender)
  .start();

document.addEventListener('visibilitychange', () => {
  document.hidden ? MainLoop.stop() : MainLoop.start();
});
