import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Flight } from "./flight";

export class StraightFlight extends Flight{
  constructor({vParent, vClock}) {
    super({vParent, vClock})
    this.pos = new Types.Vector3()
    this.lVec = new Types.Vector3()
    this.wVec = new Types.Vector3()
  }

  rebuildByParent({vIndex, vTreadIndex, vIsLast, vPos, vLVec, vWVec}) {
    super.rebuildByParent({vIndex, vTreadIndex, vIsLast})
    this.pos = vPos || this.pos
    this.lVec = vLVec || this.lVec
    this.wVec = vWVec || this.wVec
  }

  getEndPosVec() {
    return {
      pos: this.pos,
      lVec: this.lVec,
      wVec: this.wVec
    }
  }

  getStartPosVec() {
    let lVec = this.lVec, wVec = this.wVec, pos
    let firstT = this.treads[0]
    if (firstT) {
      pos = firstT.border.stepOutline.edges[3].p1
    } else {
      pos = new Edge().setByVec(this.pos, this.wVec, this.length).p2
    }
    return {lVec, wVec, pos}
  }
} 