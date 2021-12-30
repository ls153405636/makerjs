import { RectFlight } from './flights/rect_flight'
import { Types } from '../types/stair_v2'
import { Default } from './config'
import { Stair } from './stair'
import { Edge } from '../utils/edge'

export class StraightStair extends Stair  {
  constructor(vParent, vAgainstWall) {
    super(vParent, vAgainstWall)
    this.type = Types.StairType.sstright
    if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = Types.Side.si_right
    }
    /**@type {Array<RectFlight>} */
    this.segments = []
    this.rebuild()
  }
  
  initSegments() {
    this.stepNum = Math.floor(this.parent.hole.floorHeight / Default.STEP_HEIGHT)
    this.stepHeight = this.parent.hole.floorHeight / this.stepNum
    this.stepHeight = Number(this.stepHeight.toFixed(2))
    let vParent = this
    let vStepNum = this.stepNum
    let vStepNumRule = this.stepNumRule
    let vLength = this.realStepNum * Default.STEP_WIDTH
    let vClock = this.againstWallType !== Types.AgainstWallType.aw_right
    let flight = new RectFlight({vParent, vStepNum, vStepNumRule, vLength,vClock})
    this.flights.push(flight)
    this.segments.push(flight)
  }

  updateSegments() {
    let width = Default.STEP_LENGTH
    let vPos, vLVec
    if (this.floadSide === Types.Side.si_right) {
      vPos = new Types.Vector3({x:this.girOffset, y:this.hangOffset})
      vLVec = new Types.Vector3({x:1})
    } else {
      vPos = new Types.Vector3({x:width - this.girOffset, y:this.hangOffset})
      vLVec = new Types.Vector3({x:-1})
    }
    let vWVec = new Types.Vector3({y:1})
    this.segments[0].rebuildByParent({vIndex:0, vTreadIndex:this.startStepNum, vIsLast:true, vPos, vLVec, vWVec})
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

  getItemValue(vItem) {
    if (vItem.type === 'replace') {
      return ''
    } else {
      return super.getItemValue(vItem)
    }
  }
}


