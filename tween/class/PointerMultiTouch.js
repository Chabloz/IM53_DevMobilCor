import Vector2D from "./Vector2D.js";

export default class PointerMultiTouch {

  constructor() {
    window.addEventListener('pointerdown', evt => this.onTouchStart(evt));
    window.addEventListener('pointermove', evt => this.onTouchMove(evt), {passive: false});
    window.addEventListener('pointerup', evt => this.onTouchEnd(evt));
    window.addEventListener('pointercancel', evt => this.onTouchEnd(evt));
    this.pos = new Vector2D();
    this.pointers = new Map();
    this.onTouchStartCallback = () => {};
    this.onTouchMoveCallback = () => {};
    this.onTouchEndCallback = () => {};
  }

  setOnTouchStart(fn) {
    this.onTouchStartCallback = fn;
  }

  setOnTouchMove(fn) {
    this.onTouchMoveCallback = fn;
  }

  setOnTouchEnd(fn) {
    this.onTouchEndCallback = fn;
  }

  getAllPositions() {
    return [...this.pointers.values()];
  }

  onTouchStart(event) {
    const pos = new Vector2D({x: event.clientX, y: event.clientY});
    this.pointers.set(event.pointerId, pos);
    this.onTouchStartCallback(event.pointerId, pos);
  }

  onTouchMove(event) {
    const pos = this.pointers.get(event.pointerId);
    if (!pos) return;
    pos.x = event.clientX;
    pos.y = event.clientY;
    this.onTouchMoveCallback(event.pointerId, pos);
  }

  onTouchEnd(event) {
    const pos = this.pointers.get(event.pointerId);
    if (!pos) return;
    this.onTouchEndCallback(event.pointerId, pos);
    this.pointers.delete(event.pointerId);
  }

}