export default class AutomatonRenderer2D {

  constructor({automaton, ctx, cellSize = 10, colorAlive = 'tomato', colorDead = '#000000'}) {
    this.colorAlive = colorAlive;
    this.colorDead = colorDead;
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.automaton = automaton;
    console.log(this.automaton);
  }

  setColorAlive(color) {
    this.colorAlive = color;
  }

  draw() {
    this.automaton.getMatrix2D().forEach((row, col) => {
      const x = col * this.cellSize;
      const y = row * this.cellSize;
      const isAlive = this.automaton.isAlive(row, col);
      this.ctx.fillStyle = isAlive ? this.colorAlive : this.colorDead;
      this.ctx.fillRect(x + 1, y + 1, this.cellSize - 1, this.cellSize - 1);
    });
  }

  redraw() {
    this.ctx.canvas.width = this.ctx.canvas.clientWidth;
    this.ctx.canvas.height = this.ctx.canvas.clientHeight;
    this.draw();
  }

}