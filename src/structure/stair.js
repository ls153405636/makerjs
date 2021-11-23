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

  rebuild() {
    this.hangOffset = this.hangingBoard?.depth || 0
    let gArgs = this.girderParameters
    this.girOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.computeSideOffset()
    if (this.flights.length) {
      this.computeStepNum()
      this.computeStepHeight()
      this.updateFlights()
    } else {
      this.initFlights()
    }
    this.updateLandings()
    this.computeSize()
    this.computePosition()
    this.updateBorder()
    this.updateStartFlight()
    this.updateGirders()
    this.updateHandrails()
    this.updateSmallColumns()
    // this.updateBigColumns()
    this.updateCanvas('Stair')
  }
  
  /**初始化楼梯段 */
  initFlights() {}

  /** 更新楼梯段*/
  updateFlights() {}

  /**更新起步踏 */
  updateStartFlight() {}

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
                            vLVec:new Types.Vector3({x:1}),
                            vWVec:new Types.Vector3({y:1}),
                            vPos:new Types.Vector3(pos),
                            vStepLength:firstTread.stepLength,
                            vStepWidth:firstTread.stepWidth,
                            vStepHeight:firstTread.stepHeight})
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
      args.hangingBoard = {name:'添加挂板', state:'add'}
      if(this.hangingBoard) {
        args.hangingBoard.name = '移除挂板'
        args.hangingBoard.state = 'delete'
      }
    }
    args.startFlight = {name:'添加起步踏造型', state:'add'}
    if (this.startFlight) {
      args.startFlight.name = '移除起步踏造型'
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

  /**
   * 根据楼梯边界轮廓更新大梁
   * @returns 
   */
  updateGirders () {
    let args = this.girderParameters
    this.girders = []
    if (args.type === Types.GirderType.gsaw) {
      return
      /**平面图不需要绘制锯齿梁，故先不做处理*/
    }
    let bor = this.border
    let inBorderEdges = this.getGirderInEdges()
    for (let i = 0; i < inBorderEdges.length; i++) {
      let e = inBorderEdges[i]
      let start = i === 0 ? new Edge(e).extendP1(args.fOffsetStep).p1 : new Edge(e).extendP1(-args.depth).p1
      let end = new Types.Vector3(e.p2)
      let outEdges = [
        new Types.Edge({
          p1: start,
          p2: end,
          type: Types.EdgeType.estraight
        })
      ]
      this.updateSideGirder(outEdges, 'in', args.depth, i, this.getInSideOffsetPlus())
    }
    for (let i = 0; i < bor.out.edges.length; i++) {
      let e = bor.out.edges[i]
      if (!e.flight) {
        continue
      }
      let utilE = new Edge(e)
      if (i === 0) {
        utilE.extendP1(args.fOffsetStep)
      }
      if (e.startCol) {
        let offset = (e.startCol.size.x - args.depth) / 2
        utilE.extendP1(-offset)
      }
      if (e.endCol) {
        let offSet = (e.endCol.size.x - args.depth) / 2
        utilE.extendP2(-offSet)
      }
      let outEdges = [
        utilE.writePB()
      ]
      this.updateSideGirder(outEdges, 'out', args.depth, i, this.getOutSideOffsetPlus())
    }
  }

  /**
   * 每根大梁有内外上下四条路径，本函数为根据外路径边集创建大梁
   * @param {Array<Edge>} vOutEdges 外路径边集 
   * @param {String} vSide 当前大梁属于哪一侧 'in' or 'out'
   * @param {Number} vDepth 大梁厚度
   * @param {Number} vIndex 大梁在当前side中的索引
   * @param {boolean} vPlus 由外路径偏移得到内路径，偏移方向是否为法线方向
   */
  updateSideGirder (vOutEdges, vSide, vDepth, vIndex, vPlus) {
    let inEdges = []
    let bor = this.border
    for (const e of vOutEdges) {
      let inE = new Edge(e).offset(vDepth, vPlus)
      inEdges.push(inE)
    } 
    if (bor[vSide].girders[vIndex]) {
      bor[vSide].girders[vIndex].rebuildByParent(inEdges, vOutEdges)
    } else {
      bor[vSide].girders[vIndex] = new Girder(this, inEdges, vOutEdges)
    }
    this.girders.push(bor[vSide].girders[vIndex])
  }

  /**
   * 根据边界轮廓更新扶手
   */
  updateHandrails () {
    this.handrails = []
    let bor = this.border
    this.updateSideHandrails(bor.in.edges, 'in', this.getInSideOffsetPlus())
    this.updateSideHandrails(bor.out.edges, 'out', this.getOutSideOffsetPlus())
  }

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
        let {left, right} = this.startFlight.createHandRouteEdges()
        if (vSide === 'in') {
          route.edges = vSideOffsetPlus ? right.concat(route.edges) : left.concat(route.edges)
        } else if (vSide === 'out') {
          route.edges = vSideOffsetPlus ? left.concat(route.edges) : right.concat(route.edges)
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
      this.smallColumns = this.smallColumns.concat(this.landings[0].createSmallCols(dis, dis, size))
      this.smallColumns = this.smallColumns.concat(this.landings[1].createSmallCols(dis, dis, size))
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
      if (!(flight?.treads)) {
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
   * @param {boolean} vSideOffsetPlus 大柱在楼梯宽度方向的位置由边界边偏移得到，偏移方向是否为发现方向
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
      let {left, right} = this.startFlight.computeBigColPos()
      if (vSide === 'in') {
        position = vSideOffsetPlus ? right : left
      } else if (vSide === 'out') {
        position = vSideOffsetPlus ? left : right
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