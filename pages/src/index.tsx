import { useEffect, useRef } from "react"
import { Grid } from './grid/main'
import { Dot } from "./grid/shape/dot"
import { Rectangle } from "./grid/shape/rectangle"

export const Index = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if(canvasRef.current){
      const grid = new Grid(canvasRef.current, [new Dot(10, 2, 'red'), new Dot(10, 20, 'green')]);
      grid.load([new Rectangle(10, 10, 'blue')])
      grid.onClick(e => {
        console.log(e.clientX    );
      })
      grid.run();
    }
    
  }, [])
  

  
  
  return(
    <>
      <canvas ref={canvasRef} height={500} width={800} style={{border: " 1px solid black"}}></canvas>
    </>
  ) 
}