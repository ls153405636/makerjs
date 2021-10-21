import { Types } from "../types/stair_v2";


export class Outline {
  /**
   * 
   * @param {Types.Outline} vPB 
   */
  constructor (vPB) {
    this.edges = []
    this.isClose = vPB.isClose
    for (const e of vPB.edges) {
      this.pois.push(new THREE.Vector2(e.p1.x, e.p1.y))
    }
    if (!this.isClose) {
      let last_e = vPB.edges[vPB.edges.length - 1]
      this.pois.push(last_e.p1.x, last_e.p1.y)
    }
  }

  offset (vDis, vPlus) {

  }
}