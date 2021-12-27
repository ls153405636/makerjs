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
    //若楼梯为顺时针，梯板倒着画，则此处应为逆时针旋转，又因threejs的xy平面与实际相反，则再转为顺时针旋转，楼梯逆时针同理
    let angle = this.clock ? -this.stepAngle : this.stepAngle
    this.startLVec = new UtilVec2(this.endLVec).round(angle).normalize().writePB()
    this.startAngle = new UtilVec2(this.startLVec).negate().getAngle()
    this.endAngle = new UtilVec2(this.endLVec).negate().getAngle()
    this.createArcBorder()
  }

  createArcBorder() {
    let stepOutline = this.createArcOutline(this.startLVec, this.startLVec, this.startAngle, this.startAngle)

    let treadInStartVec = this.getTreadStartVec(this.outRadius)
    let treadOutStartVec = this.getTreadStartVec(this.inRadius)
    let treadInStartAngle = new UtilVec2(treadInStartVec).negate().getAngle()
    let treadOutStartAngle = new UtilVec2(treadOutStartVec).negate().getAngle()
    let treadOutline = this.createArcOutline(treadOutStartVec, treadInStartVec, treadOutStartAngle, treadInStartAngle)

    this.border = new Types.TreadBorder({
      stepOutline: stepOutline,
      treadOutline: treadOutline,
      inIndex:[3],
      outIndex:[1],
      frontIndex:[0],
      backIndex:[2]
    })
  }

  getTreadStartVec (vRaius) {
    let backOffset = this.parent.parent.getTreadBackOffset()
    let angleOffset = Math.sinh(backOffset/vRaius)
    let treadAngle = this.stepAngle + angleOffset
    if (this.clock) {
      treadAngle = -treadAngle
    }
    let startVec = new UtilVec2(this.endLVec).round(treadAngle).writePB()
    return startVec
  }

  createArcOutline (vOutStartVec, vInStartVec, vOutStartAngle, vInStartAngle) {
    let p1 = this.position
    let p2 = new Edge().setByVec(this.center, this.endLVec, -this.inRadius).p2
    let p3 = new Edge().setByVec(this.center, vOutStartVec, -this.inRadius).p2
    let p4 = new Edge().setByVec(this.center, vInStartVec, -this.outRadius).p2
    let edge1 = new Types.Edge({p1:p1, p2:p2, type:Types.EdgeType.estraight})
    let edge2 = new Types.Edge({p1:p2, 
                                p2:p3, 
                                type:Types.EdgeType.earc, 
                                position:this.center, 
                                startAngle:this.endAngle,
                                endAngle:vOutStartAngle,
                                radius:this.inRadius,
                                isClockwise:!this.clock})
    // let edge2 = new Types.Edge({p1:p2, p2:p3, type:Types.EdgeType.estraight})
    let edge3 = new Types.Edge({p1:p3, p2:p4, type:Types.EdgeType.estraight})
    // let edge4 = new Types.Edge({p1:p4, p2:p1, type:Types.EdgeType.estraight})
    let edge4 = new Types.Edge({p1:p4,
                                p2:p1,
                                type:Types.EdgeType.earc,
                                position:this.center,
                                startAngle:vInStartAngle,
                                endAngle:this.endAngle,
                                radius:this.outRadius,
                                isClockwise:this.clock})
    let outline = new Types.Outline({edges:[edge1, edge2, edge3, edge4], isClose:true, isClock:this.clock})
    outline = new Outline(outline).setZCoord(this.position.z)
    return outline
  }
}