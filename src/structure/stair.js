import { Flight } from './flight'
import { Types } from '../types/stair_v2'
import { BigColumn } from './big_column'
import { Default } from './config'
import { Girder } from './gitder'
import { Handrail } from './handrails'
import { HangingBoard } from './hanging_board'
import { Info } from './info'
import { SmallColumn } from './small_column'
import tool from './tool'

export class Stair extends Info{
  constructor(vParent, vArgs) {
    super(vParent)
    this.againstWallType = Types.AgainstWallType.aw_no
    this.type = Types.StairType.sstright
    this.startBeamDepth = 0
    this.exitBeamDepth = 0
    this.stepNum = Default.STEP_NUM
    this.stepNumRule = Default.STEP_NUM_RULE
    this.stepWidth = Default.STEP_WIDTH
    this.stepLength = Default.STEP_LENGTH
    this.treadParameters = new Types.TreadParameters({
      depth: Default.TREAD_DEPTH,
      nossing: Default.TREAD_NOSSING,
      sideNossing: Default.TREAD_SIDE_NOSSING,
    })
    this.riserParameters = new Types.RiserParameters({
      depth: Default.RISER_DEPTH,
    })
    this.smallColParameters = new Types.SmallColParameters({
      arrange_rule: Default.SMALL_COL_ARR_RULE,
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
    this.rebuild ()
  }

  rebuild () {
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

  update () {

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

  addHangingBoard() {
    this.hangingBoard = new HangingBoard(this)
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
      if (args.arrange_rule === Types.ArrangeRule.arrThree) {
        let index = i % 2
        let border = this.stepWidth * (step_num - i) + this.hangYOffset
        if (index === 0) {
          position1.y = border - Math.max(this.stepWidth / 6, size.y)
          position2.y =
            border - this.stepWidth + Math.max(this.stepWidth / 6, size.y)
          length1 = hArgs.height + (this.stepWidth / 6) * Math.tan(angle)
          length2 = hArgs.height + (this.stepWidth / 6) * 5 * Math.tan(angle)
          if (gArgs.type === Types.GirderType.gslab) {
            length2 = length1 = gArgs.height
            /**平板型大梁形状不确定，待确定后，需重新计算小柱的z坐标，即3d视图中的y坐标 */
          }
        } else {
          position1.y = border - this.stepWidth / 2
          length1 = hArgs.height + (this.stepWidth / 2) * Math.tan(angle)
          if (gArgs.type === Types.GirderType.gslab) {
            length1 = gArgs.height
          }
        }
      } else if (args.arrange_rule === Types.ArrangeRule.arrFour) {
        position1.y = border - this.stepWidth / 4
        position2.y = border - (this.stepWidth * 3) / 4
        length1 = hArgs.height + (this.stepWidth / 4) * Math.tan(angle)
        length2 = hArgs.height + ((this.stepWidth * 3) / 4) * Math.tan(angle)
        if (gArgs.type === Types.GirderType.gslab) {
          length2 = length1 = gArgs.height
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
    size = new Types.Vector3({ x: size.x, y: size.y, z: length})
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
    let rightPosition = new Types.Vector3({
      x: this.width - this.sideOffset,
      y: this.depth + Default.BIG_COL_GAP + size.y / 2,
    })
    this.bigColumns.push(new BigColumn(this, leftPosition, size), new BigColumn(this, rightPosition, size))
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
    let route1 = new Types.Outline(),
      route2 = new Types.Outline()
    let leftPois = [],
      rightPois = []
    leftPois[0] = new Types.Vector3({
      x: this.sideOffset,
      y: this.depth + Default.BIG_COL_GAP,
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
      y: this.depth + Default.BIG_COL_GAP,
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