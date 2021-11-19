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
      bigCol:null,
      name:'in',
    }
    this.out = {
       /**@type {Array<StairEdge>} */
      edges: vOutEdges,
      girders:[], 
      handrails:[], 
      bigCol:null,
      name:'out',
    }
  }

  rebuild (vInEdges, vOutEdges) {
    this.in.edges = vInEdges
    this.out.edges = vOutEdges
  }
}