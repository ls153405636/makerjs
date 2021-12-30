import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Stair } from "./stair"


export class UTypeStair extends Stair {
  constructor(vParent, vAgainstWall, vFloadSide ) {
    super(vParent, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    let botEdge = this.parent.hole.getEdgeByPos('bot')
    this.position = new Types.Vector3()
    this.position.y = botEdge.p1.y - this.depth2
    if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.position.x = topEdge.p2.x - this.width
    } else if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.position.x = topEdge.p1.x
    } else {
      this.position.x = new Edge(topEdge).getCenter().x - this.width / 2
    }
  }

}