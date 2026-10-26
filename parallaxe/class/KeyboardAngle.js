import Keyboard from "./Keyboard.js";

export default class KeyboardAngle {

  constructor() {
    this.keyboard = new Keyboard();
  }

  getAngle() {
    if (this.keyboard.isKeysDown('KeyA', 'KeyW')) return Math.PI * 0.25;
    if (this.keyboard.isKeysDown('KeyA', 'KeyS')) return Math.PI * 1.75;
    if (this.keyboard.isKeysDown('KeyD', 'KeyW')) return Math.PI * 0.75;
    if (this.keyboard.isKeysDown('KeyD', 'KeyS')) return Math.PI * 1.25;
    if (this.keyboard.isKeyDown('KeyS')) return Math.PI * 1.5;
    if (this.keyboard.isKeyDown('KeyD')) return Math.PI;
    if (this.keyboard.isKeyDown('KeyW')) return Math.PI * 0.5;
    if (this.keyboard.isKeyDown('KeyA')) return 0;
    return false;
  }

}