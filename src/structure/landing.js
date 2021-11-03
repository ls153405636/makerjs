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
    if (this.type === Types.LandingCutType.lct_first) {
      treads.push(new Types.Tread({
        index: this.treadIndex + 1,
        stepOutline: this.border
      }))
    } else if (this.type === Types.LandingCutType.lct_second) {
      
    }
  }

  createTreadsForSecond(){
    let cL = new Edge(this.sideEdgeL).getCenter() //上段楼梯侧边终点
    let cN = new Edge(this.sideEdgeN).getCenter() //下段楼梯侧边终点
    let cor = this.pois[this.corIndex] //转角点
    let oppo = this.pois[Math.abs(this.corIndex - 2)] //对角点
    let treads = []
    let edgesArr = []
    let t = Types.EdgeType.estraight //默认的线段类型
    if (this.lastEdgeIndex === this.corIndex) {
      let pL = this.edgeL.p2 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p1 //下段楼梯对应边的另个端点
      edgesArr[0] = [
        new Types.Edge({p1:cL, p2:cor, type:t}),
        new Types.Edge({p1:cor, p2:pL, type:t}),
        new Types.Edge({p1:pL, p2:cL, type:t}),
      ]
      edgesArr[1] = [
        new Types.Edge({p1:oppo, p2:cN})
      ]
    }
  }

  createTreadsForThird(){

  }

  createTreadsForFourth(){

  }

}