import { StairEdge } from "./stair_edge"

export class StairSide {
  constructor(vSideName, vEdges) {
    this.sideName = vSideName
    this.girders = []
    /**@type {Array<StairEdge>} */
    this.edges = vEdges
    this.girders = []
    this.handrails = []
    this.bigCol = null
  }

  rebuild(vEdges) {
    this.edges = vEdges
  }
}