import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { Flight } from "./flight"
import { Landing } from "./landing"
import { Stair } from "./stair"
import tool from "./tool"
import { StairBorder } from "./toolComp/stair_border"
import { StairEdge } from "./toolComp/stair_edge"


export class LTypeStair extends Stair {
  constructor(vParnet, vAgainstWall, vFloadSide) {
    super(vParnet, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
    
    this.rebuild()
  }

  /**初始化楼梯段 */
  initFlights() {
    let hole = this.parent.hole
    let topEdge = hole.getEdgeByPos('top')
    let width = new Edge(topEdge).getLength()
    let num2 = Math.floor((width - Default.STEP_LENGTH) / Default.STEP_WIDTH)
    let num1 = this.realStepNum - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE) - num2
    num1 = Math.max(num1, 3)
    let depth = num1 * ((width - Default.STEP_LENGTH)/num2) + Default.STEP_LENGTH
    num2 = num2 + this.stepNumRule - 1
    this.stepNum = num1 + num2 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    this.stepHeight = Number((hole.floorHeight / this.stepNum).toFixed(2))
    let wVec2X = this.floadSide === Types.Side.si_right ? -1 : 1
    let wVec2 = new Types.Vector3({x:wVec2X}) 
    let pos2 = new Types.Vector3({x:width - this.hangOffset, y:this.girOffset})
    let pos1 = new Types.Vector3({x:this.girOffset, y:Default.STEP_LENGTH})
    if (this.floadSide === Types.Side.si_left) {
      pos2.x = this.hangOffset
      pos1.x = width - Default.STEP_LENGTH + this.girOffset
    }
    this.flights[0] = new Flight({vParent:this, 
                                  vStepNum:num1, 
                                  vStepNumRule:Types.StepNumRule.snr_n, 
                                  vIndex:0, 
                                  vTreadIndex:0, 
                                  isLast:false, 
                                  vPos:pos1, 
                                  vLVec:new Types.Vector3({x:1}), 
                                  vWVec:new Types.Vector3({y:1}), 
                                  vLength:depth - Default.STEP_LENGTH,
                                  vStartHeight: 0})
    this.flights[1] = new Flight({vParent:this, 
                                  vStepNum:num2, 
                                  vStepNumRule:this.stepNumRule, 
                                  vIndex:1, 
                                  vTreadIndex:num1 + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE), 
                                  isLast:true, 
                                  vPos:pos2, 
                                  vLVec:new Types.Vector3({y:1}), 
                                  vWVec:wVec2, 
                                  vLength:width - Default.STEP_LENGTH,
                                  vClock:this.floadSide === Types.Side.si_right,
                                  vStartHeight:(num1+Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE))*this.stepHeight})
  }

  /** 更新楼梯段*/
  updateFlights() {
    let f1 = this.flights[0]
    let f2 = this.flights[1] 
    let width = f1.stepLength + f2.length + this.hangOffset
    let wVec2X = this.floadSide === Types.Side.si_right ? -1 : 1
    let wVec2 = new Types.Vector3({x:wVec2X})  
    let pos2 = new Types.Vector3({x:width - this.hangOffset, y:this.girOffset})
    let pos1 = new Types.Vector3({x:this.girOffset, y:f2.stepLength})
    if (this.floadSide === Types.Side.si_left) {
      pos2.x = this.hangOffset
      pos1.x = width - f1.stepLength + this.girOffset
    }
    f1.rebuildByParent({vTreadIndex:this.startStepNum, 
                        vPos:pos1, 
                        vLVec:new Types.Vector3({x:1}), 
                        vWVec:new Types.Vector3({y:1}),
                        vStartHeight:this.startFlight?.getEndHeight() || 0})
    f2.rebuildByParent({vTreadIndex:this.startStepNum + f1.stepNum + this.landings[0].stepNum, 
                        vPos:pos2, 
                        vLVec:new Types.Vector3({y:1}), 
                        vWVec:wVec2,
                        vStartHeight:this.landings[0].getEndHeight(f1.getEndHeight())})
  }

  /** 根据楼梯段、起步踏、休息平台等计算总步数*/
  computeStepNum() {
    this.stepNum = 0
    for (const f of this.flights) {
      this.stepNum = this.stepNum + f.stepNum
    }
    for (const l of this.landings) {
      this.stepNum = this.stepNum + l.stepNum
    }
    let lastIndex = this.startFlight ? this.flights.length - 2 : this.flights.length - 1
    this.stepNumRule = this.flights[lastIndex].stepNumRule
    this.realStepNum = this.stepNum - this.stepNumRule + 1
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

  /** 根据楼梯段、休息平台等初始化出楼梯边界
   * 楼梯边界用于生成大梁扶手大柱小柱的结构部件
  */
  updateBorder() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let inEdges, outEdges
    if (this.floadSide === Types.Side.si_right) {
      inEdges = [
        new StairEdge(0, this.depth, 0, f2.stepLength, f1),
        new StairEdge(0, f2.stepLength, 0, 0, this.landings[0]),
        new StairEdge(0, 0, f1.stepLength, 0, this.landings[0]),
        new StairEdge(f1.stepLength, 0, this.width, 0, f2)
      ]
      outEdges = [
        new StairEdge(f1.stepLength, this.depth, f1.stepLength, f2.stepLength, f1),
        new StairEdge(f1.stepLength, f2.stepLength, this.width, f2.stepLength, f2)
      ]
    } else {
      inEdges = [
        new StairEdge(this.width, this.depth, this.width, f2.stepLength, f1),
        new StairEdge(this.width, f2.stepLength, this.width, 0, this.landings[0]),
        new StairEdge(this.width, 0, this.width - f1.stepLength, 0, this.landings[0]),
        new StairEdge(this.width - f1.stepLength, 0, 0, 0, f2)
      ]
      outEdges = [
        new StairEdge(this.width - f1.stepLength, this.depth, this.width - f1.stepLength, f2.stepLength, f1),
        new StairEdge(this.width - f1.stepLength, f2.stepLength, 0, f2.stepLength, f2)
      ]
    }
    if (this.landings[0].corBigCol) {
      outEdges[0].endCol = this.landings[0].corBigCol
      outEdges[1].startCol = this.landings[0].corBigCol
    }
    if (this.border) {
      this.border.rebuild(inEdges, outEdges)
    } else {
      this.border = new StairBorder(inEdges, outEdges)
    }
  }

  /** 更新休息平台*/
  updateLandings() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let ori = new Types.Vector3({x:this.girOffset, y:this.girOffset})
    let nextIndex = 1
    if (this.floadSide === Types.Side.si_left) {
      ori.x = f2.length
      nextIndex = 3
    }
    let border = tool.createRectOutline(ori, f1.stepLength - this.girOffset, f2.stepLength - this.girOffset)
    let paras = {vParent:this, 
                vTreadIndex:f1.stepNum + this.startStepNum, 
                vBorder:border, 
                vLastEdgeIndex:2, 
                vNextEdgeIndex:nextIndex, 
                vLastStepWidth:f1.stepWidth, 
                vNextStepWidth:f2.stepWidth,
                vStartHeight:f1.getEndHeight()}
    if (this.landings[0]) {
      this.landings[0].rebuildByParent(paras)
    } else {
      this.landings[0] = new Landing(paras)
    }
    this.landings[0].updateCorBigCol()
  }

  /**
   * 根据边界边生成大梁扶手大小柱等部件时，需对边界边进行偏移
   * 获得内侧边界边偏移时未法线发现还是法线反方向
   */
  getInSideOffsetPlus() {
    return this.floadSide === Types.Side.si_left
  }

  /**
   * 获得外侧边界边偏移时为法线方向还是法线反方向
   */
  getOutSideOffsetPlus() {
    return this.floadSide !== Types.Side.si_left
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (vKey1 === 'stepNum') {
      this.stepNum = vValue
      let rst = this.computeFlightStepNum(vValue, this.flights[0].length, this.flights[1].length)
      this.flights[0].updateItem(rst.firstNum, vKey1, vKey2)
      this.flights[1].updateItem(rst.secondNum, vKey1, vKey2)
    } else if (vKey1 === 'stepNumRule') {
      this.stepNumRule = vValue
      this.flights[1].updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  computeFlightStepNum(vStepNum, vLength1, vLength2) {
    let step_num = vStepNum + 1 - this.stepNumRule
    let fStepNum = step_num - this.landings[0].stepNum - this.startStepNum
    let firstNum = Math.ceil(vLength1 / (vLength1+vLength2) * fStepNum)
    let secondNum = fStepNum - firstNum + this.stepNumRule - 1
    return {
      firstNum: firstNum,
      secondNum: secondNum
    }
  }
  
  getGirderInEdges () {
    let edges = this.border.in.edges
    return [
      new Edge(edges[0]).combineEdge(edges[1]),
      new Edge(edges[2]).combineEdge(edges[3]),
    ]
  }
}
