interface IVector {
  x: number
  y: number
  substr: (v: Vector) => Vector
  scalar: (n: number) => Vector
}

export class Vector implements IVector{
  x: number
  y: number

  constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0
  }

  substr(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y)
  }

  scalar(n: number): Vector{
    return new Vector(this.x*n, this.y*n)
  }

}