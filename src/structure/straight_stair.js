import { Flight } from './flight_t'
import { Types } from '../types/stair_v2'
import { BigColumn } from './big_column'
import { Default } from './config'
import { Girder } from './girder'
import { Handrail } from './handrail'
import { SmallColumn } from './small_column'
import tool from './tool'
import { Stair } from './stair'
import { Edge } from '../utils/edge'

export class StraightStair extends Stair  {
  constructor(vParent, vAgainstWall) {
    super(vParent, vAgainstWall)
    this.rebuild()
  }

  rebuild() {
    this.smallColumns = []
    this.hangYOffset = this.hangingBoard?.depth || 0
    this.computeSize()
    this.computePosition()
    this.computeStepHeight()
    this.computeSideOffset()
    this.updateFlights()
    this.stepNum = this.flights[0].stepNum
    this.stepNumRule = this.flights[0].stepNumRule
    this.createSmallColumns()
    this.createBigColumns()
    this.createHandrails()
    this.createGirders()
    this.hangingBoard && this.hangingBoard.rebuild()
    this.updateCanvas('Stair')
  }                                                                     

  computeSize() {
    if (this.flights[0]) {
      this.width = this.flights[0].stepLength
    } else {
      this.width = Default.STEP_LENGTH
    }
    let hole = this.parent.hole
    if (this.flights[0]) {
      this.depth = this.flights[0].length
    } else if (this.againstWallType === Types.AgainstWallType.aw_left){
      this.depth = new Edge(hole.getEdgeByPos('left')).getLength()
    } else if (this.againstWallType === Types.AgainstWallType.aw_right){
      this.depth = new Edge(hole.getEdgeByPos('right')).getLength()
    } else if (this.againstWallType === Types.AgainstWallType.aw_no){
      this.depth = Default.STEP_WIDTH * (this.stepNum - this.stepNumRule + 1)
    }
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

  addHangingBoard(vInfo) {
    this.hangingBoard = vInfo
    this.rebuild()
  }

  updateFlights() {
    let gArgs = this.girderParameters
    let xOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    let pos = new Types.Vector3({x:xOffset})
    let paras = {vParent:this, 
                vStepNum: this.stepNum, 
                vStepNumRule: this.stepNumRule, 
                vIndex:0, 
                vTreadIndex:0, 
                isLast:true, 
                vPos:pos, 
                vLVec:new Types.Vector3({x:1}), 
                vWVec:new Types.Vector3({y:1}), 
                vLength:this.depth}
    if (this.flights[0]) {
      this.flights[0].rebuildByParent(paras)
    } else {
      this.flights[0] = new Flight(paras)
    }
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
      let border = this.hangYOffset + this.flights[0].getLengthByNum(i)
      let stepWidth = this.flights[0].getTreadByNum(i).stepWidth
      if (args.arrangeRule === Types.ArrangeRule.arrThree) {
        let index = i % 2
        if (index === 0) {
          position1.y = border - Math.max(stepWidth / 6, size.y/2)
          position2.y =
            border - stepWidth + Math.max(stepWidth / 6, size.y/2)
          length1 = hArgs.height + (stepWidth / 6) * Math.tan(angle)
          length2 = hArgs.height + (stepWidth / 6) * 5 * Math.tan(angle)
          if (gArgs.type === Types.GirderType.gslab) {
            length2 = length1 = hArgs.height
            /**平板型大梁形状不确定，待确定后，需重新计算小柱的z坐标，即3d视图中的y坐标 */
          }
        } else {
          position1.y = border - stepWidth / 2
          length1 = hArgs.height + (stepWidth / 2) * Math.tan(angle)
          if (gArgs.type === Types.GirderType.gslab) {
            length1 = hArgs.height
          }
        }
      } else if (args.arrangeRule === Types.ArrangeRule.arrFour) {
        position1.y = border - stepWidth / 4
        position2.y = border - (stepWidth * 3) / 4
        length1 = hArgs.height + (stepWidth / 4) * Math.tan(angle)
        length2 = hArgs.height + ((stepWidth * 3) / 4) * Math.tan(angle)
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
    let stepWidth = this.flights[0].getTreadByNum(0).stepWidth
    if (args.posType === Types.BigColumnPosType.bcp_first) {
      leftPosition.y = this.depth - stepWidth / 2
    }
    if (args.posType === Types.BigColumnPosType.bcp_second) {
      leftPosition.y = this.depth - (stepWidth * 3) / 2
    }
    let rightPosition = new Types.Vector3({
      x: this.width - this.sideOffset,
      y: leftPosition.y,
    })
    if (this.bigColumns.length === 2) {
      this.bigColumns[0].rebuildByParent(leftPosition, size)
      this.bigColumns[1].rebuildByParent(rightPosition, size)
    } else {
      this.bigColumns.push(
        new BigColumn(this, leftPosition, size),
        new BigColumn(this, rightPosition, size)
      )
    }
  }

  createGirders() {
    let args = this.girderParameters
    if (args.type === Types.GirderType.gsaw) {
      this.girders = []
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
          x: this.width - args.depth,
          y: this.depth,
        }),
        p2: new Types.Vector3({
          x: this.width - args.depth,
          y: this.hangYOffset,
        }),
      }),
    ]
    let rightOutEdges = [
      new Types.Edge({
        p1: new Types.Vector3({ x: this.width, y: this.depth }),
        p2: new Types.Vector3({ x: this.width, y: this.hangYOffset }),
      }),
    ]
    if (this.girders.length === 2) {
      this.girders[0].rebuildByParent(leftInEdges, leftOutEdges)
      this.girders[1].rebuildByParent(rightInEdges, rightOutEdges)
    } else {
      this.girders.push(new Girder(this, leftInEdges, leftOutEdges))
      this.girders.push(new Girder(this, rightInEdges, rightOutEdges))
    }
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
    let stepWidth = this.flights[0].getTreadByNum(0).stepWidth
    if (bArgs.posType === Types.BigColumnPosType.bcp_first) {
      startY = this.depth - stepWidth / 2 - bigColSize.y / 2
    }
    if (bArgs.posType === Types.BigColumnPosType.bcp_second) {
      startY = this.depth - (stepWidth * 3) / 2 - bigColSize.y / 2
    }

    leftPois[0] = new Types.Vector3({
      x: this.sideOffset,
      y: startY,
      z: args.height + this.stepHeight,
    })
    leftPois[1] = new Types.Vector3({
      x: this.sideOffset,
      y: startY - Default.BIG_COL_GAP,
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
      y: startY - Default.BIG_COL_GAP,
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

    if (this.handrails.length === 2) {
      this.handrails[0].rebuildByParent(route1, size.x)
      this.handrails[1].rebuildByParent(route2, size.x)
    } else {
      this.handrails.push(new Handrail(this, route1, size.x))
      this.handrails.push(new Handrail(this, route2, size.x))
    }
  }
}
