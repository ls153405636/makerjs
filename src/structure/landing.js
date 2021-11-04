import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { ChildInfo } from "./child_info";
import { Default } from "./config";


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
    this.sideEdgeL = this.edges[Math.abs(this.nextEdgeIndex - 2)]
    this.sideEdgeN = this.edges[Math.abs(this.lastEdgeIndex - 2)]
  }

  writePB() {
    let pb = new Types.Landing({
      uuid:this.uuid,
      type:this.type,
    })
  }

  createTreads() {
    let treads = []
    let edgesArr = []
    if (this.type === Types.LandingCutType.lct_first) {
      edgesArr = [this.edges]
    } else if (this.type === Types.LandingCutType.lct_second) {
      edgesArr = this.createEdgesArrForSecond()
    }
  }

  createEdgesArrForSecond(){
    let bpL = new Edge(this.sideEdgeL).getCenter() //上段楼梯侧边断点
    let bpN = new Edge(this.sideEdgeN).getCenter() //下段楼梯侧边断点
    let cor = this.pois[this.corIndex] //转角点
    let oppo = this.pois[Math.abs(this.corIndex - 2)] //对角点
    let edgesArr = []
    let t = Types.EdgeType.estraight //默认的线段类型
    if (this.lastEdgeIndex === this.corIndex) {
      let pL = this.edgeL.p2 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p1 //下段楼梯对应边的另个端点
      edgesArr[0] = [
        new Types.Edge({p1:bpL, p2:cor, type:t}),
        new Types.Edge({p1:cor, p2:pL, type:t}),
        new Types.Edge({p1:pL, p2:bpL, type:t}),
      ]
      edgesArr[1] = [
        new Types.Edge({p1:oppo, p2:bpN, type:t}),
        new Types.Edge({p1:bpN, p2:cor, type:t}),
        new Types.Edge({p1:cor, p2:bpL, type:t}),
        new Types.Edge({p1:bpL, p2:oppo, type:t})
      ]
      edgesArr[2] = [
        new Types.Edge({p1:bpN, p2:pN, type:t}),
        new Types.Edge({p1:pN, p2:cor, type:t}),
        new Types.Edge({p1:cor, p2:bpN, type:t})
      ]
    } else {
      let pL = this.edgeL.p1 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p2 //下段楼梯对应边的另个端点
       edgesArr[0] = [
        new Types.Edge({p1:cor, p2:bpL, type:t}),
        new Types.Edge({p1:bpL, p2:pL, type:t}),
        new Types.Edge({p1:pL, p2:cor, type:t}),
       ]
       edgesArr[1] = [
        new Types.Edge({p1:cor, p2:bpN, type:t}),
        new Types.Edge({p1:bpN, p2:oppo, type:t}),
        new Types.Edge({p1:oppo, p2:bpL, type:t}),
        new Types.Edge({p1:bpL, p2:cor, type:t})
      ]
      edgesArr[2] = [
        new Types.Edge({p1:cor, p2:pN, type:t}),
        new Types.Edge({p1:pN, p2:bpN, type:t}),
        new Types.Edge({p1:cor, p2:bpN, type:t})
      ]
    }
    return edgesArr
  }

  createTreadsForThird(){
    if (this.lastEdgeIndex === this.corIndex) {
      let bpl = new Edge(this.edgeL).extendP1(-this.lastStepWidth).p1
    } else {
      let bpl = new Edge(this.edgeL).extendP2(-this.lastStepWidth).p2
    }
    
  }

  createTreadsForFourth(){

  }

}