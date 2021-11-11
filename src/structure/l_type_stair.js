import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Default } from "./config"
import { Flight } from "./flight"
import { Girder } from "./girder"
import { Landing } from "./landing"
import { Stair } from "./stair"
import tool from "./tool"


export class LTypeStair extends Stair {
  constructor(vParnet, vAgainstWall, vFloadSide) {
    super(vParnet, vAgainstWall)
    if (vFloadSide) {
      this.floadSide = vFloadSide
    } else {
      if (this.againstWallType === Types.AgainstWallType.aw_left) {
        this.floadSide = Types.Side.si_right
      } else {
        this.floadSide = Types.Side.si_left
      }
    }
    
    this.rebuild()
  }

  rebuild() {
    this.smallColumns = []
    this.hangOffset = this.hangingBoard?.depth || 0
    let gArgs = this.girderParameters
    this.girOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.computeSize()
    this.computePosition()
    this.computeStepHeight()
    this.computeSideOffset()
    this.updateFlights()
    this.updateLandings()
    this.stepNumRule = this.flights[1].stepNumRule
    this.stepNum =
      this.flights[0].stepNum +
      this.flights[1].stepNum +
      this.landings[0].stepNum
    this.updateBorder()
    this.updateGirders()
    this.updateCanvas('Stair')
  }

  updateBorder() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let pois = []
    if (this.floadSide === Types.Side.si_right) {
      pois = [
        new Types.Vector3({y:this.depth}),
        new Types.Vector3(),
        new Types.Vector3({x:this.width}),
        new Types.Vector3({x:this.width, y:f2.stepLength}),
        new Types.Vector3({x:f1.stepLength, y:f2.stepLength}),
        new Types.Vector3({x:f1.stepLength, y:this.depth})
      ]
    } else {
      pois = [
        new Types.Vector3({x:this.width, y:this.depth}),
        new Types.Vector3({x:this.width}),
        new Types.Vector3(),
        new Types.Vector3({y:f2.stepLength}),
        new Types.Vector3({x:f2.length, y:f2.stepLength}),
        new Types.Vector3({x:f2.length, y:this.depth})
      ]
    }
    let outline = tool.createOutlineByPois(pois)
    let edges = outline.edges
    let inEdges = {edges:[edges[0], edges[1]]}
    let frontEdges = {edges:[edges[2]]}
    let outEdges = {edges:[edges[3], edges[4]]}
    let backEdges = {edges:[edges[5]]}
    if (!this.border) {
      this.border = {
        in:{...inEdges, girders:[]},
        out:{...outEdges, girders:[]},
        front:{...frontEdges, girders:[]},
        back:{...backEdges, girders:[]},
        clock: this.floadSide === Types.Side.si_right
      }
    } else {
      this.border.in.edges = inEdges
      this.border.out.edges = outEdges
      this.border.front.edges = frontEdges
      this.border.back.edges = backEdges
    }
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    this.position = new Types.Vector3()
    if (this.floadSide === Types.Side.si_right) {
      let rightEdge = this.parent.hole.getEdgeByPos('right')
      this.position.x = topEdge.p2.x - this.width
      if (this.againstWallType === Types.AgainstWallType.aw_right) {
        this.position.y = rightEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (rightEdge.p1.y + rightEdge.p2.y) / 2
      } else {
        this.position.y = topEdge.p2.y
      }
    } else {
      let leftEdge = this.parent.hole.getEdgeByPos('left')
      this.position.x = topEdge.p1.x
      if (this.againstWallType === Types.AgainstWallType.aw_left) {
        this.position.y = leftEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (leftEdge.p1.y + leftEdge.p2.y) / 2
      } else {
        this.position.y = topEdge.p1.y
      }
    }
  }

  computeSize() {
    let hole = this.parent.hole
    this.height = hole.floorHeight
    if (this.flights.length === 0) {
      let topEdge = hole.getEdgeByPos('top')
      this.width = new Edge(topEdge).getLength()
      if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.width = this.width - 200
      }
      let f2StepNum = (this.width - Default.STEP_LENGTH) / Default.STEP_WIDTH
      let f1StepNum = this.stepNum - this.stepNumRule + 1 - f2StepNum
      this.depth = f1StepNum * Default.STEP_WIDTH + Default.STEP_LENGTH
    } else {
      let f1 = this.flights[0]
      let f2 = this.flights[1]
      this.width = f1.stepLength + f2.length + this.hangOffset
      this.depth = f2.stepLength + f1.length
    }
  }

  updateFlights () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let sL1 = f1 ? f1.stepLength : Default.STEP_LENGTH
    let sL2 = f2 ? f2.stepLength : Default.STEP_LENGTH
    let wVec1 = new Types.Vector3({y:1})
    let wVec2X = this.floadSide === Types.Side.si_right ? -1 : 1
    let wVec2 = new Types.Vector3({x:wVec2X})
    let lVec1 = new Types.Vector3({x:1})
    let lVec2 = new Types.Vector3({y:1}) 
    let pos2 = new Types.Vector3({x:this.width - this.hangOffset, y:this.girOffset})
    let pos1 = new Types.Vector3({x:this.girOffset, y:sL2})
    if (this.floadSide === Types.Side.si_left) {
      pos2.x = this.hangOffset
      pos1.x = this.width - sL1 + this.girOffset
    }
    if (this.flights.length === 2) {
      f1.rebuildByParent({vTreadIndex:0, 
                          vPos:pos1, 
                          vLVec:lVec1, 
                          vWVec:wVec1})
      f2.rebuildByParent({vTreadIndex:this.stepNum - f2.stepNum, 
                          vPos:pos2, 
                          vLVec:lVec2, 
                          vWVec:wVec2})
    } else {
      let rst = this.computeStepNum(this.stepNum, this.depth - Default.STEP_LENGTH, this.width - Default.STEP_LENGTH)
      let step_num = this.stepNum + 1 - this.stepNumRule
      this.flights[0] = new Flight({vParent:this, 
                                    vStepNum:rst.firstNum, 
                                    vStepNumRule:Types.StepNumRule.snr_n, 
                                    vIndex:0, 
                                    vTreadIndex:0, 
                                    isLast:false, 
                                    vPos:pos1, 
                                    vLVec:lVec1, 
                                    vWVec:wVec1, 
                                    vLength:this.depth - Default.STEP_LENGTH})
      this.flights[1] = new Flight({vParent:this, 
                                    vStepNum:rst.secondNum, 
                                    vStepNumRule:this.stepNumRule, 
                                    vIndex:1, 
                                    vTreadIndex:step_num - rst.secondNum, 
                                    isLast:true, 
                                    vPos:pos2, 
                                    vLVec:lVec2, 
                                    vWVec:wVec2, 
                                    vLength:this.width - Default.STEP_LENGTH})
    }
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (vKey1 === 'stepNum') {
      let rst = this.computeStepNum(vValue, this.flights[0].length, this.flights[1].length)
      this.flights[0].updateItem(rst.firstNum, vKey1, vKey2)
      this.flights[1].updateItem(rst.secondNum, vKey1, vKey2)
    } else if (vKey1 === 'stepNumRule') {
      this.flights[1].updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  computeStepNum(vStepNum, vLength1, vLength2) {
    let step_num = vStepNum + 1 - this.stepNumRule
    let fStepNum
    if (this.landings.length) {
      fStepNum = step_num - this.landings[0].stepNum
    } else {
      fStepNum = step_num - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)
    }
    let firstNum = Math.floor(vLength1 / (vLength1+vLength2) * fStepNum)
    let secondNum = fStepNum - firstNum
    return {
      firstNum: firstNum,
      secondNum: secondNum
    }
  }

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
                vTreadIndex:f1.stepNum, 
                vBorder:border, 
                vLastEdgeIndex:2, 
                vNextEdgeIndex:nextIndex, 
                vLastStepWidth:f1.stepWidth, 
                vNextStepWidth:f2.stepWidth}
    if (this.landings[0]) {
      this.landings[0].rebuildByParent(paras)
    } else {
      this.landings[0] = new Landing(paras)
    }
  }

  updateGirders() {
    let args = this.girderParameters
    this.girders = []
    if (args.type === Types.GirderType.gsaw) {
      return
      /**平面图不需要绘制锯齿梁，故先不做处理*/
    }
    let bor = this.border
    for (let i = 0; i < bor.in.edges.length; i++) {
      let e = bor.in.edges[i]
      let start = i === 0 ? new Edge(e).extendP1(args.fOffsetStep).p1 : new Edge(e).extendP1(-args.depth).p1
      let end = new Types.Vector3(e.p2)
      let outEdges = [
        new Types.Edge({
          p1: start,
          p2: end,
          type: Types.EdgeType.estraight
        })
      ]
      this.updateSideGirder(outEdges, 'in', args.depth, i, !bor.clock)
    }
    for (let i = 0; i < bor.out.edges.length; i++) {
      let e = bor.out.edges[i]
      let corOffsetX = 0
      let corOffsetY = 0
      let corCol = this.landings[0].corBigCol
      if (corCol) {
        corOffsetX = (corCol.size.x - args.depth) / 2
        corOffsetY = (corCol.size.y - args.depth) / 2
      }
      let start = i === 1 ? new Edge(e).extendP2(args.fOffsetStep).p2 : new Edge(e).extendP2(-corOffsetX).p2
      let end = i === 1 ? new Edge(e).extendP1(-corOffsetY).p1 : e.p1
      let outEdges = [
        new Types.Edge({
          p1: start,
          p2: end,
          type: Types.EdgeType.estraight
        })
      ]
      this.updateSideGirder(outEdges, 'out', args.depth, i, bor.clock)
    }
  }

  updateSideGirder (vOutEdges, vSide, vDepth, vIndex, vPlus) {
    let inEdges = []
    let bor = this.border
    for (const e of vOutEdges) {
      let inE = new Edge(e).offSet(vDepth, vPlus)
      inEdges.push(inE)
    }
    if (bor[vSide].girders[vIndex]) {
      bor[vSide].girders[vIndex].rebuildByParent(inEdges, vOutEdges)
    } else {
      bor[vSide].girders[vIndex] = new Girder(this, inEdges, vOutEdges)
    }
    this.girders.push(bor[vSide].girders[vIndex])
  }
}
