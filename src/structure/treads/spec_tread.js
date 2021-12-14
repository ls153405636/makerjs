import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Tread } from "./tread";


export class SpecTread extends Tread {
  constructor({vParent, vIsLast, vIndex, vBorder, vClock}) {
    super({vParent, vIsLast})
    this.type = Types.TreadType.tSpec
    /**休台踏步所有轮廓一律为顺时针，clock用于判断转角对角点和前后楼梯边的关系 */
    /**此处设计不够科学合理，为临时方法，后续有时间需重新设计调整 */
    this.clock = vClock
    this.rebuildByParent({vIndex, vBorder})
  }

  rebuildByParent({vIndex, vBorder}) {
    super.rebuildByParent({vIndex})
    this.border = vBorder
    let inEdge = this.border.stepOutline.edges[this.border.inIndex[0]]
    this.stepWidth = new Edge(inEdge).getLength()
    this.position = this.border.stepOutline.edges[0].p1
    if (this.clock) {
      this.wVec = new Edge(inEdge).getVec().negate()
    } else {
      this.wVec = new Edge(inEdge).getVec()
    }
  }
}