import { Shape } from "./shape";

export class Rectangle extends Shape {
  super(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    this.color = color
  }

  draw (c: HTMLCanvasElement) {

    const ctx = c.getContext("2d");

    if(!ctx)return;

    ctx.save();
    ctx.strokeRect(this.x, this.y, 100, 100);
    ctx.restore();
  }
}
