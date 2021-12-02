import { StairEdge } from "./stair_edge"
import { StairSide } from "./stair_side"



export class StairBorder {
  /**
   * 
   * @param {StairEdge} vInEdges 
   * @param {StairEdge} vOutEdges 
   */
  constructor (vInEdges, vOutEdges) {
    // this.in = {
    //   /**@type {Array<StairEdge>} */
    //   edges: vInEdges,
    //   girders:[], 
    //   handrails:[], 
    //   bigCol:null,
    //   name:'in',
    // }
    // this.out = {
    //    /**@type {Array<StairEdge>} */
    //   edges: vOutEdges,
    //   girders:[], 
    //   handrails:[], 
    //   bigCol:null,
    //   name:'out',
    // }
    this.in = new StairSide('in', vInEdges)
    this.out = new StairBorder('out', vOutEdges)
  }

  rebuild (vInEdges, vOutEdges) {
    // this.in.edges = vInEdges
    // this.out.edges = vOutEdges
    this.in.rebuild(vInEdges)
    this.out.rebuild(vOutEdges)
  }
}