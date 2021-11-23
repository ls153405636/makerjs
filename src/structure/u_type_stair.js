import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
import { Outline } from "../utils/outline"
import { BigColumn } from "./big_column"
import { Girder } from "./girder"
import { Handrail } from "./handrail"
import { SmallColumn } from "./small_column"
import { Stair } from "./stair"
import tool from "./tool"


export class UTypeStair extends Stair {
  constructor(vParnet, vAgainstWall, vFloadSide ) {
    super(vParnet, vAgainstWall)
    if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.floadSide = Types.Side.si_right
    } else if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.floadSide = Types.Side.si_left
    } else {
      this.floadSide = vFloadSide || Types.Side.si_right
    }
  }

  computePosition() {
    let topEdge = this.parent.hole.getEdgeByPos('top')
    let botEdge = this.parent.hole.getEdgeByPos('bot')
    this.position = new Types.Vector3()
    this.position.y = botEdge.p1.y - this.depth2
    if (this.againstWallType === Types.AgainstWallType.aw_right) {
      this.position.x = topEdge.p2.x - this.width
    } else if (this.againstWallType === Types.AgainstWallType.aw_left) {
      this.position.x = topEdge.p1.x
    } else {
      this.position.x = new Edge(topEdge).getCenter().x - this.width / 2
    }
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey2 && ['model', 'material'].includes(vKey2)) {
      console.log(1)
    } else if (vKey1 === 'stepNum') {
      let lengthArr = []
      this.flights.forEach(f => {
        lengthArr.push(f.length)
      })
      let stepNumArr = this.computeFlightStepNum(vValue, lengthArr)
      this.flights.forEach((f,i) => {
        f.updateItem(stepNumArr[i], vKey1, vKey2)
      })
    } else if (vKey1 === 'stepNumRule') {
      this.stepNumRule = vValue
      this.flights[this.flights.length - 1].updateItem(vValue, vKey1, vKey2)
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  computeFlightStepNum (vStepNum, vLengthArr) {
    let fStepNum = vStepNum + 1 - this.stepNumRule
    this.landings.forEach(l=>{
      fStepNum = fStepNum - l.stepNum
    })
    let stepNumArr = []
    let stepNumSum = 0
    let i = 0
    let lengthSum = 0
    vLengthArr.forEach(l => {
      lengthSum += l
    })
    for (; i < vLengthArr.length - 1; i++) {
      let num = Number((vLengthArr[i] / lengthSum * fStepNum).toFixed(0))
      num = Math.max(num, 1)
      stepNumArr.push(num)
      stepNumSum += num
    }
    stepNumArr[i] = Math.max(fStepNum - stepNumSum, 1)
    stepNumArr[i] = stepNumArr[i] + this.stepNumRule - 1
    return stepNumArr
  }

  computeStepNum () {
    this.stepNum = 0
    for (const f of this.flights) {
      this.stepNum = this.stepNum + f.stepNum
    }
    for (const l of this.landings) {
      this.stepNum = this.stepNum + l.stepNum
    }
    this.stepNumRule = this.flights[this.flights.length - 1].stepNumRule
    this.realStepNum = this.stepNum - this.stepNumRule + 1
  }

  updateStartFlight() {
    if (this.startFlight) {
      let pos = new Types.Vector3({x:this.girOffset, y:this.depth1})
      let f1 = this.flights[0]
      this.startFlight.rebuildByParent({vPos:pos, 
                                        vLVec:new Types.Vector3({x:1}),
                                        vWVec:new Types.Vector3({y:1}),
                                        vStepLength: f1.stepLength})
    }
  }

  getInSideOffsetPlus () {
    return this.floadSide === Types.Side.si_left
  }

  getOutSideOffsetPlus () {
    return this.floadSide !== Types.Side.si_left
  }

  // updateGirders () {
  //   let args = this.girderParameters
  //   this.girders = []
  //   if (args.type === Types.GirderType.gsaw) {
  //     return
  //     /**平面图不需要绘制锯齿梁，故先不做处理*/
  //   }
  //   let bor = this.border
  //   let inBorderEdges = this.getGirderInEdges()
  //   for (let i = 0; i < inBorderEdges.length; i++) {
  //     let e = inBorderEdges[i]
  //     let start = i === 0 ? new Edge(e).extendP1(args.fOffsetStep).p1 : new Edge(e).extendP1(-args.depth).p1
  //     let end = new Types.Vector3(e.p2)
  //     let outEdges = [
  //       new Types.Edge({
  //         p1: start,
  //         p2: end,
  //         type: Types.EdgeType.estraight
  //       })
  //     ]
  //     this.updateSideGirder(outEdges, 'in', args.depth, i, this.floadSide === Types.Side.si_left)
  //   }
  //   for (let i = 0; i < bor.out.edges.length; i++) {
  //     let e = bor.out.edges[i]
  //     if (!e.flight) {
  //       continue
  //     }
  //     let utilE = new Edge(e)
  //     if (i === 0) {
  //       utilE.extendP1(args.fOffsetStep)
  //     }
  //     if (e.startCol) {
  //       let offset = (e.startCol.size.x - args.depth) / 2
  //       utilE.extendP1(-offset)
  //     }
  //     if (e.endCol) {
  //       let offSet = (e.endCol.size.x - args.depth) / 2
  //       utilE.extendP2(-offSet)
  //     }
  //     let outEdges = [
  //       utilE.writePB()
  //     ]
  //     this.updateSideGirder(outEdges, 'out', args.depth, i, this.floadSide !== Types.Side.si_left)
  //   }
  // }

  // updateSideGirder (vOutEdges, vSide, vDepth, vIndex, vPlus) {
  //   let inEdges = []
  //   let bor = this.border
  //   for (const e of vOutEdges) {
  //     let inE = new Edge(e).offset(vDepth, vPlus)
  //     inEdges.push(inE)
  //   } 
  //   if (bor[vSide].girders[vIndex]) {
  //     bor[vSide].girders[vIndex].rebuildByParent(inEdges, vOutEdges)
  //   } else {
  //     bor[vSide].girders[vIndex] = new Girder(this, inEdges, vOutEdges)
  //   }
  //   this.girders.push(bor[vSide].girders[vIndex])
  // }

  // updateHandrails () {
  //   this.handrails = []
  //   let bor = this.border
  //   this.updateSideHandrails(bor.in.edges, 'in', this.floadSide === Types.Side.si_left)
  //   this.updateSideHandrails(bor.out.edges, 'out', this.floadSide !== Types.Side.si_left)
  // }

  // updateSideHandrails (vStairEdges, vSide, vSideOffsetPlus) {
  //   let routeEdgesArr = [[]]
  //   let routeIndex = 0
  //   let borSide = this.border[vSide]
  //   for (let i = 0; i < vStairEdges.length; i++) {
  //     let e = vStairEdges[i]
  //     let sCol = vStairEdges[i].startCol
  //     let eCol = vStairEdges[i].endCol
  //     let gArgs = this.girderParameters
  //     let start = new Types.Vector3(e.p1)
  //     let end = new Types.Vector3(e.p2)
  //     let edge = new Edge({
  //       p1:start,
  //       p2:end,
  //       type:Types.EdgeType.estraight
  //     })
  //     let utilE = new Edge(edge)
  //     if (i === 0) {
  //       let frontOffset = this.computeBigColOffset()
  //       utilE.extendP1(frontOffset).p1
  //     }
  //     if (sCol) {
  //       let sOffset = 0
  //       //这里取支撑柱的长还是宽需根据方向确定，但因为目前长宽都一样，所以全部取长
  //       if (gArgs.type === Types.GirderType.gslab) {
  //         sOffset = sCol.size.x / 2 - Math.abs(e.p1.x - sCol.position.x)
  //       }
  //       utilE.extendP1(-sOffset)
  //       if (i !== 0) {
  //         routeIndex++
  //         routeEdgesArr[routeIndex] = []
  //       }
  //     }
  //     if (eCol) {
  //       let eOffset = 0
  //       if (gArgs.type === Types.GirderType.gslab) {
  //         eOffset = eCol.size.x / 2 - Math.abs(e.p2.x - eCol.position.x)
  //       }
  //       utilE.extendP2(-eOffset)
  //     }
  //     routeEdgesArr[routeIndex].push(utilE.writePB())
  //   }
  //   for (let i = 0; i < routeEdgesArr.length; i++) {
  //     let edges = routeEdgesArr[i]
  //     let route = new Types.Outline({edges:edges, isClose:false})
  //     route = new Outline(route).offset(this.sideOffset, vSideOffsetPlus)
  //     if (borSide.handrails[i]) {
  //       borSide.handrails[i].rebuildByParent(route)
  //     } else {
  //       borSide.handrails[i] = new Handrail(this, route)
  //     }
  //     this.handrails.push(borSide.handrails[i])
  //   }
  // }

  // updateSmallColumns() {
  //   let args = this.smallColParameters
  //   let size = tool.parseSpecification(args.specification)
  //   this.smallColumns = []
  //   let bor = this.border
  //   this.updateSideSmallCols(bor.in.edges, 'in')
  //   this.updateSideSmallCols(bor.out.edges, 'out')
  //   let dis
  //   if (args.arrangeRule === Types.ArrangeRule.arrThree) {
  //     dis = Math.max(this.flights[0].stepWidth, this.flights[1].stepWidth) * 2 / 3
  //   } else {
  //     dis = Math.max(this.flights[0].stepWidth, this.flights[1].stepWidth) / 2
  //   }
  //   this.smallColumns = this.smallColumns.concat(this.landings[0].createSmallCols(dis, dis, size))
  //   this.smallColumns = this.smallColumns.concat(this.landings[1].createSmallCols(dis, dis, size))
  // }

  // updateSideSmallCols(vStairEdges, vSide) {
  //   let args = this.smallColParameters
  //   let size = tool.parseSpecification(args.specification)
  //   let gArgs = this.girderParameters
  //   let sideOffset = gArgs.type === Types.GirderType.gslab ? -this.sideOffset : this.sideOffset
  //   for (let i = 0; i < vStairEdges.length; i++) {
  //     let sideE = vStairEdges[i]
  //     let flight = sideE.flight
  //     if (!(flight?.treads)) {
  //       continue
  //     }
  //     let k = 0
  //     if (i === 0) {
  //       k = Math.abs(1 - this.bigColParameters.posType)
  //     }
  //     for (; k < flight.treads.length; k++) {
  //       let t = flight.treads[k]
  //       if (t.isLast) {
  //         continue
  //       }
  //       let posArr = []
  //       let sideOffsetK = sideOffset
  //       if (vSide === 'out') {
  //         sideOffsetK = sideOffset + t.stepLength - flight.stepLength
  //       }
  //       if (args.arrangeRule === Types.ArrangeRule.arrThree) {
  //         let index = k % 2
  //         if (index === 0) {
  //           let rate = Math.max(1/6, size.x/2/t.stepWidth)
  //           posArr = t.getColPos([rate, 1-rate], vSide, sideOffsetK)
  //         } else {
  //           posArr = t.getColPos([1/2], vSide, sideOffsetK)
  //         }
  //       } else {
  //         posArr = t.getColPos([1/4, 3/4], vSide, sideOffsetK)
  //       }
  //       for (const p of posArr) {
  //         this.smallColumns.push(new SmallColumn(this, p, size))
  //       }
  //     }
  //   }
  // }

  // updateBigColumns () {
  //   this.bigColumns = []
  //   this.updateBigCol(this.border.in.edges[0], 'in', this.floadSide === Types.Side.si_left)
  //   this.updateBigCol(this.border.out.edges[0], 'out', this.floadSide !== Types.Side.si_left)
  // }

  // updateBigCol (vStairEdge, vSide, vSideOffsetPlus) {
  //   let args = this.bigColParameters
  //   let size = tool.parseSpecification(args.specification)
  //   let offset = this.computeBigColOffset()
  //   offset = offset + size.x / 2
  //   let edge = new Edge(vStairEdge).offset(this.sideOffset, vSideOffsetPlus)
  //   let position = new Edge(edge).extendP1(offset).p1
  //   if (this.border[vSide].bigCol) {
  //     this.border[vSide].bigCol.rebuildByParent(position)
  //   } else {
  //     this.border[vSide].bigCol = new BigColumn({vParent:this,vPosition:position})
  //   }
  //   this.bigColumns.push(this.border[vSide].bigCol)
  // }
}