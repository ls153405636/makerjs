import { Info } from "./info"
import { Default } from './config'
import { Types } from '../types/stair_v2'
import { Landing } from "./landing"
import { Flight } from "./flight_t"


class Stair extends Info {
  constructor(vParnet, againstWall = Types.AgainstWallType.aw_left) {
    super(vParnet)
    this.againstWallType = againstWall
    this.startBeamDepth = 0
    this.exitBeamDepth = 0
    this.stepNum = Default.STEP_NUM
    this.stepNumRule = Default.STEP_NUM_RULE
    this.flights = []
    this.landings = []
    this.bigColumns = []
    this.handrails = []
    this.girders = []
    this.treadParameters = new Types.TreadParameters({
      depth: Default.TREAD_DEPTH,
      nossingType: Default.TREAD_NOSSING_TYPE,
      nossing: Default.TREAD_NOSSING,
      sideNossing: Default.TREAD_SIDE_NOSSING,
    })
    this.riserParameters = new Types.RiserParameters({
      depth: Default.RISER_DEPTH,
    })
    this.smallColParameters = new Types.SmallColParameters({
      arrangeRule: Default.SMALL_COL_ARR_RULE,
      specification: Default.SMALL_COL_SPEC,
    })
    this.bigColParameters = new Types.BigColParameters({
      posType: Default.BIG_COL_POS_TYPE,
      specification: Default.BIG_COL_SPEC,
    })
    this.girderParameters = new Types.GirderParameters({
      height: Default.GIRDER_HEIGHT,
      depth: Default.GIRDER_DEPTH,
      type: Default.GIRDER_TYPE,
    })
    this.handrailParameters = new Types.HandrailParameters({
      height: Default.HAND_HEIGHT,
      source: new Types.DxfData({
        specification: Default.HAND_SPEC,
      }),
    })
  }
}

export class LTypeStair extends Stair {
  constructor(vParnet, againstWall, floadSide = Types.Side.si_right) {
    super(vParnet, againstWall) 
    this.floadSide = floadSide
    this.createFlights()
    this.createLandings()
  }

  rebuild () {
    this.stepNumRule = this.flights[1].stepNumRule
    this.stepNum = this.flights[0].stepNum + this.flights[1].stepNum + this.landings[0].stepNum
    this.computeSize()
    this.computePosition()
    this.rebuildFlights()
  }

  computePosition () {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    this.position = new Types.Vector3()
    if (this.floadSide === Types.Side.si_right) {
      let rightEdge = this.parent.hole.getEdgeByPos('right')
      this.position.x = topEdge.p2.x - this.width
      if (this.againstWallType === Types.AgainstWallType.aw_right) {
        this.position.y = rightEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (rightEdge.p1.y + rightEdge.p2.y) / 2
      }
    } else {
      let leftEdge = this.parent.hole.getEdgeByPos('left')
      if (this.againstWallType === Types.AgainstWallType.aw_left) {
        this.position.y = leftEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (leftEdge.p1.y + leftEdge.p2.y) / 2
      }
    }
    
  }

  computeSize () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    this.height = this.parent.hole.floorHeight
    this.width = f1.stepLength + f2.getTotalLength()
    this.depth = f2.stepLength + f1.getTotalLength()
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (vKey1 === 'stepNum') {

    } else if (vKey1 === 'stepNumRule') {

    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  createFlights() {
    let step_num = this.stepNum + 1 - this.stepNumRule
    let fStepNum = step_num - Landing.STEP_NUM_MAP.get(this.landings[0].type)
    let firstNum = Math.floor(fStepNum / 2)
    let secondNum = fStepNum - firstNum
    let edges = this.getFlightStartEdge(Default.STEP_LENGTH, Default.STEP_LENGTH,  Default.STEP_WIDTH, secondNum)
    let flight1 = new Flight({vParnet: this, 
                              vStepNum:firstNum, 
                              vStepNumRule:Types.StepNumRule.snr_n, 
                              vIndex:0, 
                              vStartEdge:edges[0], 
                              vTreadIndex:0, 
                              isLast:false})
    let flight2 = new Flight({vParnet: this, 
                              vStepNum:secondNum+this.stepNumRule-1, 
                              vStepNumRule:this.stepNumRule, 
                              vIndex:1, 
                              vStartEdge:edges[1], 
                              vTreadIndex:step_num-secondNum+this.stepNumRule-1, 
                              isLast:true})
    this.flights.push(flight1, flight2)
  }

  rebuildFlights() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let num2 = f2.stepNum + f2.stepNumRule - 1
    let num = this.stepNum + 1 - this.stepNumRule
    let edges = this.getFlightStartEdge(f1.stepLength, f2.stepLength, f2.stepWidth, num2)
    f1.rebuild({
      vStartEdge: edges[0],
      vTreadIndex: 0
    })
    f2.rebuild({
      vStartEdge: edges[1],
      vTreadIndex: num-num2+this.stepNumRule-1
    })
  }

  getFlightStartEdge (vLength1, vLength2, vWidth2, vNum2) {
    let edges = []
    if (this.floadSide === Types.Side.si_right) {
      edges[0] = new Types.Edge({
        p1: new Types.Vector3({y:vLength2}),
        p2: new Types.Vector3({x:vLength1, y:vLength2}),
        type: Types.EdgeType.estraight
      })
      edges[1] = new Types.Edge({
        p1: new Types.Vector3({x:vLength1 + vWidth2 * vNum2}),
        p2: new Types.Vector3({x:vLength1 + vWidth2 * vNum2, y:vLength2}),
        type: Types.EdgeType.estraight
      })
    } else {
      edges[0] = new Types.Edge({
        p1: new Types.Vector3({x:vWidth2 * vNum2, y:vLength2}),
        p2: new Types.Vector3({x:vWidth2 * vNum2 + vLength1, y:vLength2}),
        type: Types.EdgeType.estraight
      })
      edges[1] = new Types.Edge({
        p1: new Types.Vector3(),
        p2: new Types.Vector3({y:vLength2}),
        type: Types.EdgeType.estraight
      })
    }
    return edges
  }

  createLandings() {
    this.landings.push(new Landing(this))
  }

  rebuildLangding () {
    
  }

}