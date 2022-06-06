import { Shape } from "./shape/shape"
import { Net } from "./object/net";
import { Graphic } from "./interface/graphic";
import { Vector } from "./geometry/vector";

export interface IMouse {
  clicked: boolean,
  clickStart: Vector | null
  clickEnd: Vector | null
  hover: Vector | null
}

export class Grid {
  canvas: HTMLCanvasElement
  drawTime: number
  shapes: Array<Shape>
  systemElements: Array<Graphic>
  mouseHistory: IMouse


  constructor(canvas: HTMLCanvasElement, shapes: Array<Shape>){

    this.drawTime = Date.now();
    this.canvas = canvas
    this.shapes = shapes
    this.mouseHistory = {
      clicked: false,
      clickStart: null,
      clickEnd: null,
      hover: null,
    };
    this.mouseTrackInit();

    const net = new Net(this.canvas, this.mouseHistory);
    this.systemElements = [net];
  }

  load(shapes: Array<Shape>) {
    this.shapes.push(...shapes)
  }

  paint() {
    // this.shapes.map(s => s.draw(this.canvas))
    this.systemElements.map(e => e.draw(this.canvas))
  }

  clear() {
    const ctx = this.canvas.getContext('2d');

    if(!ctx)return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  run() {
    requestAnimationFrame(() =>{
      requestAnimationFrame(this.run.bind(this))


      const now = Date.now();
      const elapsed = now - this.drawTime;

      if (elapsed > 300) {
        this.drawTime = now - (elapsed % 1000);

        this.clear();
        this.paint();
      }



    })
  }

  onClick(fn: (e: MouseEvent) => void) {
    this.canvas.addEventListener('click', fn);
  }

  onMove(fn: (e: MouseEvent) => void){
    this.canvas.addEventListener('mousemove', fn);
  }

  mouseTrackInit(){
    this.canvas.addEventListener('mousedown', (e) =>{
      this.mouseHistory.clicked = true;
      this.mouseHistory.clickStart = new Vector(e.clientX, e.clientY)
    });

    this.canvas.addEventListener('mouseup', (e) =>{
      this.mouseHistory.clicked = false;
      this.mouseHistory.clickEnd = new Vector(e.clientX, e.clientY)
    });

    this.canvas.addEventListener('mousemove', (e) =>{
      this.mouseHistory.hover = new Vector(e.clientX, e.clientY)
    });

  }
}