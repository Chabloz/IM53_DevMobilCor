import Matrix2D from "./Matrix2D.js";

export default class Automaton {

  constructor({rows, cols, aliveProbability = 0, birth = [3], survival = [2, 3]}) {
    this.rows = rows;
    this.cols = cols;
    this.aliveProbability = aliveProbability;

    this.birth = new Set(birth);
    this.survival = new Set(survival);

    this.matrix = new Matrix2D(this.rows, this.cols);
    this.addRandomLive();
  }

  addRandomLive() {
    this.matrix.forEach((row, col) => {
      const isDead = Math.random() >= this.aliveProbability;
      this.matrix.set(row, col, isDead ? 0 : 1);
    })
  }

  isAlive(row, col) {
    return this.matrix.get(row, col) === 1;
  }

  switchState(row, col) {
    this.matrix.set(row, col, this.isAlive(row, col) ? 0 : 1);
  }

  applyRule() {
    const toSwitch = [];
    this.matrix.forEach((row, col) => {
      const neighbors = this.matrix.getNeighborhoodFlatTorusIndexes(row, col);
      const neighborsAlive = neighbors.filter(([row, col]) => this.isAlive(row, col));
      const nbAlives = neighborsAlive.length;
      const isAlive = this.isAlive(row, col);
      if (
        (isAlive && !this.survival.has(nbAlives))
        || (!isAlive && this.birth.has(nbAlives))
      ) toSwitch.push([row, col]);
    })
    for (const [row, col] of toSwitch) this.switchState(row, col);
  }

  getMatrix2D() {
    return this.matrix;
  }

}