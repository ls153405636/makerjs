import { StairEdge } from "./stair_edge"

export class StairSide {
  constructor(vSideName, vEdges) {
    this.sideName = vSideName
    this.girders = []
    /**@type {Array<StairEdge>} */
    this.edges = vEdges
  }

  rebuild(vEdges) {
    this.edges = vEdges
  }
}