import { Info } from './info'
import { Default } from './config'
import { Types } from '../types/stair_v2'
import { Flight } from './flight'
import tool from './tool'
import { Girder } from './girder'
import { Landing } from './landing'
import { Edge } from '../utils/edge'
import { Outline } from "../utils/outline"
import { BigColumn } from "./big_column"
import { Handrail } from "./handrail"
import { SmallColumn } from "./small_column"
import { StartFlight } from './start_flight'
import { StairSide } from './toolComp/stair_side'
import { COMP_TYPES } from '../common/common_config'
import { reqTemp } from './resource/temp'

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
    /**@type {import('./toolComp/stair_border').StairBorder} */
    this.border = null
    /**@type {Array<Flight>} */
    this.segments = []
    this.treadParameters = new Types.TreadParameters({
      depth: Default.TREAD_DEPTH,
      nossingType: Default.TREAD_NOSSING_TYPE,
      nossing: Default.TREAD_NOSSING,
      sideNossing: Default.TREAD_SIDE_NOSSING,
    })
    this.riserParameters = new Types.RiserParameters({
      riserExist: true,
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
      fOffsetStep: Default.GIRDER_F_OFFSET,
      bSuppotHeight: Default.GIRDER_B_HEIGHT,
      aboveHeight: Default.GIRDER_ABOVE_HEIGHT
    })
    this.handrailParameters = new Types.HandrailParameters({
      height: Default.HAND_HEIGHT,
      source: new Types.DxfData({
        specification: Default.HAND_SPEC,
      }),
    })
  }

  rebuild() {
    this.hangOffset = this.hangingBoard?.depth || 0
    let gArgs = this.girderParameters
    this.girOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.startStepNum = this.startFlight?.stepNum || 0
    this.computeSideOffset()
    if (this.flights.length) {
      this.computeStepNum()
      this.computeStepHeight()
      this.updateFlights()
    } else {
      this.initFlights()
    }
    this.updateStartFlight()
    this.updateLandings()
    this.updateSegments()
    this.computeSize()
    this.computePosition()
    this.updateBorder()
    this.updateGirders()
    this.updateHandrails()
    this.updateSmallColumns()
    this.updateBigColumns()
    this.updateCanvas('Stair')
  }
  
  /**初始化楼梯段 */
  initFlights() {}

  /** 更新楼梯段*/
  updateFlights() {}

  /** 根据楼梯段、起步踏、休息平台等计算总步数*/
  computeStepNum() {}

  /** 根据楼梯段、休息平台计算楼梯尺寸（不包含起步踏）*/
  computeSize() {}

  /** 根据楼梯尺寸及楼梯类型计算楼梯位置*/
  computePosition() {}

  /** 根据楼梯段、休息平台等初始化出楼梯边界
   * 楼梯边界用于生成大梁扶手大柱小柱的结构部件
  */
  updateBorder() {}

  /** 更新休息平台*/
  updateLandings() {}

  /**
   * 根据边界边生成大梁扶手大小柱等部件时，需对边界边进行偏移
   * 获得内侧边界边偏移时未法线发现还是法线反方向
   */
  getInSideOffsetPlus() {}

  /**
   * 获得外侧边界边偏移时为法线方向还是法线反方向
   */
  getOutSideOffsetPlus() {}

  /**更新楼梯分段 */
  updateSegments() {}


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
   * 创建一个起步楼梯段
   * @returns StartFlight
   */
  createStartFlight() {
    let f1 = this.flights[0]
    let firstTread = f1.treads[0]
    let pos = firstTread.position
    let gArgs = this.girderParameters
    if (gArgs.type === Types.GirderType.gslab) {
      pos = new Edge().setByVec(pos, f1.lVec, -gArgs.depth).p2
    }
    return new StartFlight({vParent:this,
                            vLVec:firstTread.lVec,
                            vWVec:firstTread.wVec,
                            vPos:new Types.Vector3(pos),
                            vStepLength:firstTread.stepLength,
                            vStepWidth:firstTread.stepWidth,
                            vStepHeight:firstTread.stepHeight,
                            vClock:f1.clock})
  }

  /**
   * 将起步楼梯段添加到本套楼梯中
   * @param {StartFlight} vStartFlight 
   */
  addStartFlight(vStartFlight) {
    let f1 = this.flights[0]
    let firstTread = f1.treads[0]
    f1.updateItem(f1.stepNum - 1, 'stepNum')
    f1.updateItem(f1.length - firstTread.stepWidth, 'length')
    this.flights.push(vStartFlight)
    this.startFlight = vStartFlight
    this.rebuild()
  }

  /**
   * 移除起步楼梯段
   */
  removeStartFlight() {
    let f1 = this.flights[0]
    f1.updateItem(f1.stepNum + 1, 'stepNum')
    f1.updateItem(f1.length + this.startFlight.stepWidth, 'length')
    this.startFlight = null
    this.flights.pop()
    this.rebuild()
  }

  /**更新起步踏 */
  updateStartFlight() {
    if (this.startFlight) {
      let f1 = this.flights[0]
      let pos = new Edge().setByVec(f1.pos, f1.wVec, f1.length).p2
      pos = new Edge().setByVec(pos, f1.lVec, -this.girOffset).p2
      this.startFlight.rebuildByParent({vPos:pos, 
                                        vLVec:f1.lVec,
                                        vWVec:f1.wVec,
                                        vStepLength: f1.stepLength,
                                        vClock:f1.clock})
      if (this.startFlight.treads.length === 1) {
        this.bigColParameters.posType = Types.BigColumnPosType.bcp_first
      } else {
        this.bigColParameters.posType = Types.BigColumnPosType.bcp_second
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


  getArgs() {
    //reqTemp()
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
      args.hangingBoard = {name:'添加挂板', state:'add'}
      if(this.hangingBoard) {
        args.hangingBoard.name = '移除挂板'
        args.hangingBoard.state = 'delete'
      }
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

  /**
   * 无起步踏板的情况下，根据大柱的位置类型计算出其在楼梯深度方向上的偏移
   * @returns 
   */
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

  updateGirders () {
    this.girders = []
    this.updateSideGirder(this.border.in)
    this.updateSideGirder(this.border.out)
  }

  /**
   * 
   * @param {StairSide} vSide 
   */
  updateSideGirder (vSide) {
    for (let i = 0; i < this.flights.length; i++) {
      if (this.flights[i].type === 'start') {
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
    let bor = this.border
    this.updateSideHandrails(bor.in.edges, 'in', this.getInSideOffsetPlus())
    this.updateSideHandrails(bor.out.edges, 'out', this.getOutSideOffsetPlus())
    //this.updateSideHandrails(bor.in, 'in', this.getInSideOffsetPlus())
    // this.updateSideHandrails(bor.out, 'out', this.getOutSideOffsetPlus())
  }

  // updateSideHandrails (vSide) {
  //   let edges = []
  //   if (this.startFlight) {
  //     edges = this.startFlight.createHandEdges({vSide: vSide.sideName, vArgs:this.handrailParameters})
  //   }
  //   for (const f of this.segments) {
  //     let fEdges = f.createHandEdges({vSide: vSide.sideName, vArgs:this.handrailParameters})
  //     if (vSide.sideName === 'in' || f.index === 0) {
  //       edges = tool.concatEdges(edges, fEdges)
  //     } else if (fEdges.length) {
  //       let p1 = edges[edges.length - 1].p2
  //       let p2 = fEdges[0].p1
  //       if (this.type === Types.StairType.s_small_u_type) {
  //         let radius = this.sideOffset + this.gap/2
  //         let position = new Edge().setByVec(p2, f.lVec, radius).p2
  //         let startAngle, endAngle, isClockwise
  //         if (this.floadSide === Types.Side.si_right) {
  //           startAngle = Math.PI, endAngle = 0, isClockwise = true
  //         } else {
  //           startAngle = 0, endAngle = Math.PI, isClockwise = false
  //         }
  //         edges.push(new Types.Edge({
  //           p1:p1, 
  //           p2:p2,
  //           startAngle:startAngle,
  //           endAngle:endAngle,
  //           position:position,
  //           isClockwise: isClockwise,
  //           radius:radius,
  //           type: Types.EdgeType.earc
  //         }))
  //       } else {
  //         let controlPos = new Edge().setByVec(p2, f.wVec, this.sideOffset).p2
  //         edges.push(new Types.Edge({
  //           p1:p1,
  //           p2:p2,
  //           type:Types.EdgeType.ebeszer,
  //           controlPos:controlPos
  //         }))
  //       }
  //       edges = edges.concat(fEdges)
  //     }
  //   }
  //   let route = new Types.Outline({edges:edges, isClose:false, isClock:this.floadSide === Types.Side.si_right})
  //   if (vSide.handrails[0]) {
  //     vSide.handrails[0].rebuildByParent(route)
  //   } else {
  //     vSide.handrails[0] = new Handrail(this, route)
  //   }
  //   this.handrails.push(vSide.handrails[0])
  // }

  /**
   * 更新边界中某一侧的扶手
   * @param {Array<import('./toolComp/stair_edge').StairEdge>} vStairEdges 本侧边集
   * @param {String} vSide 当前扶手属于哪一侧 'in' or 'out'
   * @param {boolean} vSideOffsetPlus 边界边需偏移得到扶手路径，偏移方向是否为法线方向
   */
  updateSideHandrails (vStairEdges, vSide, vSideOffsetPlus) {
    let routeEdgesArr = [[]]
    let routeIndex = 0
    let borSide = this.border[vSide]
    for (let i = 0; i < vStairEdges.length; i++) {
      let e = vStairEdges[i]
      let sCol = vStairEdges[i].startCol
      let eCol = vStairEdges[i].endCol
      let gArgs = this.girderParameters
      let start = new Types.Vector3(e.p1)
      let end = new Types.Vector3(e.p2)
      let edge = new Edge({
        p1:start,
        p2:end,
        type:Types.EdgeType.estraight
      })
      let utilE = new Edge(edge)
      /**无起步踏板时，扶手路径第一条边需根据大柱属性向前延伸 */
      if (i === 0 && !this.startFlight) {
        let frontOffset = this.computeBigColOffset()
        utilE.extendP1(frontOffset).p1
      }
      if (sCol) {
        let sOffset = 0
        //这里取支撑柱的长还是宽需根据方向确定，但因为目前长宽都一样，所以全部取长
        if (gArgs.type === Types.GirderType.gslab) {
          sOffset = sCol.size.x / 2 - Math.abs(e.p1.x - sCol.position.x)
        }
        utilE.extendP1(-sOffset)
        if (i !== 0) {
          routeIndex++
          routeEdgesArr[routeIndex] = []
        }
      }
      if (eCol) {
        let eOffset = 0
        if (gArgs.type === Types.GirderType.gslab) {
          eOffset = eCol.size.x / 2 - Math.abs(e.p2.x - eCol.position.x)
        }
        utilE.extendP2(-eOffset)
      }
      routeEdgesArr[routeIndex].push(utilE.writePB())
    }
    for (let i = 0; i < routeEdgesArr.length; i++) {
      let edges = routeEdgesArr[i]
      let route = new Types.Outline({edges:edges, isClose:false})
      route = new Outline(route).offset(this.sideOffset, vSideOffsetPlus)
      /**当存在起步踏板时， 扶手首边不做延伸，由起步踏板计算得出前面的边集，加入扶手轮廓*/
      if (i === 0 && this.startFlight) {
        let {inEdges, outEdges} = this.startFlight.createHandRouteEdges(this.handrailParameters)
        if (vSide === 'in') {
          route.edges = inEdges.concat(route.edges)
        } else if (vSide === 'out') {
          route.edges = outEdges.concat(route.edges)
        }
      }
      if (borSide.handrails[i]) {
        borSide.handrails[i].rebuildByParent(route)
      } else {
        borSide.handrails[i] = new Handrail(this, route)
      }
      this.handrails.push(borSide.handrails[i])
    }
  }

  /**
   * 更新小柱
   */
  updateSmallColumns() {
    let args = this.smallColParameters
    let size = tool.parseSpecification(args.specification)
    this.smallColumns = []
    let bor = this.border
    this.updateSideSmallCols(bor.in.edges, 'in')
    this.updateSideSmallCols(bor.out.edges, 'out')
    if (this.landings.length > 0) {
      let dis
      if (args.arrangeRule === Types.ArrangeRule.arrThree) {
        dis = Math.max(this.flights[0].stepWidth, this.flights[1].stepWidth) * 2 / 3
      } else {
        dis = Math.max(this.flights[0].stepWidth, this.flights[1].stepWidth) / 2
      }
      for (const l of this.landings) {
        this.smallColumns = this.smallColumns.concat(l.createSmallCols(dis, dis, size))
      }
    }
  }

  /**
   * 更新边界中的一侧小柱
   * @param {Array<import('./toolComp/stair_edge').StairEdge>} vStairEdges 本侧边集
   * @param {string} vSide 当前小柱属于哪一侧 'in' or 'out'
   */
  updateSideSmallCols(vStairEdges, vSide) {
    let args = this.smallColParameters
    let size = tool.parseSpecification(args.specification)
    let gArgs = this.girderParameters
    let sideOffset = gArgs.type === Types.GirderType.gslab ? -this.sideOffset : this.sideOffset
    for (let i = 0; i < vStairEdges.length; i++) {
      let sideE = vStairEdges[i]
      let flight = sideE.flight
      if (flight?.compType !== COMP_TYPES.FLIGHT) {
        continue
      }
      let k = 0
      /**无起步踏时，小柱起始位置由大柱位置类型决定 */
      if (i === 0 && !this.startFlight) {
        k = Math.abs(1 - this.bigColParameters.posType)
      }
      for (; k < flight.treads.length; k++) {
        let t = flight.treads[k]
        if (t.isLast) {
          continue
        }
        let posArr = []
        let sideOffsetK = sideOffset
        if (vSide === 'out') {
          sideOffsetK = sideOffset + t.stepLength - flight.stepLength
        }
        if (args.arrangeRule === Types.ArrangeRule.arrThree) {
          let index = k % 2
          if (index === 0) {
            let rate = Math.max(1/6, size.x/2/t.stepWidth)
            posArr = t.getColPos([rate, 1-rate], vSide, sideOffsetK)
          } else {
            posArr = t.getColPos([1/2], vSide, sideOffsetK)
          }
        } else {
          posArr = t.getColPos([1/4, 3/4], vSide, sideOffsetK)
        }
        for (const p of posArr) {
          this.smallColumns.push(new SmallColumn(this, p, size))
        }
      }
    }
  }

  /**
   * 更新大柱
   */
  updateBigColumns () {
    this.bigColumns = []
    this.updateSideBigCol(this.border.in.edges[0], 'in', this.getInSideOffsetPlus())
    this.updateSideBigCol(this.border.out.edges[0], 'out', this.getOutSideOffsetPlus())
  }

  /**
   * 更新边界一侧的大柱
   * @param {Array<import('./toolComp/stair_edge').StairEdge>} vStairEdge 本侧边集
   * @param {string} vSide 当前是哪一侧 'in' or 'out'
   * @param {boolean} vSideOffsetPlus 大柱在楼梯宽度方向的位置由边界边偏移得到，偏移方向是否为法线方向
   */
  updateSideBigCol (vStairEdge, vSide, vSideOffsetPlus) {
    let args = this.bigColParameters
    let position = new Types.Vector3()
    /**无起步踏时，根据大柱位置类型计算大柱位置 */
    if (!this.startFlight) {
      let size = tool.parseSpecification(args.specification)
      let offset = this.computeBigColOffset()
      offset = offset + size.x / 2
      let edge = new Edge(vStairEdge).offset(this.sideOffset, vSideOffsetPlus)
      position = new Edge(edge).extendP1(offset).p1
    } else {
      /**有起步踏时，由起步踏计算出大柱位置 */
      let {inPos, outPos} = this.startFlight.computeBigColPos()
      if (vSide === 'in') {
        position = inPos
      } else if (vSide === 'out') {
        position = outPos
      }
    }
    if (this.border[vSide].bigCol) {
      this.border[vSide].bigCol.rebuildByParent(position)
    } else {
      this.border[vSide].bigCol = new BigColumn({vParent:this,vPosition:position})
    }
    this.bigColumns.push(this.border[vSide].bigCol)
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