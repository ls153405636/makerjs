import { Info } from "./info"
import { Default } from './config'
import { Types } from '../types/stair_v2'
import { Landing } from "./landing"
import { Flight } from "./flight_t"
import tool from "./tool"
import { Girder } from "./girder"


class Stair extends Info {
  static NOSS_TYPE_OPTIONS = [
    { value: Types.NossingType.nno, label: '无加边' },
    { value: Types.NossingType.ncommon, label: '普通加边' },
    { value: Types.NossingType.nluxury, label: '豪华加边' },
  ]
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
    this.smallColumns = []
    this.hangYOffset = 0
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

  getArgs() {
    let f = tool.getItemFromOptions
    let args = {
      startBeamDepth: {
        name: '起步梁厚',
        value: this.startBeamDepth,
        type: 'input',
      },
      exitBeamDepth: {
        name: '出口梁厚',
        value: this.exitBeamDepth,
        type: 'input',
      },
      stepNumRule: {
        name: '步数规则',
        value: f(this.stepNumRule, Flight.NUM_RULE_OPTIONS),
        type: 'select',
        options: Flight.NUM_RULE_OPTIONS,
      },
      stepNum: { name: '步数', value: this.stepNum, type: 'input' },
      treadParameters: { name: '踏板参数', type: 'group' },
      riserParameters: { name: '立板参数', type: 'group' },
      girderParameters: { name: '大梁参数', type: 'group' },
      handrailParameters: { name: '扶手参数', type: 'group' },
      smallColParameters: { name: '小柱参数', type: 'group' },
      bigColParameters: { name: '大柱参数', type: 'group' },
    }
    let targs = this.treadParameters
    args.treadParameters.value = {
      depth: { name: '厚度', value: targs.depth, type: 'input' },
      doubleFaceMaterial: {
        name: '双面漆',
        value: targs.doubleFaceMaterial,
        type: 'switch',
      },
      nossingType: {
        name: '加边类型',
        value: f(targs.nossingType, Stair.NOSS_TYPE_OPTIONS),
        type: 'select',
        options: Stair.NOSS_TYPE_OPTIONS,
      },
      sideNossing: {
        name: '飘边厚度',
        value: targs.sideNossing,
        type: 'input',
      },
      material: { name: '材质', value: '', type: 'replace' },
    }
    if (targs.nossingType !== Types.NossingType.nno) {
      args.treadParameters.value.nossing = {
        name: '加边厚度',
        value: targs.nossing,
        type: 'input',
      }
    }
    let rargs = this.riserParameters
    args.riserParameters.value = {
      riserExist: { name: '立板有无', value: rargs.riserExist, type: 'switch' },
    }
    if (rargs.riserExist) {
      args.riserParameters.value.depth = {
        name: '厚度',
        value: rargs.depth,
        type: 'input',
      }
      args.riserParameters.value.doubleFaceMaterial = {
        name: '双面漆',
        value: rargs.doubleFaceMaterial,
        type: 'switch',
      }
      args.riserParameters.value.material = {
        name: '材质',
        value: '',
        type: 'replace',
      }
    }
    let gargs = this.girderParameters
    args.girderParameters.value = {
      type: {
        name: '类型',
        value: f(gargs.type, Girder.GIRDER_TYPE_OPTIONS),
        type: 'select',
        options: Girder.GIRDER_TYPE_OPTIONS,
      },
      height: { name: '高度', value: gargs.height, type: 'input' },
      depth: { name: '厚度', value: gargs.depth, type: 'input' },
      material: { name: '材质', value: '', type: 'replace' },
    }
    if (this.handrails.length) {
      args.handrailParameters.value = this.handrails[0].getArgs()
    }
    if (this.smallColumns.length) {
      args.smallColParameters.value = this.smallColumns[0].getArgs()
    }
    if (this.bigColumns.length) {
      args.bigColParameters.value = this.bigColumns[0].getArgs()
    }
    return args
  }

  writePB() {
    let pb = new Types.Stair({
      uuid: this.uuid,
      startBeamDepth: this.startBeamDepth,
      exitBeamDepth: this.exitBeamDepth,
      type: this.type,
      againstWallType: this.againstWallType,
      treadParameters: this.treadParameters,
      riserParameters: this.riserParameters,
      stepParameters: new Types.StepParameters({
        stepNumRule: this.stepNumRule,
        stepNum: this.stepNum,
      }),
      flights: this.writeItemArrayPB(this.flights),
      smallColumns: this.writeItemArrayPB(this.smallColumns),
      bigColumns: this.writeItemArrayPB(this.bigColumns),
      handrails: this.writeItemArrayPB(this.handrails),
      girders: this.writeItemArrayPB(this.girders),
      landings: this.writeItemArrayPB(this.landings),
      position: this.position,
    })
    if (this.hangingBoard) {
      pb.hangingBoard = this.hangingBoard
    }
    console.log('楼梯pb:', pb)
    return pb
  }

  writeItemArrayPB(vInfoArr) {
    let pbArr = []
    for (const info of vInfoArr) {
      pbArr.push(info.writePB())
    }
    return pbArr
  }
}

export class LTypeStair extends Stair {
  constructor(vParnet, againstWall, floadSide = Types.Side.si_right) {
    super(vParnet, againstWall) 
    this.floadSide = floadSide
    this.createFlights()
    this.createLandings()
    this.computeSize()
    this.computePosition()
    this.updateCanvas('Stair')
  }

  rebuild () {
    this.stepNumRule = this.flights[1].stepNumRule
    this.stepNum = this.flights[0].stepNum + this.flights[1].stepNum + this.landings[0].stepNum
    this.computeSize()
    this.computePosition()
    this.rebuildFlights()
    this.rebuildLangdings()
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
      } else {
        this.position.y = topEdge.p2.y
      }
    } else {
      let leftEdge = this.parent.hole.getEdgeByPos('left')
      if (this.againstWallType === Types.AgainstWallType.aw_left) {
        this.position.y = leftEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (leftEdge.p1.y + leftEdge.p2.y) / 2
      } else {
        this.position.y = topEdge.p1.y
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
    let fStepNum = step_num - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)
    let firstNum = Math.floor(fStepNum / 2)
    let secondNum = fStepNum - firstNum
    let edges = this.getFlightStartEdge(Default.STEP_LENGTH, Default.STEP_LENGTH,  Default.STEP_WIDTH, secondNum)
    let flight1 = new Flight({vParent: this, 
                              vStepNum:firstNum, 
                              vStepNumRule:Types.StepNumRule.snr_n, 
                              vIndex:0, 
                              vStartEdge:edges[0], 
                              vTreadIndex:0, 
                              isLast:false})
    let flight2 = new Flight({vParent: this, 
                              vStepNum:secondNum+this.stepNumRule-1, 
                              vStepNumRule:this.stepNumRule, 
                              vIndex:1, 
                              vStartEdge:edges[1], 
                              vTreadIndex:step_num-secondNum, 
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
    let f1 = this.flights[0]
    let ori = new Types.Vector3()
    let nextIndex = 1
    if (this.floadSide === Types.Side.si_left) {
      ori.x = f2.getTotalLength()
      nextIndex = 3
    }
    let border = tool.createRectOutline(ori, Default.STEP_LENGTH, Default.STEP_LENGTH)
    this.landings.push(new Landing({vParent:this, 
                                    vTreadIndex:f1.stepNum + 1, 
                                    vBorder:border, 
                                    vLastEdgeIndex:2, 
                                    vNextEdgeIndex:nextIndex, 
                                    vLastStepWidth:Default.STEP_WIDTH, 
                                    vNextStepWidth:Default.STEP_WIDTH}))
  }

  rebuildLangdings () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let ori = new Types.Vector3()
    if (this.floadSide === Types.Side.si_left) {
      ori.x = f2.getTotalLength()
    }
    let border = tool.createRectOutline(ori, f1.stepLength, f2.stepLength)
    this.landings[0].rebuild({vTreadIndex:f1.stepNum+1, 
                              vBorder:border, 
                              vLastStepWidth: f1.stepWidth, 
                              vNextStepWidth: f2.stepWidth})
  }

}