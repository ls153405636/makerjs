import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Tread } from "./tread";


export class CorTread extends Tread {
  constructor({vParent, vIsLast, vIndex, vBorder, vLastEdgeIndex, vNextEdgeIndex, vClock}) {
    super({vParent, vIsLast})
    this.lastEdgeIndex = vLastEdgeIndex
    this.nextEdgeIndex = vNextEdgeIndex
    this.type = Types.TreadType.tCor
    this.clock = vClock
    this.rebuildByParent({vIndex, vBorder})
  }

  rebuildByParent({vIndex, vBorder}) {
    super({vIndex})
    this.border = vBorder
  }

  getSawGirBorder (vOrder, vArgs) {
    this.girOrder = vOrder
    return super.getSawGirBorder(vOrder, vArgs, false)
  }

  getGirUtilE (vOrder) {
    let edge = this.border.stepOutline.edges[this[vOrder+'EdgeIndex']]
    let utilE = new Edge(edge)
    utilE.offset(this.parent.parent.sideOffset, false)
    if (!this.clock) {
      utilE.reserve()
    }
    let backOffset = this.parent.parent.getTreadBackOffset()
    if (vOrder === 'last') {
      utilE.extendP1(-backOffset)
    } else {
      utilE.extendP2(backOffset)
    }
    return utilE
  }

  getGirVerHeight() {
    let refT = this.parent.treads[2]
    if (!refT) {
      let nextF = this.parent.parent.flights[this.parent.index]
      refT = nextF?.treads[0]
    }
    return refT.getGirVerHeight()
  }

  getLastTread() {
    let lastT = this.parent.treads[this.index - this.parent.treadIndex - 2]
    if (!t) {
      let lastF = this.parent.parent.flights[this.parent.index - 1]
      lastT = lastF?.treads[lastF.treads.length - 1]
    }
    return lastT
  }

  createSideSawBorder (utilE, vIsFirst, verHeight) {
    let {edges, upEdges} = super.createSideSawBorder(utilE, vIsFirst, verHeight)
    edges[0].p1.z = edges[0].p2.z
    if (this.girOrder === 'last') {
      let lastT = this.getLastTread()
      edges[0].p1 = utilE.clone().extendP1(-lastT.stepWidth).p1
    }
    return {edges, upEdges}
  }
}