import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";


export class StairEdge {
  /**
   * 
   * @param {Types.Vector3} vP1 
   * @param {Types.Vector3} vP2 
   */
  constructor (x1, y1, x2, y2) {
    this.p1 = new Types.Vector3({x:x1, y:y1})
    this.p2 = new Types.Vector3({x:x2, y:y2})
    this.startCol = null
    this.endCol = null
    this.utilEdge = new Edge(new Types.Edge({p1:this.p1, p2:this.p2}))
  }

  /**
   * 
   * @returns {Types.Vector3}
   */
  getVec () {
    let vec = this.utilEdge.vec
    return new Types.Vector3({
      x:vec.x,
      y:vec.y
    })
  }

  /**
   * 
   * @param {*} vDis 
   * @param {*} vPlus 
   * @returns {Types.Edge}
   */
  offSet (vDis, vPlus = true) {
    return this.utilEdge.offSet(vDis, vPlus = true)
  }
}