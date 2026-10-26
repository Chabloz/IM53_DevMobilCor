import Vector2 from "./class/Vector2.js";
import Circle from "./class/CircleInFlatTorus.js";
import { randomInt, clamp} from "./lib/math.js";
import KeyboardAngle from "./class/KeyboardAngle.js";
import PointerAngle from "./class/PointerAngle.js";

/* Init canvas keybaord and stars color */
const keyboard = new KeyboardAngle();
const pointer = new PointerAngle();
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
const starColors = [
  'rgb(155, 176, 255)',
  'rgb(255, 255, 255)',
  'rgb(255, 244, 234)',
  'rgb(255, 210, 161)',
  'rgb(255, 204, 111)',
  'rgb(255, 192, 203)',
];

/* Generate all circles */
const circles = [];
const nbCircles = Math.max(ctx.canvas.height/80 * ctx.canvas.width/80, 80);
for (let i = 0; i < nbCircles; i++) {
  const radius = randomInt(3, clamp(i/(nbCircles/50), 3, 50));
  const position = new Vector2({
    x: randomInt(0, ctx.canvas.width),
    y: randomInt(0, ctx.canvas.height)
  });
  const velocity = Vector2.fromAngle(0, radius / 100);
  const color = starColors[randomInt(0, starColors.length - 1)];
  circles.push(new Circle({ position, radius, velocity, color }));
}
circles.sort((a, b) => a.radius - b.radius);

/* Main Loop (tick, render and loop management) */
function tickUpdate(dt) {
  let angle = keyboard.getAngle();
  if (angle === false) angle = pointer.getAngle();
  if (angle === false) return;
  circles.forEach(circle => {
    circle.velocity.setAngle(angle);
    circle.update(dt, ctx.canvas.width, ctx.canvas.height)
  });
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