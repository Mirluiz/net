export interface Graphic {
  translate: (x: number, y: number) => void
  draw: (canvas: HTMLCanvasElement) => void
}
