import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";


export class StairEdge {
  /**
   * 
   * @param {Types.Vector3} vP1 
   * @param {Types.Vector3} vP2 
   */
  constructor (x1, y1, x2, y2, vFlight) {
    this.p1 = new Types.Vector3({x:x1, y:y1})
    this.p2 = new Types.Vector3({x:x2, y:y2})
    this.startCol = null
    this.endCol = null
    this.flight = vFlight
    
  }
}