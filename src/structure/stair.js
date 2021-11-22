import { Info } from './info'
import { Default } from './config'
import { Types } from '../types/stair_v2'
import { Flight } from './flight'
import tool from './tool'
import { Girder } from './girder'
import { Landing } from './landing'

export class Stair extends Info {
  static NOSS_TYPE_OPTIONS = [
    { value: Types.NossingType.nno, label: '无加边' },
    { value: Types.NossingType.ncommon, label: '普通加边' },
    { value: Types.NossingType.nluxury, label: '豪华加边' },
  ]
  constructor(vParnet, vAgainstWall = Types.AgainstWallType.aw_left) {
    super(vParnet)
    this.againstWallType = vAgainstWall
    this.startBeamDepth = 0
    this.exitBeamDepth = 0
    this.stepNum = Default.STEP_NUM
    this.stepNumRule = Default.STEP_NUM_RULE
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    /**@type {Array<Flight>} */
    this.flights = []
    /**@type {Array<Landing>} */
    this.landings = []
    this.bigColumns = []
    this.handrails = []
    this.girders = []
    this.smallColumns = []
    this.hangOffset = 0
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
      fOffsetStep: 20,
    })
    this.handrailParameters = new Types.HandrailParameters({
      height: Default.HAND_HEIGHT,
      source: new Types.DxfData({
        specification: Default.HAND_SPEC,
      }),
    })
  }

  computeStepHeight() {
    let step_num = 0
    for (const l of this.landings) {
      step_num = step_num + l.stepNum
    }
    if (this.flights.length) {
      let totalHeight = this.height
      for (const f of this.flights) {
        if (f.treads.length === 0) {
          step_num = 0
          break
        }
        for (const t of f.treads) {
          if (t.inheritH) {
            step_num ++
          } else {
            totalHeight = totalHeight - t.stepHeight
          }
        }
      }
      this.stepHeight = totalHeight / step_num
    } 
    if (step_num === 0) {
      this.stepHeight = this.height / this.stepNum
    }
    this.stepHeight = Number(this.stepHeight.toFixed(2))
  }

  /**
   * 计算侧边偏移
   */
   computeSideOffset() {
    this.sideOffset =
      this.treadParameters.sideNossing + this.girderParameters.depth / 2
    if (this.girderParameters.type === Types.GirderType.gslab) {
      this.sideOffset = this.girderParameters.depth / 2
    }
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
      stepHeightD: {name:'步高', value:this.stepHeight, type:'input', disabled:true},
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
    if (this.type === Types.StairType.sstright) {
      args.hangingBoard = {name:'添加挂板'}
      if(this.hangingBoard) {
        args.hangingBoard.name = '移除挂板'
      }
    }
    let stepHeightArr = []
    for (const f of this.flights) {
      for (const p of f.treads) {
        if (p.stepHeight !== this.stepHeight && !stepHeightArr.includes(p.stepHeight)) {
          args.stepHeightD.value = args.stepHeightD.value + '/' + p.stepHeight
          stepHeightArr.push(p.stepHeight)
        }
      }
    }
    return args
  }

  computeBigColOffset () {
    let bArgs = this.bigColParameters
    let bigColSize = tool.parseSpecification(bArgs.specification)
    let offset = Default.BIG_COL_GAP
    let step1 = this.flights[0].treads[0]
    let step2 = this.flights[0].treads[1]
    if (bArgs.posType === Types.BigColumnPosType.bcp_first) {
      offset = - step1.stepWidth / 2 - bigColSize.y / 2
    }
    if (bArgs.posType === Types.BigColumnPosType.bcp_second) {
      offset = -step1.stepWidth - step2.stepWidth / 2 - bigColSize.y / 2
    }
    return offset
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
      flights: tool.writeItemArrayPB(this.flights),
      smallColumns: tool.writeItemArrayPB(this.smallColumns),
      bigColumns: tool.writeItemArrayPB(this.bigColumns),
      handrails: tool.writeItemArrayPB(this.handrails),
      girders: tool.writeItemArrayPB(this.girders),
      landings: tool.writeItemArrayPB(this.landings),
      position: this.position,
    })
    if (this.hangingBoard) {
      pb.hangingBoard = this.hangingBoard
    }
    for (const l of this.landings) {
      if (l.corBigCol) {
        pb.bigColumns.push(l.corBigCol.writePB())
      }
    }
    console.log('楼梯pb:', pb)
    return pb
  }
}