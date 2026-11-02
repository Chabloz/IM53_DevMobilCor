import { moduloEuclidian, randomInt } from '../lib/math.js';

export default class Matrix2D {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for (let row = 0; row < this.rows; row++) {
      const row = [];
      for (let col = 0; col < this.cols; col++) {
        row.push(0);
      }
      this.matrix.push(row);
    }
  }

  randomizeInt(min, max) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.set(row, col, randomInt(min, max));
      }
    }
  }

  set(row, col, val) {
    this.matrix[row][col] = val;
  }

  get(row, col) {
    return this.matrix[row][col];
  }

  isValidIndex(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  getNeighborhoodIndexes(row, col) {
    const indexes = [];
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        if (dRow == 0 && dCol === 0) continue;
        indexes.push([row + dRow, col + dCol]);
      }
    }

    return indexes.filter(([row, col]) => this.isValidIndex(row, col));
  }

  getNeighborhoodFlatTorusIndexes(row, col) {
    const indexes = [];
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        if (dRow == 0 && dCol === 0) continue;
        indexes.push([
          moduloEuclidian(row + dRow, this.rows),
          moduloEuclidian(col + dCol, this.cols)
        ]);
      }
    }
    return indexes;
  }

  count(indexes, val) {
    let count = 0;
    for (const [row, col] of indexes) {
      if (this.get(row, col) === val) {
        count++
      }
    }
    return count;
  }

  resize(newRows, newCols, val = 0) {
    const newMatrix = [];

    for (let row = 0; row < newRows; row++) {
      const newRow = [];
      for (let col = 0; col < newCols; col++) {
        const value = this.isValidIndex(row, col) ? this.get(row, col) : val;
        newRow.push(value);
      }
      newMatrix.push(newRow);
    }

    this.matrix = newMatrix;
    this.rows = newRows;
    this.cols = newCols;
  }

  forEach(callback) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        callback(row, col, this.get(row, col));
      }
    }
  }

}