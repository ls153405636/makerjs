import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { ChildInfo } from "./child_info";
import { Default } from "./config";
import tool from "./tool";


export class Landing extends ChildInfo {
  static STEP_NUM_MAP = new Map([
    [Types.LandingCutType.lct_first, 1],
    [Types.LandingCutType.lct_second, 3],
    [Types.LandingCutType.lct_third, 2],
    [Types.LandingCutType.lct_fourth, 2],
    [Types.LandingCutType.lct_fifth, 3]
  ])
  /**
   * 
   * @param {Object} param0 
   * @param {Number} param0.vBorder 
   */
  constructor ({vParent, vTreadIndex, vBorder, vLastEdgeIndex, vNextEdgeIndex, vLastStepWidth, vNextStepWidth}) {
    super(vParent)
    this.type = Default.LANDING_TYPE
    this.corIndex = Math.max(vLastEdgeIndex, vNextEdgeIndex)
    if (Math.abs(vLastEdgeIndex - vNextEdgeIndex) === 3) {
      this.corIndex = 0
    }
    this.oppoIndex = Math.abs(this.corIndex - 2)
    this.lastEdgeIndex = vLastEdgeIndex
    this.nextEdgeIndex = vNextEdgeIndex
    this.rebuild({vTreadIndex, vBorder,  vLastStepWidth, vNextStepWidth})
  }

  /**
   * 
   * @param {Object} param0 
   * @param {Types.Outline} param0.vBorder 整体休台的边界轮廓
   * @param {Number} param0.vTreadIndex 第一级踏板的序号
   * @param {Number} param0.vLastStepWidth 上段楼梯的步宽
   * @param {Number} param0.vNextStepWidth 下段楼梯的步宽
   */
  rebuild ({vTreadIndex, vBorder, vLastStepWidth, vNextStepWidth}) {
    this.pois = []
    vBorder.edges.forEach(e => {
      this.pois.push(e.p1)
    })
    this.stepNum = Landing.STEP_NUM_MAP[this.type]
    this.treadIndex = vTreadIndex
    this.edges = vBorder.edges
    this.lastStepWidth = vLastStepWidth
    this.nextStepWidth = vNextStepWidth
    this.edgeL = this.edges[this.lastEdgeIndex]
    this.edgeN = this.edges[this.nextEdgeIndex]
    this.sideEdgeL = this.edges[(this.nextEdgeIndex + 2)%4]
    this.sideEdgeN = this.edges[(this.lastEdgeIndex + 2)%4]
  }

  writePB() {
    return new Types.Landing({
      uuid:this.uuid,
      type:this.type,
      treads: this.createTreads()
    })
  }

  createTreads() {
    let treads = []
    let outlines = []
    if (this.type === Types.LandingCutType.lct_first) {
      outlines = [tool.createOutlineByPois(this.pois)]
    } else if (this.type === Types.LandingCutType.lct_second) {
      outlines = this.createSecondOutlines()
    } else {
      outlines = this.createInCutOutlines()
    }
    for (let i = 0; i < outlines.length; i++) {
      treads.push(new Types.Tread({
        index:this.treadIndex + i + 1,
        stepOutline: outlines[i]
      }))
    }
    return treads
  }

  createSecondOutlines(){
    let cor = this.pois[this.corIndex] //转角点
    let oppo = this.pois[(this.corIndex+2)%4] //对角点
    let outlines = []
    let sideDisL = new Edge(this.edgeL).getLength() * Math.tan(Math.PI / 6) //上段楼梯侧边断点的偏移距离
    let sideDisN = new Edge(this.edgeN).getLength() * Math.tan(Math.PI / 6) //下段楼梯侧边断点的偏移距离
    if (this.lastEdgeIndex === this.corIndex) {
      let bpL = new Edge(this.sideEdgeL).extendP1(-sideDisL).p1 //上段楼梯侧边断点
      let bpN = new Edge(this.sideEdgeN).extendP2(-sideDisN).p2 //下段楼梯侧边断点
      let pL = this.edgeL.p2 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p1 //下段楼梯对应边的另个端点
      outlines.push(tool.createOutlineByPois([bpL, cor, pL]))
      outlines.push(tool.createOutlineByPois([bpN, cor, bpL, oppo]))
      outlines.push(tool.createOutlineByPois([pN, cor, bpN]))
    } else {
      let bpL = new Edge(this.sideEdgeL).extendP2(-sideDisL).p2 //上段楼梯侧边断点
      let bpN = new Edge(this.sideEdgeN).extendP1(-sideDisN).p1 //下段楼梯侧边断点
      let pL = this.edgeL.p1 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p2 //下段楼梯对应边的另个端点
      outlines.push(tool.createOutlineByPois([cor, bpL, pL]))
      outlines.push(tool.createOutlineByPois([cor, bpN, oppo, bpL]))
      outlines.push(tool.createOutlineByPois([cor, pN, bpN]))
    }
    return outlines
  }

  createInCutOutlines() {
    let outlines = []
    let inEdgeL = new Edge(this.edgeL).offSet(this.lastStepWidth, false)
    let cor = this.pois[this.corIndex] //转角点
    let oppo = this.pois[(this.corIndex+2)%4] //对角点
    if (this.lastEdgeIndex === this.corIndex) {
      let bpL = new Edge(this.sideEdgeL).extendP1(-this.lastStepWidth).p1
      let bpN = new Edge(this.sideEdgeN).extendP2(-this.nextStepWidth).p2
      let pL = this.edgeL.p2 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p1 //下段楼梯对应边的另个端点
      let cutP = new Edge(inEdgeL).extendP1(-this.nextStepWidth).p1 //内部切割点
      if (this.type === Types.LandingCutType.lct_third) {
        outlines.push(tool.createOutlineByPois([bpL, cutP, cor, pL]))
        outlines.push(tool.createOutlineByPois([pN, cor, cutP, bpL, oppo]))
      } else if (this.type === Types.LandingCutType.lct_fourth) {
        outlines.push(tool.createOutlineByPois([bpN, cutP, cor, pL, oppo]))
        outlines.push(tool.createOutlineByPois([pN, cor, cutP, bpN]))
      } else {
        outlines.push(tool.createOutlineByPois([bpL, cutP, cor, pL]))
        outlines.push(tool.createOutlineByPois([bpN, cutP, bpL, oppo]))
        outlines.push(tool.createOutlineByPois([pN, cor, cutP, bpN]))
      }
    } else {
      let bpL = new Edge(this.sideEdgeL).extendP2(-this.lastStepWidth).p2
      let bpN = new Edge(this.sideEdgeN).extendP1(-this.nextStepWidth).p1
      let pL = this.edgeL.p1 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p2 //下段楼梯对应边的另个端点
      let cutP = new Edge(inEdgeL).extendP2(-this.nextStepWidth).p2 //内部切割点
      if (this.type === Types.LandingCutType.lct_third) {
        outlines.push(tool.createOutlineByPois([cor, cutP, bpL, pL]))
        outlines.push(tool.createOutlineByPois([cor, pN, oppo, bpL, cutP]))
      } else if (this.type === Types.LandingCutType.lct_fourth) {
        outlines.push(tool.createOutlineByPois([cor, cutP, bpN, oppo, pL]))
        outlines.push(tool.createOutlineByPois([cor, pN, bpN, cutP]))
      } else {
        outlines.push(tool.createOutlineByPois([cor, cutP, bpL, pL]))
        outlines.push(tool.createOutlineByPois([cutP, bpN, oppo, bpl]))
        outlines.push(tool.createOutlineByPois([cor, pN, bpN, cutP]))
      }
    }
    return outlines
  }

  createOutlineByPois(vPois) {
    
  }

}