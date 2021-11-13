import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Outline } from "../utils/outline"
import { BigColumn } from "./big_column"
import { Default } from "./config"
import { Flight } from "./flight"
import { Girder } from "./girder"
import { Handrail } from "./handrail"
import { Landing } from "./landing"
import { SmallColumn } from "./small_column"
import { Stair } from "./stair"
import tool from "./tool"


export class LTypeStair extends Stair {
  constructor(vParnet, vAgainstWall, vFloadSide) {
    super(vParnet, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
    
    this.rebuild()
  }

  rebuild() {
    this.hangOffset = this.hangingBoard?.depth || 0
    let gArgs = this.girderParameters
    this.girOffset = gArgs.type === Types.GirderType.gslab? gArgs.depth : 0
    this.computeSize()
    this.computePosition()
    this.computeStepHeight()
    this.computeSideOffset()
    this.updateFlights()
    this.updateLandings()
    this.stepNumRule = this.flights[1].stepNumRule
    this.stepNum =
      this.flights[0].stepNum +
      this.flights[1].stepNum +
      this.landings[0].stepNum
    this.updateBorder()
    this.updateGirders()
    this.updateHandrails()
    this.updateSmallColumns()
    this.updateBigColumns()
    this.updateCanvas('Stair')
  }

  updateBorder() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let pois = []
    if (this.floadSide === Types.Side.si_right) {
      pois = [
        new Types.Vector3({y:this.depth}),
        new Types.Vector3({y:f2.stepLength}),
        new Types.Vector3(),
        new Types.Vector3({x:f1.stepLength}),
        new Types.Vector3({x:this.width}),
        new Types.Vector3({x:this.width, y:f2.stepLength}),
        new Types.Vector3({x:f1.stepLength, y:f2.stepLength}),
        new Types.Vector3({x:f1.stepLength, y:this.depth})
      ]
    } else {
      pois = [
        new Types.Vector3({x:this.width, y:this.depth}),
        new Types.Vector3({x:this.width, y:f2.stepLength}),
        new Types.Vector3({x:this.width}),
        new Types.Vector3({x:f2.length}),
        new Types.Vector3(),
        new Types.Vector3({y:f2.stepLength}),
        new Types.Vector3({x:f2.length, y:f2.stepLength}),
        new Types.Vector3({x:f2.length, y:this.depth})
      ]
    }
    let outline = tool.createOutlineByPois(pois)
    let edges = outline.edges
    let inEdges = [edges[0], edges[1], edges[2], edges[3]]
    let frontEdges = [edges[4]]
    let outEdges = [edges[5], edges[6]]
    let backEdges = [edges[7]]
    this.reverseEdges(outEdges)
    if (!this.border) {
      this.border = {
        in:{stairEdges:[], girders:[], handrails:[], bigCol:null},
        out:{stairEdges:[], girders:[], handrails:[], bigCol:null},
        front:{stairEdges:[]},
        back:{stairEdges:[]},
        clock: this.floadSide === Types.Side.si_right
      }
    }
      this.updateStairEdges(this.border.in.stairEdges, inEdges)
      this.updateStairEdges(this.border.out.stairEdges, outEdges)
      this.updateStairEdges(this.border.front.stairEdges, frontEdges)
      this.updateStairEdges(this.border.back.stairEdges, backEdges)
      if (this.landings[0].corBigCol) {
        this.border.out.stairEdges[0].endCol = this.landings[0].corBigCol
        this.border.out.stairEdges[1].startCol = this.landings[0].corBigCol
      }
      if (this.landings[0].oppoBigCol) {
        this.border.in.stairEdges[0].endCol = this.landings[0].oppoBigCol
        this.border.in.stairEdges[1].startCol = this.landings[0].oppoBigCol
      }
  }

  updateStairEdges (vStairEdges, vEdges) {
    for (let i = 0; i < vEdges.length; i++) {
      if (vStairEdges[i]) {
        vStairEdges[i].edge = vEdges[i]
      } else {
        vStairEdges[i] = {edge:vEdges[i], startCol:null, endCol:null}
      }
    }
  }

  /**
   * 
   * @param {Array<Types.Edge>} vEdges 
   */
  reverseEdges (vEdges) {
    vEdges.forEach(e => {
      let temp = e.p1
      e.p1 = e.p2
      e.p2 = temp
    })
    vEdges.reverse()
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    this.position = new Types.Vector3()
    if (this.floadSide === Types.Side.si_right) {
      let rightEdge = this.parent.hole.getEdgeByPos('right')
      this.position.x = topEdge.p2.x - this.width
      if (this.againstWallType === Types.AgainstWallType.aw_right) {
        this.position.y = rightEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (rightEdge.p1.y + rightEdge.p2.y) / 2 - Default.STEP_LENGTH / 2
      } else {
        this.position.y = topEdge.p2.y
      }
    } else {
      let leftEdge = this.parent.hole.getEdgeByPos('left')
      this.position.x = topEdge.p1.x
      if (this.againstWallType === Types.AgainstWallType.aw_left) {
        this.position.y = leftEdge.p2.y - this.depth
      } else if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.position.y = (leftEdge.p1.y + leftEdge.p2.y) / 2 - Default.STEP_LENGTH / 2
      } else {
        this.position.y = topEdge.p1.y
      }
    }
  }

  computeSize() {
    let hole = this.parent.hole
    this.height = hole.floorHeight
    if (this.flights.length === 0) {
      let topEdge = hole.getEdgeByPos('top')
      this.width = new Edge(topEdge).getLength()
      if (this.againstWallType === Types.AgainstWallType.aw_no) {
        this.width = this.width * 2 / 3
      }
      let f2StepNum = (this.width - Default.STEP_LENGTH) / Default.STEP_WIDTH
      let f1StepNum = this.stepNum - this.stepNumRule + 1 - f2StepNum - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)
      f1StepNum = Math.ceil(f1StepNum)
      this.depth = f1StepNum * Default.STEP_WIDTH + Default.STEP_LENGTH
    } else {
      let f1 = this.flights[0]
      let f2 = this.flights[1]
      this.width = f1.stepLength + f2.length + this.hangOffset
      this.depth = f2.stepLength + f1.length
    }
  }

  updateFlights () {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let sL1 = f1 ? f1.stepLength : Default.STEP_LENGTH
    let sL2 = f2 ? f2.stepLength : Default.STEP_LENGTH
    let wVec1 = new Types.Vector3({y:1})
    let wVec2X = this.floadSide === Types.Side.si_right ? -1 : 1
    let wVec2 = new Types.Vector3({x:wVec2X})
    let lVec1 = new Types.Vector3({x:1})
    let lVec2 = new Types.Vector3({y:1}) 
    let pos2 = new Types.Vector3({x:this.width - this.hangOffset, y:this.girOffset})
    let pos1 = new Types.Vector3({x:this.girOffset, y:sL2})
    if (this.floadSide === Types.Side.si_left) {
      pos2.x = this.hangOffset
      pos1.x = this.width - sL1 + this.girOffset
    }
    if (this.flights.length === 2) {
      f1.rebuildByParent({vTreadIndex:0, 
                          vPos:pos1, 
                          vLVec:lVec1, 
                          vWVec:wVec1})
      f2.rebuildByParent({vTreadIndex:f1.stepNum + this.landings[0].stepNum, 
                          vPos:pos2, 
                          vLVec:lVec2, 
                          vWVec:wVec2})
    } else {
      let rst = this.computeStepNum(this.stepNum, this.depth - Default.STEP_LENGTH, this.width - Default.STEP_LENGTH)
      this.flights[0] = new Flight({vParent:this, 
                                    vStepNum:rst.firstNum, 
                                    vStepNumRule:Types.StepNumRule.snr_n, 
                                    vIndex:0, 
                                    vTreadIndex:0, 
                                    isLast:false, 
                                    vPos:pos1, 
                                    vLVec:lVec1, 
                                    vWVec:wVec1, 
                                    vLength:this.depth - Default.STEP_LENGTH})
      this.flights[1] = new Flight({vParent:this, 
                                    vStepNum:rst.secondNum, 
                                    vStepNumRule:this.stepNumRule, 
                                    vIndex:1, 
                                    vTreadIndex:rst.firstNum + Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE), 
                                    isLast:true, 
                                    vPos:pos2, 
                                    vLVec:lVec2, 
                                    vWVec:wVec2, 
                                    vLength:this.width - Default.STEP_LENGTH})
    }
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (vKey1 === 'stepNum') {
      let rst = this.computeStepNum(vValue, this.flights[0].length, this.flights[1].length)
      this.flights[0].updateItem(rst.firstNum, vKey1, vKey2)
      this.flights[1].updateItem(rst.secondNum, vKey1, vKey2)
    } else if (vKey1 === 'stepNumRule') {
      this.stepNumRule = vValue
      this.flights[1].updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  computeStepNum(vStepNum, vLength1, vLength2) {
    let step_num = vStepNum + 1 - this.stepNumRule
    let fStepNum
    if (this.landings.length) {
      fStepNum = step_num - this.landings[0].stepNum
    } else {
      fStepNum = step_num - Landing.STEP_NUM_MAP.get(Default.LANDING_TYPE)
    }
    let firstNum = Math.ceil(vLength1 / (vLength1+vLength2) * fStepNum)
    let secondNum = fStepNum - firstNum + this.stepNumRule - 1
    return {
      firstNum: firstNum,
      secondNum: secondNum
    }
  }

  updateLandings() {
    let f1 = this.flights[0]
    let f2 = this.flights[1]
    let ori = new Types.Vector3({x:this.girOffset, y:this.girOffset})
    let nextIndex = 1
    if (this.floadSide === Types.Side.si_left) {
      ori.x = f2.length
      nextIndex = 3
    }
    let border = tool.createRectOutline(ori, f1.stepLength - this.girOffset, f2.stepLength - this.girOffset)
    let paras = {vParent:this, 
                vTreadIndex:f1.stepNum, 
                vBorder:border, 
                vLastEdgeIndex:2, 
                vNextEdgeIndex:nextIndex, 
                vLastStepWidth:f1.stepWidth, 
                vNextStepWidth:f2.stepWidth}
    if (this.landings[0]) {
      this.landings[0].rebuildByParent(paras)
    } else {
      this.landings[0] = new Landing(paras)
    }
  }

  updateGirders() {
    let args = this.girderParameters
    this.girders = []
    if (args.type === Types.GirderType.gsaw) {
      return
      /**平面图不需要绘制锯齿梁，故先不做处理*/
    }
    let bor = this.border
    let inBorderEdges = [
      new Edge(bor.in.stairEdges[0].edge).combineEdge(bor.in.stairEdges[1].edge),
      new Edge(bor.in.stairEdges[2].edge).combineEdge(bor.in.stairEdges[3].edge)
    ]
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
      this.updateSideGirder(outEdges, 'in', args.depth, i, !bor.clock)
    }
    for (let i = 0; i < bor.out.stairEdges.length; i++) {
      let e = bor.out.stairEdges[i].edge
      let corOffsetX = 0
      let corOffsetY = 0
      let corCol = this.landings[0].corBigCol
      if (corCol) {
        corOffsetX = (corCol.size.x - args.depth) / 2
        corOffsetY = (corCol.size.y - args.depth) / 2
      }
      let start = i === 0 ? new Edge(e).extendP1(args.fOffsetStep).p1 : new Edge(e).extendP1(-corOffsetX).p1
      let end = i === 0 ? new Edge(e).extendP2(-corOffsetY).p2 : e.p2
      let outEdges = [
        new Types.Edge({
          p1: start,
          p2: end,
          type: Types.EdgeType.estraight
        })
      ]
      this.updateSideGirder(outEdges, 'out', args.depth, i, bor.clock)
    }
  }

  updateSideGirder (vOutEdges, vSide, vDepth, vIndex, vPlus) {
    let inEdges = []
    let bor = this.border
    for (const e of vOutEdges) {
      let inE = new Edge(e).offSet(vDepth, vPlus)
      inEdges.push(inE)
    }
    if (bor[vSide].girders[vIndex]) {
      bor[vSide].girders[vIndex].rebuildByParent(inEdges, vOutEdges)
    } else {
      bor[vSide].girders[vIndex] = new Girder(this, inEdges, vOutEdges)
    }
    this.girders.push(bor[vSide].girders[vIndex])
  }

  updateSmallColumns () {
    this.smallColumns = []
    let bor = this.border
    this.updateSideSmallCols([bor.in.stairEdges[0],bor.in.stairEdges[3]],!this.border.clock)
    this.updateSideSmallCols(bor.out.stairEdges,this.border.clock)
    let args = this.smallColParameters
    let size = tool.parseSpecification(args.specification)
    let dis1, dis2
    if (args.arrangeRule === Types.ArrangeRule.arrThree) {
      dis1 = this.flights[0].stepWidth * 2 / 3
      dis2 = this.flights[1].stepWidth * 2 / 3
    } else {
      dis1 = this.flights[0].stepWidth / 2
      dis2 = this.flights[1].stepWidth / 2
    }
    this.smallColumns = this.smallColumns.concat(this.landings[0].createSmallCols(dis1, dis2, size))
  }

  updateSideSmallCols (vStairEdges, vSideOffsetPlus) {
    let args = this.smallColParameters
    let size = tool.parseSpecification(args.specification)
    for (let i = 0; i < vStairEdges.length; i++) {
      let sideE = vStairEdges[i].edge
      let treads = this.flights[i].treads
      let utilVec = new Edge(sideE).getVec()
      let widthSum = 0
      let k = 0
      if (i === 0) {
        k = Math.abs(1 - this.bigColParameters.posType)
        for (let j = 0; j < k; j++) {
          widthSum = widthSum + treads[j].stepWidth
        }
      }
      for (; k < treads.length; k++) {
        let t = treads[k]
        if (t.isLast) {
          continue
        }
        let start = new THREE.Vector2(sideE.p1.x, sideE.p1.y).addScaledVector(utilVec, widthSum)
        let end = new THREE.Vector2(sideE.p1.x, sideE.p1.y).addScaledVector(utilVec, widthSum + t.stepWidth)
        let edge = new Types.Edge({p1:start, p2:end})
        edge = new Edge(edge).offSet(this.sideOffset, vSideOffsetPlus)
        let pos1 = null
        let pos2 = null
        if (args.arrangeRule === Types.ArrangeRule.arrThree) {
          let index = k % 2
          if (index === 0) {
            pos1 = new Edge(edge).extendP1(-Math.abs(t.stepWidth/6,size.x/2)).p1
            pos2 = new Edge(edge).extendP2(-Math.abs(t.stepWidth/6,size.x/2)).p2
          } else {
            pos1 = new Edge(edge).extendP1(-t.stepWidth/2).p1
          }
        } else {
          pos1 = new Edge(edge).extendP1(-t.stepWidth/4).p1
          pos2 = new Edge(edge).extendP1(-t.stepWidth*3/4).p1
        }
        if (pos1) {
          this.smallColumns.push(new SmallColumn(this, pos1, size))
        }
        if (pos2) {
          this.smallColumns.push(new SmallColumn(this, pos2, size))
        }
        widthSum = widthSum + t.stepWidth
      }
    }
  }

  updateHandrails () {
    this.handrails = []
    let bor = this.border
    this.updateSideHandrails(bor.in.stairEdges, 'in', !bor.clock)
    this.updateSideHandrails(bor.out.stairEdges, 'out', bor.clock)
  }

  updateSideHandrails (vStairEdges, vSide, vSideOffsetPlus) {
    let routeEdgesArr = [[]]
    let routeIndex = 0
    let borSide = this.border[vSide]
    for (let i = 0; i < vStairEdges.length; i++) {
      let e = vStairEdges[i].edge
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
      if (i === 0) {
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
      if (borSide.handrails[i]) {
        borSide.handrails[i].rebuildByParent(route)
      } else {
        borSide.handrails[i] = new Handrail(this, route)
      }
      this.handrails.push(borSide.handrails[i])
    }
  }

  updateBigColumns () {
    this.bigColumns = []
    this.updateBigCol(this.border.in.stairEdges[0], 'in', !this.border.clock)
    this.updateBigCol(this.border.out.stairEdges[0], 'out', this.border.clock)
  }

  updateBigCol (vStairEdge, vSide, vSideOffsetPlus) {
    let args = this.bigColParameters
    let size = tool.parseSpecification(args.specification)
    let offSet = this.computeBigColOffset()
    offSet = offSet + size.x / 2
    let edge = new Edge(vStairEdge.edge).offSet(this.sideOffset, vSideOffsetPlus)
    let position = new Edge(edge).extendP1(offSet).p1
    if (this.border[vSide].bigCol) {
      this.border[vSide].bigCol.rebuildByParent(position)
    } else {
      this.border[vSide].bigCol = new BigColumn({vParent:this,vPosition:position})
    }
    this.bigColumns.push(this.border[vSide].bigCol)
  }
  
}
