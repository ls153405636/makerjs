import { Info } from './info'
import { Default, StructConfig } from './config'
import { Types } from '../types/stair_v2'
import tool from './tool'
import { Girder } from './girder'
import { Landing } from './flights/landing'
import { Edge } from '../utils/edge'
import { BigColumn } from "./big_column"
import { Handrail } from "./handrail"
import { SmallColumn } from "./small_column"
import { StartFlight } from './flights/start_flight'
import { StairSide } from './toolComp/stair_side'
import { D2Config } from '../d2/config'
import { D3Config } from '../d3/d3_config'
import { HangingBoard } from './hanging_board'
import { Flight } from './flights/flight'

export class Stair extends Info {
  static NOSS_TYPE_OPTIONS = [
    { value: Types.NossingType.nno, label: '无加边' },
    { value: Types.NossingType.ncommon, label: '普通加边' },
    { value: Types.NossingType.nluxury, label: '豪华加边' },
  ]

  static EXIT_TYPE_OPTIONS = [
    {value: Types.StairExitType.se_riser, label:'出口立板'},
    {value: Types.StairExitType.se_hangingBoard, label:'挂板'},
    {value: Types.StairExitType.se_none, label:'无'}
  ]
  constructor(vParnet, vAgainstWall = Types.AgainstWallType.aw_left) {
    super(vParnet)
    this.againstWallType = vAgainstWall
    this.startBeamDepth = 0
    this.exitBeamDepth = 0
    this.stairMoveT = 0
    this.stairMoveR = 0
    this.stepNum = Default.STEP_NUM
    this.stepNumRule = Default.STEP_NUM_RULE
    this.realStepNum = this.stepNum - this.stepNumRule + 1
    /**@type {Array<Flight>} */
    this.flights = []
    /**@type {Array<Landing>} */
    this.landings = []
    /**@type {Array<BigColumn>} */
    this.bigColumns = []
    /**@type {Array<Handrail>} */
    this.handrails = []
    /**@type {Array<Girder>} */
    this.girders = []
    /**@type {Array<SmallColumn>} */
    this.smallColumns = []
    this.hangOffset = 0
    /**@type {StartFlight} */
    this.startFlight = null
    /**@type {HangingBoard} */
    this.hangingBoard = null
    /**@type {Array<Flight>} */
    this.segments = []
    this.exitType = Default.EXIT_TYPE
    this.treadParameters = new Types.TreadParameters({
      depth: Default.TREAD_DEPTH,
      nossingType: Default.TREAD_NOSSING_TYPE,
      nossing: Default.TREAD_NOSSING,
      sideNossing: Default.TREAD_SIDE_NOSSING,
      material: Default.TREAD_MATERIAL
    })
    this.riserParameters = new Types.RiserParameters({
      riserExist: true,
      depth: Default.RISER_DEPTH,
      material: Default.MATERIAL
    })
    this.smallColParameters = new Types.SmallColParameters({
      arrangeRule: Default.SMALL_COL_ARR_RULE,
      specification: Default.SMALL_COL_SPEC,
      source: Default.SMALL_COL_SRC
    })
    this.bigColParameters = new Types.BigColParameters({
      posType: Default.BIG_COL_POS_TYPE,
      specification: Default.BIG_COL_SPEC,
      source: Default.BIG_COL_SRC
    })
    this.girderParameters = new Types.GirderParameters({
      height: Default.GIRDER_HEIGHT,
      depth: Default.GIRDER_DEPTH,
      type: Default.GIRDER_TYPE,
      fOffsetStep: Default.GIRDER_F_OFFSET,
      bSuppotHeight: Default.GIRDER_B_HEIGHT,
      aboveHeight: Default.GIRDER_ABOVE_HEIGHT,
      material: Default.MATERIAL
    })
    this.handrailParameters = new Types.HandrailParameters({
      height: Default.HAND_HEIGHT,
      source: new Types.DxfData({
        specification: Default.HAND_SPEC,
      }),
      material: Default.MATERIAL
    })
    this.inSide = new StairSide('in')
    this.outSide = new StairSide('out')
  }

  rebuild() {
    if (this.exitType === Types.StairExitType.se_hangingBoard) {
      this.hangOffset = this.hangingBoard?.depth || Default.HANG_BOARD_DEPTH
    } else {
      this.hangingBoard = null
      this.hangOffset = 0
    }
    let gArgs = this.girderParameters
    this.girOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.startStepNum = this.startFlight?.stepNum || 0
    this.computeSideOffset()
    if (!this.segments.length) {
      this.initSegments()
    }
    this.computeSize()
    this.computePosition()
    this.computeStepNum()
    this.computeStepHeight()
    this.updateStartHeight()
    this.updateStairPositon()
    this.updateSegments()
    if (!this.startFlight) {
      this.addStartFlight()
    }
    this.updateStartFlight()
    this.updatehangingBoard()
    this.updateGirders()
    this.updateHandrails()
    this.updateSmallColumns()
    this.updateBigColumns()
    this.updateCanvas('Stair')
  }

  /**初始化楼梯段结构 */
  initSegments() {}

  /** 根据楼梯段、起步踏、休息平台等计算总步数*/
  computeStepNum() {
    this.stepNum = 0
    for (const f of this.segments) {
      this.stepNum += f.stepNum
    }
    this.stepNum += (this.startFlight?.stepNum || 0)
    this.stepNumRule = this.segments[this.segments.length - 1].stepNumRule
    this.realStepNum = this.stepNum - this.stepNumRule + 1
  }

  /**
   *每次楼梯整体更新前，先更新每段楼梯的起始高度
   *
   * @memberof Stair
   */
  updateStartHeight() {
    let startHeight = this.startFlight?.getEndHeight() || 0
    for (const f of this.segments) {
      f.setStartHeight(startHeight)
      startHeight = f.getEndHeight()
    }
  }

  /** 根据楼梯段、休息平台计算楼梯尺寸（不包含起步踏）*/
  computeSize() {}

  /** 根据楼梯尺寸及楼梯类型计算楼梯位置*/
  computePosition() {}

  /**更新楼梯段结构 */
  updateSegments() {}

  delInfo() {
    let widget = D2Config.WIDGETS.get(this.uuid)
    let model = D3Config.MODELS.get(this.uuid)
    widget && widget.destroy()
    model && model.dispose()
    StructConfig.INFOS.delete(this.uuid)
  }

  /**移动整个楼梯 */
  updateStairPositon() {
    this.position.y -= this.stairMoveT
    this.position.x += this.stairMoveR
  }
  /**计算步高 */
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

  /**
   * 添加起步楼梯段
   */
  addStartFlight() {
    let firstF = this.segments[0]
    let vParent = this
    let vStepWidth = firstF.stepWidth || 260
    let vStepHeight = this.stepHeight
    let vClock = firstF.clock
    this.startFlight = new StartFlight({vParent, vStepWidth, vStepHeight, vClock})
    if(firstF.type === Types.FlightType.frect && firstF.realStepNum > 1) {
      let firstT = firstF.treads[0]
      firstF.updateItem(firstF.stepNum - 1, 'stepNum')
      firstF.updateItem(firstF.length - (firstT?.stepWidth || firstF.stepWidth), 'length')
    }
    this.flights.push(this.startFlight)
    this.rebuild()
  }

  /**
   * 移除起步楼梯段
   */
  removeStartFlight() {
    let firstF = this.segments[0]
    firstF.updateItem(firstF.stepNum + 1, 'stepNum')
    firstF.updateItem(firstF.length + this.startFlight.stepWidth, 'length')
    this.startFlight = null
    this.flights.pop()
    this.rebuild()
  }

  /**更新起步踏 */
  updateStartFlight() {
    if (this.startFlight) {
      let firstF = this.flights[0]
      let {pos:vPos, lVec:vLVec, wVec:vWVec} = firstF.getStartPosVec()
      vPos = new Edge().setByVec(vPos, vLVec, -this.girOffset).p2
      let vStepLength = firstF.stepLength
      this.startFlight.rebuildByParent({vPos, vLVec, vWVec, vStepLength})
      if (this.startFlight.treads.length === 1) {
        this.bigColParameters.posType = Types.BigColumnPosType.bcp_first
      } else {
        this.bigColParameters.posType = Types.BigColumnPosType.bcp_second
      }
    }
  }

  /**更新挂板 */
  updatehangingBoard() {
    if (this.exitType === Types.StairExitType.se_hangingBoard) {
      let lastF = this.segments[this.segments.length - 1]
      let lastT2 = this.stepNumRule === Types.StepNumRule.snr_n_add_1 ? 
                                        lastF.treads[lastF.treads.length - 2] 
                                        : lastF.treads[lastF.treads.length - 1]
      let lastT1 = lastF.treads[lastF.treads.length - 1]
      let vWidth = lastT2.stepLength
      let vHeight = lastT2.getGirVerHeight(this.girderParameters) + lastT1.stepHeight + 50
      let vPosition = new Edge().setByVec(lastF.pos, lastF.wVec, -this.hangOffset).p2
      if (this.girderParameters.type === Types.GirderType.gslab) {
        vHeight = lastT1.getGirVerHeight(this.girderParameters) + 50
        vPosition = new Edge().setByVec(vPosition, lastF.lVec, -this.girderParameters.depth).p2
      }
      vPosition.z = lastF.getEndHeight()
      if (this.hangingBoard) {
        this.hangingBoard.rebuildByParent({vWidth, vPosition})
      } else {
        let vWidthVec = new Types.Vector3(lastF.lVec)
        let vDepthVec = new Types.Vector3(lastF.wVec)
        this.hangingBoard = new HangingBoard({vParent:this, vWidth, vPosition, vHeight, vWidthVec, vDepthVec})
      }
    }
  }

  /**
   * 计算实际踏板轮廓的后边，比平面图中需向后偏移的距离
   */
  getTreadBackOffset() {
    let tArgs = this.treadParameters
    let rArgs = this.riserParameters
    if (tArgs.nossingType === Types.NossingType.nno) {
      tArgs.nossing = 0
    }
    return tArgs.nossing + (rArgs.riserExist ? rArgs.depth : 0)
  }

  getGirderParas() {
    return this.girderParameters
  }

  getBigColParas() {
    return this.bigColParameters
  }

  getHandParas() {
    return this.handrailParameters
  }

  getSideOffset() {
    if (this.girderParameters.type === Types.GirderType.gslab) {
      return -this.sideOffset
    } else {
      return this.sideOffset
    }
  }


  getArgs() {
    let f = tool.getItemFromOptions
    let args = {
      stairMoveT: {
        name: '上移',
        value: this.stairMoveT,
        type: 'input',
      },
      stairMoveR: {
        name: '右移',
        value: this.stairMoveR,
        type: 'input',
      },
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
      exitType: {name:'出口类型', 
                value:f(this.exitType, Stair.EXIT_TYPE_OPTIONS), 
                type:'select', 
                options:[...Stair.EXIT_TYPE_OPTIONS]},
      stepNumRule: {
        name: '步数规则',
        value: f(this.stepNumRule, Flight.NUM_RULE_OPTIONS),
        type: 'select',
        options: Flight.NUM_RULE_OPTIONS,
      },
      stepNum: { name: '步数', value: this.stepNum, type: 'input' },
      inSide:{name:'内侧参数', type:'group', value:this.inSide.getArgs()},
      outSide:{name:'外侧参数', type:'group', value:this.outSide.getArgs()},
      treadParameters: { name: '踏板参数', type: 'group' },
      riserParameters: { name: '立板参数', type: 'group' },
      girderParameters: { name: '大梁参数', type: 'group' },
      handrailParameters: { name: '扶手参数', type: 'group' },
      smallColParameters: { name: '小柱参数', type: 'group' },
      bigColParameters: { name: '起步大柱参数', type: 'group' },
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
    if (this.stepNumRule === Types.StepNumRule.snr_n) {
      args.exitType.options.splice(0, 1)
    }
    args.startFlight = {name:'添加起步踏', state:'add'}
    if (this.startFlight) {
      args.startFlight.name = '移除起步踏'
      args.startFlight.state = 'delete'
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

  updateItem(vValue, vKey, vSecondKey) {
    if (vKey === 'exitType') {
      let lastF = this.segments[this.segments.length - 1]
      if (vValue === Types.StairExitType.se_hangingBoard) {
        lastF.updateItem(lastF.length - Default.HANG_BOARD_DEPTH, 'length')
      } else if (this.exitType === Types.StairExitType.se_hangingBoard) {
        lastF.updateItem(lastF.length + Default.HANG_BOARD_DEPTH, 'length')
      }
      this.exitType = vValue
    } else if (vSecondKey && ['model', 'material'].includes(vSecondKey)) {
      console.log(1)
    } else if (vKey === 'stepNum') {
      let diff = this.stepNum - vValue
      this.updateFlightStepNum(diff)
    } else if (vKey === 'stepNumRule') {
      this.segments[this.segments.length - 1].updateItem(vValue, vKey, vSecondKey)
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  updateFlightStepNum (vDiff) {
    let absDiff = Math.abs(vDiff)
    let unit = vDiff / absDiff
    let modifiable = true
    let stepWidthMin = 250
    let stepWidthMax = 350
    while (absDiff > 0) {
      for (let i = 0; i < this.flights.length; i++) {
        let f = this.flights[i]
        if (f.type !== Types.FlightType.fStart && absDiff > 0) {
          if (f.stepNum > 1) {
            let stepWidth = f.length / (f.realStepNum - unit)
            if (unit > 0 && stepWidth > stepWidthMax) {
              modifiable = false
            } else if (unit < 0 && stepWidth < stepWidthMin) {
              modifiable = false
            } else {
              f.updateItem(f.stepNum - unit, 'stepNum')
              absDiff--
              modifiable = true
            }
          } else {
            modifiable = false
          }
        }
      }
      if ((!modifiable) && absDiff > 0) {
        stepWidthMax += 50
        stepWidthMin -= 50
        if (stepWidthMin < 50 || stepWidthMax > 600) {
          break
        }
      }
    }
  }

  /**
   * 无起步踏板的情况下，根据大柱的位置类型计算出其在楼梯深度方向上的偏移
   * @returns 
   */
  computeBigColPosAttr () {
    let bArgs = this.bigColParameters
    let bigColSize = tool.parseSpecification(bArgs.specification)
    let offset = Default.BIG_COL_GAP
    let zCoord = 0
    let step1 = this.flights[0].treads[0]
    let step2 = this.flights[0].treads[1]
    if (bArgs.posType === Types.BigColumnPosType.bcp_first) {
      offset = - step1.stepWidth / 2 - bigColSize.y / 2
      zCoord = step1.position.z
    }
    if (bArgs.posType === Types.BigColumnPosType.bcp_second) {
      offset = -step1.stepWidth - step2.stepWidth / 2 - bigColSize.y / 2
      zCoord = step2.position.z
    }
    return {offset, zCoord}
  }

  /**
   *清空楼梯踏板，在步数发生改变时调用
   *
   * @memberof Stair
   */
  clearTreads() {
    if (this.startFlight) {
      this.startFlight.clearTreads()
    }
    for (const f of this.segments) {
      f.clearTreads()
    }
  }

  updateGirders () {
    this.girders = []
    this.updateSideGirder(this.inSide)
    this.updateSideGirder(this.outSide)
  }

  /**
   * 
   * @param {StairSide} vSide 
   */
  updateSideGirder (vSide) {
    for (let i = 0; i < this.flights.length; i++) {
      if (this.flights[i].type === Types.FlightType.fStart) {
        continue
      }
      let lastL = this.landings[i - 1]
      let nextL = this.landings[i]
      let flight = this.flights[i]
      let borders = [], inLast = null, outLast = null
      let flights = [lastL, flight, nextL]
      for (let i = 0; i < 3; i++) {
        let f = flights[i]
        if (f) {
          let rst = f.createGirderRoute({vSide:vSide.sideName, 
                                        vArgs:this.girderParameters, 
                                        vOrder:i === 0 ? 'next':'last',
                                        vInLast:inLast,
                                        vOutLast:outLast})
          let border = rst[rst.length - 1]
          inLast = border ? {
            poi:border.inEdges[border.inEdges.length - 1].p2,
            topPoi:border.inTopEdges[border.inTopEdges.length - 1].p2
          } : null
          outLast = border ? {
            poi:border.outEdges[border.outEdges.length - 1].p2,
            topPoi:border.outTopEdges[border.outTopEdges.length - 1].p2
          } : null
          borders = borders.concat(rst)
        }
      }
      if (vSide.girders[i]) {
        vSide.girders[i].rebuildByParent(borders)
      } else {
        vSide.girders[i] = new Girder(this, borders)
      }
      this.girders.push(vSide.girders[i])
    }
  }

  /**
   * 根据边界轮廓更新扶手
   */
  updateHandrails () {
    this.handrails = []
    this.inSide.handrailExit && this.updateSideHandrails(this.inSide)
    this.outSide.handrailExit && this.updateSideHandrails(this.outSide)
  }

  updateSideHandrails (vSide) {
    let edges = []
    if (this.startFlight) {
      edges = this.startFlight.createHandEdges({vSide: vSide.sideName, vArgs:this.handrailParameters})
      //lastUtilE = new Edge3(edges[edges.length - 1])
    }
    for (const f of this.segments) {
      let fEdges = f.createHandEdges({vSide: vSide.sideName, vArgs:this.handrailParameters})
      if (vSide.sideName === 'in' || f.index === 0) {
        edges = tool.concatEdges(edges, fEdges)
      } else if (fEdges.length) {
        let p1 = edges[edges.length - 1].p2
        let p2 = fEdges[0].p1
        if (this.type === Types.StairType.s_small_u_type) {
          let radius = this.sideOffset + this.gap/2
          let position = new Edge().setByVec(p2, f.lVec, radius).p2
          let startAngle, endAngle, isClockwise
          if (this.floadSide === Types.Side.si_right) {
            startAngle = Math.PI, endAngle = 0, isClockwise = true
          } else {
            startAngle = 0, endAngle = Math.PI, isClockwise = false
          }
          edges.push(new Types.Edge({
            p1:p1, 
            p2:p2,
            startAngle:startAngle,
            endAngle:endAngle,
            position:position,
            isClockwise: isClockwise,
            radius:radius,
            type: Types.EdgeType.earc
          }))
        } else {
          let controlPos = new Edge().setByVec(p2, f.wVec, this.sideOffset).p2
          edges.push(new Types.Edge({
            p1:p1,
            p2:p2,
            type:Types.EdgeType.ebeszer,
            controlPos:controlPos
          }))
        }
        edges = edges.concat(fEdges)
      }
    }
    let route = new Types.Outline({edges:edges, isClose:false, isClock:this.floadSide === Types.Side.si_right})
    if (vSide.handrails[0]) {
      vSide.handrails[0].rebuildByParent(route)
    } else {
      vSide.handrails[0] = new Handrail(this, route)
    }
    this.handrails.push(vSide.handrails[0])
  }

  updateSmallColumns() {
    this.smallColumns = []
    this.inSide.handrailExit && this.updateSideSmallColumns(this.inSide)
    this.outSide.handrailExit && this.updateSideSmallColumns(this.outSide)
  }

  /**
   * @param {StairSide} vSide
   * @memberof Stair
   */
  updateSideSmallColumns(vSide) {
    let fLastNum = 0
    for (const f of this.segments) {
      let {sCols, lastNum} = f.createSmallCols({vSide:vSide.sideName,vArgs:this.smallColParameters,vLastNum:fLastNum})
      this.smallColumns = this.smallColumns.concat(sCols)
      fLastNum = lastNum
    }
  }

  /**
   * 更新大柱
   */
  updateBigColumns () {
    this.bigColumns = []
    this.inSide.startBigColExit && this.updateSideBigCol(this.inSide)
    this.outSide.startBigColExit && this.updateSideBigCol(this.outSide)
  }

  /**
   *
   *
   * @param {StairSide} vSide
   * @memberof Stair
   */
  updateSideBigCol (vSide) {
    let args = this.bigColParameters
    let position = new Types.Vector3()
    /**无起步踏时，根据大柱位置类型计算大柱位置 */
    if (!this.startFlight) {
      let size = tool.parseSpecification(args.specification)
      let {offset, zCoord} = this.computeBigColPosAttr()
      offset = offset + size.x / 2
      let firstF = this.segments[0]
      position = new Edge().setByVec(firstF.pos, firstF.wVec, firstF.length+offset).p2
      position = new Edge().setByVec(position, firstF.lVec, this.getSideOffset()).p2
      if (vSide.sideName === 'out') {
        position = new Edge().setByVec(position, firstF.lVec, firstF.stepLength-this.sideOffset*2).p2
      }
      position.z = zCoord
    } else {
      /**有起步踏时，由起步踏计算出大柱位置 */
      let {inPos, outPos} = this.startFlight.computeBigColPos()
      if (vSide.sideName === 'in') {
        position = inPos
      } else if (vSide.sideName === 'out') {
        position = outPos
      }
    }
    let height = this.handrailParameters.height + this.stepHeight + Default.BIG_COL_UP_HEIGHT
    if (vSide.startBigCol) {
      vSide.startBigCol.rebuildByParent(position, height)
    } else {
      vSide.startBigCol = new BigColumn({vParent:this, vPosition:position, vType:Types.BigColumnType.bc_start, vHeight:height})
    }
    this.bigColumns.push(vSide.startBigCol)
  }

  getBoxInfo() {
    let size = new Types.Vector3()
    size.x = this.width
    size.y = this.height
    size.z = this.depth || Math.max(this.depth1, this.depth2)
    let center = new Types.Vector3()
    center.x = this.position.x + size.x / 2
    center.y = this.height / 2
    center.z = this.position.y + size.z / 2
    return {size, center}
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
      girderParameters: this.girderParameters,
      handrailParameters: this.handrailParameters,
      smallColParameters: this.smallColParameters,
      bigColParameters: this.bigColParameters,
      flights: tool.writeItemArrayPB(this.flights),
      smallColumns: tool.writeItemArrayPB(this.smallColumns),
      bigColumns: tool.writeItemArrayPB(this.bigColumns),
      handrails: tool.writeItemArrayPB(this.handrails),
      girders: tool.writeItemArrayPB(this.girders),
      landings: tool.writeItemArrayPB(this.landings),
      position: this.position,
      exitType: this.exitType
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