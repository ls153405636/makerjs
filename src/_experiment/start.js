import { D2 } from '../d2'
import { Circle } from '../d2/circle'
// import { Hole } from '../d2/hole'

export const experiment = () => {
  let obj = new Circle(300, 200, 50)
  new D2().add(obj)
}
