export default class PointerAngle {

  constructor(reverse = true) {
    window.addEventListener('pointerdown', evt => this.onTouchStart(evt));
    window.addEventListener('pointermove', evt => this.onTouchMove(evt), {passive: false});
    window.addEventListener('pointerup', evt => this.onTouchEnd(evt));
    this.startX = 0;
    this.startY = 0;
    this.angle = false;
    this.reverse = reverse;
    this.moving = false;
  }

  getAngle() {
    return this.angle;
  }

  onTouchStart(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.moving = true;
  }

  onTouchMove(event) {
    if (!this.moving) return;
    const endX = event.clientX;
    const endY = event.clientY;
    const diffX = endX - this.startX;
    const diffY = endY - this.startY;
    this.angle = Math.atan2(diffY, diffX);
    if (this.reverse) {
      this.angle = (this.angle + Math.PI) % (2 * Math.PI);
    };
  }

  onTouchEnd(event) {
    this.angle = false;
    this.moving = false;
  }

}