import { Types } from "../../types/stair_v2"
import { StairEdge } from "./stair_edge"



export class StairBorder {
  /**
   * 
   * @param {StairEdge} vInEdges 
   * @param {StairEdge} vOutEdges 
   */
  constructor (vInEdges, vOutEdges) {
    this.in = {
      /**@type {Array<StairEdge>} */
      edges: vInEdges,
      girders:[], 
      handrails:[], 
      bigCol:null
    }
    this.out = {
       /**@type {Array<StairEdge>} */
      edges: vOutEdges,
      girders:[], 
      handrails:[], 
      bigCol:null
    }
  }

  rebuild (vInEdges, vOutEdges) {
    this.in.edges = vInEdges
    this.out.edges = vOutEdges
  }
}