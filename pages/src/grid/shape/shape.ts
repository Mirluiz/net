import { Graphic } from "../interface/graphic"

export class Shape implements Graphic {

  x: number
  y: number
  color: string

  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    this.color = color
  }

  translate (x: number, y: number) {}

  draw (c: HTMLCanvasElement) {}
}
