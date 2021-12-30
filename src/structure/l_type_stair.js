import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { RectFlight } from "./flights/rect_flight"
import { Landing } from "./flights/landing"
import { Stair } from "./stair"
import tool from "./tool"


export class LTypeStair extends Stair {
  constructor(vParent, vAgainstWall, vFloadSide) {
    super(vParent, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
    this.f1 = null
    this.f2 = null
    this.l1 = null
    this.rebuild()
  }

  initSegments() {
    let hole = this.parent.hole
    let topEdge = hole.getEdgeByPos('top')
    let width = new Edge(topEdge).getLength()
    let num2 = Math.floor((width - Default.STEP_LENGTH) / Default.STEP_WIDTH)
    let num1 = this.realStepNum - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) - num2
    num1 = Math.max(num1, 3)
    let depth = num1 * ((width - Default.STEP_LENGTH)/num2) + Default.STEP_LENGTH
    num2 = num2 + this.stepNumRule - 1

    let vParent = this, vClock = this.floadSide === Types.Side.si_right
    this.f1 = new RectFlight({vParent, vClock,
                             vStepNum:num1, 
                             vStepNumRule:Types.StepNumRule.snr_n,  
                             vLength:depth - Default.STEP_LENGTH})
    this.f2 = new RectFlight({vParent, vClock,
                             vStepNum: num2,
                             vStepNumRule: this.stepNumRule,
                             vLength: width - Default.STEP_LENGTH})

    let vNextEdgeIndex = 1, vLastEdgeIndex = 2
    if (this.floadSide === Types.Side.si_left) {
      vNextEdgeIndex = 3
    }
    this.l1 = new Landing({vParent, vLastEdgeIndex, vNextEdgeIndex})

    this.flights.push(this.f1, this.f2)
    this.landings.push(this.l1)
    this.segments.push(this.f1, this.l1, this.f2)
  }

  updateSegments() {
    let width = this.f1.stepLength + this.f2.length + this.hangOffset
    let wVec2 = new Types.Vector3({x:-1})  
    let lVec1 = new Types.Vector3({x:1})
    let pos2 = new Types.Vector3({x:width - this.hangOffset, y:this.girOffset})
    let pos1 = new Types.Vector3({x:this.girOffset, y:this.f2.stepLength})
    if (this.floadSide === Types.Side.si_left) {
      pos2.x = this.hangOffset
      pos1.x = width - this.girOffset
      lVec1.x = -1
      wVec2.x = 1
    }
    this.f1.rebuildByParent({vIndex:0, 
                             vTreadIndex:this.startStepNum, 
                             vIsLast:false, 
                             vPos:pos1, 
                             vLVec:lVec1, 
                             vWVec:new Types.Vector3({y:1})})
    
    this.f2.rebuildByParent({vIndex:2, 
                             vTreadIndex:this.startStepNum + this.f1.stepNum + this.landings[0].stepNum,
                             vIsLast:true,
                             vPos:pos2,
                             vLVec:new Types.Vector3({y:1}),
                             vWVec:wVec2})

    let ori = new Types.Vector3({x:this.girOffset, y:this.girOffset})
    if (this.floadSide === Types.Side.si_left) {
      ori.x = this.f2.length + this.hangOffset
    }
    let border = tool.createRectOutline(ori, this.f1.stepLength - this.girOffset, this.f2.stepLength - this.girOffset)
    this.l1.rebuildByParent({vIndex:1, 
                            vTreadIndex:this.f1.stepNum + this.startStepNum,
                            vBorder:border,
                            vLastStepWidth:this.f1.stepWidth,
                            vNextStepWidth:this.f2.stepWidth})
    this.l1.updateCorBigCol()
  }

  /** 根据楼梯段、休息平台计算楼梯尺寸（不包含起步踏）*/
  computeSize() {
    let hole = this.parent.hole
    this.height = hole.floorHeight
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    this.width = f1.stepLength + f2.length + this.hangOffset
    this.depth = f2.stepLength + f1.length
  }

  /** 根据楼梯尺寸及楼梯类型计算楼梯位置*/
  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    this.position = new Types.Vector3()
    if (this.floadSide === Types.Side.si_right) {
      let rightEdge = this.parent.hole.getEdgeByPos('right')
      this.position.x = topEdge.p2.x - this.width
      if (this.againstWallType === Types.AgainstWallType.aw_right) {
        this.position.y = rightEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (rightEdge.p1.y + rightEdge.p2.y) / 2 - Default.STEP_LENGTH / 2
      } else {
        this.position.y = topEdge.p2.y
      }
    } else {
      let leftEdge = this.parent.hole.getEdgeByPos('left')
      this.position.x = topEdge.p1.x
      if (this.againstWallType === Types.AgainstWallType.aw_left) {
        this.position.y = leftEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (leftEdge.p1.y + leftEdge.p2.y) / 2 - Default.STEP_LENGTH / 2
      } else {
        this.position.y = topEdge.p1.y
      }
    }
  }
  
}
