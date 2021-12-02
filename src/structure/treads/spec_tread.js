import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Tread } from "./tread";


export class SpecTread extends Tread {
  constructor({vParent, vIsLast, vIndex, vBorder, vClock}) {
    super({vParent, vIsLast})
    this.type === Types.TreadType.tSpec
    this.clock = vClock
    this.rebuildByParent(vIndex, vBorder)
  }

  rebuildByParent({vIndex, vBorder}) {
    super.rebuildByParent({vIndex})
    this.border = vBorder
    let inEdge = this.border.stepOutline.edges[this.border.inIndex[0]]
    this.stepWidth = new Edge(inEdge).getLength()
  }
}