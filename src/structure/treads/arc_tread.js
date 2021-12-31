import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Outline } from "../../utils/outline";
import { UtilVec2 } from "../../utils/util_vec_2";
import { Tread } from "./tread";


export class ArcTread extends Tread {
  constructor({ vParent, vIndex, vPos, vIsLast, vEndLVec}) {
    super({vParent, vIsLast})
    this.type = Types.TreadType.tArc
    this.inheritL = true
    this.rebuildByParent({vPos, vIndex, vEndLVec})
  }

  rebuildByParent({vPos, vIndex, vEndLVec}) {
    super.rebuildByParent({vIndex})
    this.stepLength = this.parent.stepLength
    this.stepAngle = this.parent.stepAngle
    this.outRadius = this.parent.radius
    this.center = this.parent.center
    this.inRadius = this.parent.radius - this.stepLength
    this.clock = this.parent.clock
    this.endLVec = vEndLVec
    this.position = vPos
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    //若楼梯为顺时针，梯板倒着画，则需end向量逆时针旋转得到start向量
    let angle = this.clock ? -this.stepAngle : this.stepAngle
    this.startLVec = new UtilVec2(this.endLVec).round(angle).normalize().writePB()
    this.startAngle = new UtilVec2(this.startLVec).negate().getAngle()
    this.endAngle = new UtilVec2(this.endLVec).negate().getAngle()
    this.createArcBorder()
  }

  createArcBorder() {
    let stepOutline = this.createArcOutline(this.endLVec, this.endLVec, this.endAngle, this.endAngle)

    let treadInEndVec = this.getTreadEndVec(this.outRadius)
    let treadOutEndVec = this.getTreadEndVec(this.inRadius)
    let treadInEndAngle = new UtilVec2(treadInEndVec).negate().getAngle()
    let treadOutEndAngle = new UtilVec2(treadOutEndVec).negate().getAngle()
    let treadOutline = this.createArcOutline(treadOutEndVec, treadInEndVec, treadOutEndAngle, treadInEndAngle)

    this.border = new Types.TreadBorder({
      stepOutline: stepOutline,
      treadOutline: treadOutline,
      inIndex:[3],
      outIndex:[1],
      frontIndex:[2],
      backIndex:[0]
    })
  }

  getTreadEndVec (vRaius) {
    let backOffset = this.parent.parent.getTreadBackOffset()
    let angleOffset = Math.sinh(backOffset/vRaius)
    if (!this.clock) {
      angleOffset = -angleOffset
    }
    let startVec = new UtilVec2(this.endLVec).round(angleOffset).writePB()
    return startVec
  }

  createArcOutline (vOutEndLVec, vInEndLVec, vOutEndAngle, vInEndAngle) {
    let p1 = new Edge().setByVec(this.center, vInEndLVec, -this.outRadius).p2
    let p2 = new Edge().setByVec(this.center, vOutEndLVec, -this.inRadius).p2
    let p3 = new Edge().setByVec(this.center, this.startLVec, -this.inRadius).p2
    let p4 = new Edge().setByVec(this.center, this.startLVec, -this.outRadius).p2
    let edge1 = new Types.Edge({p1:p1, p2:p2, type:Types.EdgeType.estraight})
    let edge2 = new Types.Edge({p1:p2, 
                                p2:p3, 
                                type:Types.EdgeType.earc, 
                                position:this.center, 
                                startAngle:vOutEndAngle,
                                endAngle:this.startAngle,
                                radius:this.inRadius,
                                isClockwise:!this.clock})
    //let edge2 = new Types.Edge({p1:p2, p2:p3, type:Types.EdgeType.estraight})
    let edge3 = new Types.Edge({p1:p3, p2:p4, type:Types.EdgeType.estraight})
    //let edge4 = new Types.Edge({p1:p4, p2:p1, type:Types.EdgeType.estraight})
    let edge4 = new Types.Edge({p1:p4,
                                p2:p1,
                                type:Types.EdgeType.earc,
                                position:this.center,
                                startAngle:this.startAngle,
                                endAngle:vInEndAngle,
                                radius:this.outRadius,
                                isClockwise:this.clock})
    let outline = new Types.Outline({edges:[edge1, edge2, edge3, edge4], isClose:true, isClock:this.clock})
    outline = new Outline(outline).setZCoord(this.position.z)
    return outline
  }

  getEndWVec () {
    let angle = this.clock ? Math.PI/2 : -Math.PI/2
    let endWVec = new UtilVec2(this.endLVec).round(angle).normalize().writePB()
    return endWVec
  }

  getStartWVec () {
    let angle = this.clock ? Math.PI/2 : -Math.PI/2
    let startWVec = new UtilVec2(this.startLVec).round(angle).normalize().writePB()
    return startWVec
  }

  getStartPos() {
    return this.border.stepOutline.edges[2].p2
  }
}