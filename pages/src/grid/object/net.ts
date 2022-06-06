import { Graphic } from "../interface/graphic";
import { Vector } from "../geometry/vector";
import { IMouse } from "../main";

export class Net implements Graphic {
  config: { [key: string]: number | string | boolean }
  step: number
  mouseHistory: IMouse

  scene: {width: number, height: number}

  scale: number
  safe_scale: number


  offset: Vector
  safe_offset: Vector

  constructor(c: HTMLCanvasElement, mouseHistory: IMouse) {
    this.config = {
      'net': true,
    }

    this.scale = 1;
    this.safe_scale = 1;
    this.step = 5;
    this.offset = new Vector(0, 0);
    this.safe_offset = new Vector(0, 0)
    this.scene = {width: c.width, height: c.height};
    this.mouseHistory = mouseHistory;

    this.eventInit(c, mouseHistory);
  }

  translate(x: number, y: number) {
    this.offset.x = this.safe_offset.x + x;
    this.offset.y = this.safe_offset.y + y;
  }

  doScale(n: number){
    this.scale = this.scale + n;

    if (this.mouseHistory.hover){
      const xScaleOffset = (this.scene.width / this.scale - this.scene.width) * (this.mouseHistory.hover.x / this.scene.width)
      const yScaleOffset = (this.scene.height / this.scale - this.scene.height) * (this.mouseHistory.hover.y / this.scene.height)
      let newOffset = new Vector(xScaleOffset, yScaleOffset)
      this.offset =  this.safe_offset.substr(newOffset);
      // this.setSafeOffset();
    }
  }

  setSafeOffset() {
    this.safe_offset.x = this.offset.x;
    this.safe_offset.y = this.offset.y;
  }


  draw(c: HTMLCanvasElement) {

    let xMax = Math.round(c.width)
    let yMax = Math.round(c.height)

    const ctx = c.getContext("2d");

    if (!ctx) return;

    let m1 = this.getLocal(new Vector(10, 10))
    let l1 = this.getLocal(new Vector(10, yMax - 10))
    let l2 = this.getLocal(new Vector(xMax - 10, yMax - 10))
    let l3 = this.getLocal(new Vector(xMax - 10, 10))
    let l4 = this.getLocal(new Vector(10,  10))
    ctx.save()
    ctx.beginPath();
    ctx.moveTo(m1.x, m1.y);
    ctx.lineTo(l1.x, l1.y);
    ctx.lineTo(l2.x, l2.y);
    ctx.lineTo(l3.x, l3.y);
    ctx.lineTo(l4.x, l4.y);
    ctx.stroke();
    ctx.restore()

  }

  eventInit(c: HTMLCanvasElement, m: IMouse){
    c.addEventListener('mousemove', (e) => {
      if (m.clicked && m.clickStart){
        let transV = new Vector(m.clickStart.x - e.clientX, m.clickStart.y - e.clientY)
        this.translate(transV.x, transV.y)
      }
    })

    c.addEventListener('mouseup', (e) => {
      this.setSafeOffset()
    })

    c.addEventListener('wheel', (e) => {
      this.doScale(e.deltaY * -0.001)
      // this._scale = Math.min(Math.max(this.limits[0], this._scale), this.limits[1])
    })
  }

  getGlobal(v: Vector){
    return v.substr(this.offset).scalar(this.scale);
  }

  getLocal(v: Vector): Vector{
    return v.substr(this.offset).scalar(this.scale);
  }
}