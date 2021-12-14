import { Flight } from './flights/flight'
import { Types } from '../types/stair_v2'
import { Default } from './config'
import { Stair } from './stair'
import { Edge } from '../utils/edge'
import { StairEdge } from './toolComp/stair_edge'
import { StairBorder } from './toolComp/stair_border'

export class StraightStair extends Stair  {
  constructor(vParent, vAgainstWall) {
    super(vParent, vAgainstWall)
    this.type = Types.StairType.sstright
    if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = Types.Side.si_right
    }
    this.rebuild()
  }    
  
  initFlights () {
    this.stepHeight = this.parent.hole.floorHeight / this.stepNum
    this.stepHeight = Number(this.stepHeight.toFixed(2))
    let width = Default.STEP_LENGTH
    let pos, lVec
    if (this.floadSide === Types.Side.si_right) {
      pos = new Types.Vector3({x:this.girOffset, y:this.hangOffset})
      lVec = new Types.Vector3({x:1})
    } else {
      pos = new Types.Vector3({x:width - this.girOffset, y:this.hangOffset})
      lVec = new Types.Vector3({x:-1})
    }
    let paras = {vParent:this, 
                vStepNum: this.stepNum, 
                vStepNumRule: this.stepNumRule, 
                vIndex:0, 
                vTreadIndex:this.startFlight?.stepNum || 0, 
                isLast:true, 
                vPos:pos, 
                vLVec:lVec, 
                vWVec:new Types.Vector3({y:1}), 
                vLength:this.realStepNum * Default.STEP_WIDTH,
                vStartHeight:0,
                vClock: this.againstWallType !== Types.AgainstWallType.aw_right}
    this.flights[0] = new Flight(paras)
  }

  updateFlights() {
    let pos, lVec
    let width = this.flights[0].stepLength
    if (this.floadSide === Types.Side.si_right) {
      pos = new Types.Vector3({x:this.girOffset, y:this.hangOffset})
      lVec = new Types.Vector3({x:1})
    } else {
      pos = new Types.Vector3({x:width - this.girOffset, y:this.hangOffset})
      lVec = new Types.Vector3({x:-1})
    }
    let paras = {vTreadIndex:this.startFlight?.stepNum || 0, 
                vPos:pos, 
                vLVec:lVec, 
                vWVec:new Types.Vector3({y:1}), 
                vStartHeight:this.startFlight?.getEndHeight() || 0,}
    this.flights[0].rebuildByParent(paras)
  }

  updateSegments() {
    this.segments[0] = this.flights[0]
  }

  computeStepNum () {
    this.stepNum = this.flights[0].stepNum + (this.startFlight?.stepNum || 0)
    this.stepNumRule = this.flights[0].stepNumRule
    this.realStepNum = this.stepNum - this.stepNumRule + 1
  }

  computeSize() {
    this.width = this.flights[0].stepLength
    this.depth = this.flights[0].length + this.hangOffset
    this.height = this.parent.hole.floorHeight
  }

  computePosition() {
    let hole = this.parent.hole
    let topEdge = hole.getEdgeByPos('top')
    let center = new Edge(topEdge).getCenter()
    this.position = new Types.Vector3({y:center.y})
    if (this.againstWallType === Types.AgainstWallType.aw_no) {
      this.position.x = center.x - this.width / 2
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      let rightEdge = hole.getEdgeByPos('right')
      this.position.x = rightEdge.p1.x - this.width
    } else if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.position.x = topEdge.p1.x
    }
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (['stepNum','stepNumRule'].includes(vKey1)) {

      this.flights[0].updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  getItemValue(vItem) {
    if (vItem.type === 'replace') {
      return ''
    } else {
      return super.getItemValue(vItem)
    }
  }
  
  updateBorder() {
    let inEdges, outEdges
    let leftEdges = [new StairEdge(0, this.depth, 0, 0, this.flights[0])]
    let rightEdges = [new StairEdge(this.width, this.depth, this.width, 0, this.flights[0])]
    if (this.againstWallType === Types.AgainstWallType.aw_right) {
      inEdges = rightEdges
      outEdges = leftEdges
    } else {
      inEdges = leftEdges
      outEdges = rightEdges
    }
    if (this.border) {
      this.border.rebuild(inEdges, outEdges)
    } else {
      this.border = new StairBorder(inEdges, outEdges)
    }
  }

  addHangingBoard(vInfo) {
    this.hangingBoard = vInfo
    this.rebuild()
  }

  getGirderInEdges () {
    let edges = this.border.in.edges
    return [
      new Edge(edges[0])
    ]
  }

  getInSideOffsetPlus () {
    return this.againstWallType === Types.AgainstWallType.aw_right
  }

  getOutSideOffsetPlus () {
    return this.againstWallType !== Types.AgainstWallType.aw_right
  }
}


