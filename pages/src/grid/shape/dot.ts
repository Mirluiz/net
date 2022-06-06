import { Shape } from "./shape";


export class Dot extends Shape {
  super(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    this.color = color
  }

  draw (c: HTMLCanvasElement) {

    const ctx = c.getContext("2d");

    if(!ctx)return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
}