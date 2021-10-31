import { Flight } from './flight'
import { Types } from '../types/stair_v2'
import { BigColumn } from './big_column'
import { Default } from './config'
import { Girder } from './girder'
import { Handrail } from './handrails'
import { Info } from './info'
import { SmallColumn } from './small_column'
import tool from './tool'

export class Stair extends Info {
  static NUM_RULE_OPTIONS = [
    { value: Types.StepNumRule.snr_n, label: 'n步' },
    { value: Types.StepNumRule.snr_n_add_1, label: 'n+1步' },
  ]
  static NOSS_TYPE_OPTIONS = [
    { value: Types.NossingType.nno, label: '无加边' },
    { value: Types.NossingType.ncommon, label: '普通加边' },
    { value: Types.NossingType.nluxury, label: '豪华加边' },
  ]

  constructor(vParent, againstWall = Types.AgainstWallType.aw_left) {
    super(vParent)
    this.againstWallType = againstWall
    this.type = Types.StairType.sstright
    this.startBeamDepth = 0
    this.exitBeamDepth = 0
    this.stepNum = Default.STEP_NUM
    this.stepNumRule = Default.STEP_NUM_RULE
    this.stepWidth = Default.STEP_WIDTH
    this.stepLength = Default.STEP_LENGTH
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
    this.rebuild()
  }

  rebuild() {
    this.flights = []
    this.smallColumns = []
    this.bigColumns = []
    this.handrails = []
    this.girders = []
    this.hangYOffset = this.hangingBoard?.depth || 0
    this.computeSize()
    this.stepHeight = Math.ceil(this.height / this.stepNum)
    this.computePosition()
    this.computeSideOffset()
    this.createFlights()
    this.createSmallColumns()
    this.createBigColumns()
    this.createHandrails()
    this.createGirders()
    this.updateCanvas()
  }

  updateItem (vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  getItemValue (vItem) {
    if (vItem.type === 'replace') {
      return ''
    } else {
      return super.getItemValue(vItem)
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
      stepNumRule: {
        name: '步数规则',
        value: f(this.stepNumRule, Stair.NUM_RULE_OPTIONS),
        type: 'select',
        options: Stair.NUM_RULE_OPTIONS,
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

  computeSize() {
    this.width = Default.STEP_LENGTH
    this.depth =
      Default.STEP_WIDTH * (this.stepNum - this.stepNumRule + 1) +
      this.hangYOffset
    this.height = this.parent.hole.floorHeight
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

  computePosition() {
    let hole = this.parent.hole
    let edges = hole.outline.edges
    let botEdge = edges[0]
    let botCenter = {
      x: (edges[0].p1.x + edges[0].p2.x) / 2,
      y: (edges[0].p1.y + edges[0].p2.y) / 2,
    }
    let topCenter = botCenter
    for (const e of edges) {
      let center = { x: (e.p1.x + e.p2.x) / 2, y: (e.p1.y + e.p2.y) / 2 }
      if (center.y > botCenter.y && e.p1.x !== e.p2.x) {
        botCenter = center
        botEdge = e
      }
      if (center.y < topCenter.y && e.p1.x !== e.p2.x) {
        topCenter = center
      }
    }
    this.position = new Types.Vector3({ y: topCenter.y })
    if (this.againstWallType === Types.AgainstWallType.aw_no) {
      this.position.x = botCenter.x - this.width / 2
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.position.x =
        botEdge.p1.x < botEdge.p2.x
          ? botEdge.p2.x - this.width
          : botEdge.p1.x - this.width
    } else {
      this.position.x =
        botEdge.p1.x < botEdge.p2.x ? botEdge.p1.x : botEdge.p2.x
    }
  }

  addHangingBoard(vInfo) {
    this.hangingBoard = vInfo
    this.rebuild()
  }

  createFlights() {
    this.flights.push(new Flight(this))
  }

  createSmallColumns() {
    let args = this.smallColParameters
    let gArgs = this.girderParameters
    let hArgs = this.handrailParameters
    let i = Math.abs(1 - this.bigColParameters.posType)
    let step_num = this.stepNum + 1 - this.stepNumRule
    let size = tool.parseSpecification(args.specification)
    let angle = Math.tanh(this.height / (this.depth - this.hangYOffset))
    for (; i < step_num; i++) {
      let position1 = new Types.Vector3()
      let position2 = new Types.Vector3()
      position2.x = position1.x = this.sideOffset
      position2.z = position1.z = this.stepHeight * (i + 1)
      let length1 = 0
      let length2 = 0
      let border = this.stepWidth * (step_num - i) + this.hangYOffset
      if (args.arrangeRule === Types.ArrangeRule.arrThree) {
        let index = i % 2
        if (index === 0) {
          position1.y = border - Math.max(this.stepWidth / 6, size.y)
          position2.y =
            border - this.stepWidth + Math.max(this.stepWidth / 6, size.y)
          length1 = hArgs.height + (this.stepWidth / 6) * Math.tan(angle)
          length2 = hArgs.height + (this.stepWidth / 6) * 5 * Math.tan(angle)
          if (gArgs.type === Types.GirderType.gslab) {
            length2 = length1 = hArgs.height
            /**平板型大梁形状不确定，待确定后，需重新计算小柱的z坐标，即3d视图中的y坐标 */
          }
        } else {
          position1.y = border - this.stepWidth / 2
          length1 = hArgs.height + (this.stepWidth / 2) * Math.tan(angle)
          if (gArgs.type === Types.GirderType.gslab) {
            length1 = hArgs.height
          }
        }
      } else if (args.arrangeRule === Types.ArrangeRule.arrFour) {
        position1.y = border - this.stepWidth / 4
        position2.y = border - (this.stepWidth * 3) / 4
        length1 = hArgs.height + (this.stepWidth / 4) * Math.tan(angle)
        length2 = hArgs.height + ((this.stepWidth * 3) / 4) * Math.tan(angle)
        if (gArgs.type === Types.GirderType.gslab) {
          length2 = length1 = hArgs.height
        }
      }
      if (length1) {
        this.createDoubleSmallCol(position1, length1, size)
      }
      if (length2) {
        this.createDoubleSmallCol(position2, length2, size)
      }
    }
  }

  createDoubleSmallCol(position, length, size) {
    let leftPosition = position
    let rightPosition = new Types.Vector3({
      x: this.width - this.sideOffset,
      y: position.y,
      z: position.z,
    })
    size = new Types.Vector3({ x: size.x, y: size.y, z: length })
    this.smallColumns.push(new SmallColumn(this, leftPosition, size))
    this.smallColumns.push(new SmallColumn(this, rightPosition, size))
  }

  createBigColumns() {
    let args = this.bigColParameters
    let size = tool.parseSpecification(args.specification)
    let leftPosition = new Types.Vector3({
      x: this.sideOffset,
      y: this.depth + Default.BIG_COL_GAP + size.y / 2,
    })
    if (args.posType === Types.BigColumnPosType.bcp_first) {
      leftPosition.y = this.depth - this.stepWidth / 2
    }
    if (args.posType === Types.BigColumnPosType.bcp_second) {
      leftPosition.y = this.depth - this.stepWidth * 3 / 2
    }
    let rightPosition = new Types.Vector3({
      x: this.width - this.sideOffset,
      y: leftPosition.y,
    })
    this.bigColumns.push(
      new BigColumn(this, leftPosition, size),
      new BigColumn(this, rightPosition, size)
    )
  }

  createGirders() {
    let args = this.girderParameters
    if (args.type === Types.GirderType.gsaw) {
      return
      /**平面图不需要绘制锯齿梁，故先不做处理*/
    }
    let leftInEdges = [
      new Types.Edge({
        p1: new Types.Vector3({ x: args.depth, y: this.depth }),
        p2: new Types.Vector3({ x: args.depth, y: this.hangYOffset }),
      }),
    ]
    let leftOutEdges = [
      new Types.Edge({
        p1: new Types.Vector3({ x: 0, y: this.depth }),
        p2: new Types.Vector3({ x: 0, y: this.hangYOffset }),
      }),
    ]
    let rightInEdges = [
      new Types.Edge({
        p1: new Types.Vector3({
          x: this.stepLength - args.depth,
          y: this.depth,
        }),
        p2: new Types.Vector3({
          x: this.stepLength - args.depth,
          y: this.hangYOffset,
        }),
      }),
    ]
    let rightOutEdges = [
      new Types.Edge({
        p1: new Types.Vector3({ x: this.stepLength, y: this.depth }),
        p2: new Types.Vector3({ x: this.stepLength, y: this.hangYOffset }),
      }),
    ]
    this.girders.push(new Girder(this, leftInEdges, leftOutEdges))
    this.girders.push(new Girder(this, rightInEdges, rightOutEdges))
  }

  createHandrails() {
    let args = this.handrailParameters
    let bArgs = this.bigColParameters
    let route1 = new Types.Outline()
    let route2 = new Types.Outline()
    let leftPois = []
    let rightPois = []
    let startY = this.depth + Default.BIG_COL_GAP
    let bigColSize = tool.parseSpecification(bArgs.specification)
    if (bArgs.posType === Types.BigColumnPosType.bcp_first) {
      startY = this.depth - this.stepWidth / 2 - bigColSize.y / 2
    }
    if (bArgs.posType === Types.BigColumnPosType.bcp_second) {
      startY = this.depth - this.stepWidth * 3 / 2 - bigColSize.y / 2
    }
    
    leftPois[0] = new Types.Vector3({
      x: this.sideOffset,
      y: startY,
      z: args.height + this.stepHeight,
    })
    leftPois[1] = new Types.Vector3({
      x: this.sideOffset,
      y: this.depth,
      z: args.height + this.stepHeight,
    })
    leftPois[2] = new Types.Vector3({
      x: this.sideOffset,
      y: 0,
      z: args.height + this.height,
    })
    rightPois[0] = new Types.Vector3({
      x: this.width - this.sideOffset,
      y: startY,
      z: args.height + this.stepHeight,
    })
    rightPois[1] = new Types.Vector3({
      x: this.width - this.sideOffset,
      y: this.depth,
      z: args.height + this.stepHeight,
    })
    rightPois[2] = new Types.Vector3({
      x: this.width - this.sideOffset,
      y: 0,
      z: args.height + this.height,
    })

    for (let i = 0; i < leftPois.length - 1; i++) {
      route1.edges.push(
        new Types.Edge({
          p1: leftPois[i],
          p2: leftPois[i + 1],
          type: Types.EdgeType.estraight,
        })
      )
      route2.edges.push(
        new Types.Edge({
          p1: rightPois[i],
          p2: rightPois[i + 1],
          type: Types.EdgeType.estraight,
        })
      )
    }
    let size = tool.parseSpecification(args.source.specification, 'yxz')

    this.handrails.push(new Handrail(this, route1, size.x))
    this.handrails.push(new Handrail(this, route2, size.x))
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
        stepLength: this.width,
        stepWidth: this.flights[0].stepWidth,
        stepNumRule: this.stepNumRule,
        stepNum: this.stepNum,
      }),
      flights: this.writeItemArrayPB(this.flights),
      smallColumns: this.writeItemArrayPB(this.smallColumns),
      bigColumns: this.writeItemArrayPB(this.bigColumns),
      handrails: this.writeItemArrayPB(this.handrails),
      girders: this.writeItemArrayPB(this.girders),
      position: this.position,
    })
    if (this.hangingBoard) {
      pb.hangingBoard = this.hangingBoard
    }
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
