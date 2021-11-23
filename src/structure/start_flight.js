import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { ChildInfo } from "./child_info";
import { Default } from "./config";
import tool from "./tool";
import { Tread } from "./tread";

export class StartFlight extends ChildInfo{
  static START_TYPE_OPTION = [
    { value: Types.StartTreadType.sel, label: '椭圆型'},
    { value: Types.StartTreadType.srr, label: '双层椭圆型'},
    { value: Types.StartTreadType.sel_w, label: '圆角矩形'},
    { value: Types.StartTreadType.srr_w, label: '双层圆角矩形'},
  ]
  static  SHAPE_TYPE_OPTIONS = [
    {value: Types.StartTreadShapeType.s_no, label: '保留两边造型'},
    {value: Types.StartTreadShapeType.s_left, label: '去掉左边造型'},
    {value: Types.StartTreadShapeType.s_right, label: '去掉右边造型'},
  ]
  constructor ({vParent, vPos, vLVec, vWVec, vStepLength, vStepWidth}) {
    super(vParent)
    this.stepLength = vStepLength
    this.stepWidth = vStepWidth
    this.modelType = Default.START_TREAD_PRO_ID
    this.shapeType = Types.StartTreadShapeType.s_no
    this.treads = []
    this.rebuildByParent({vPos, vLVec, vWVec})
  }

  getArgs() {
    let f = tool.getItemFromOptions(this.modelType, StartFlight.START_TYPE_OPTION)
    return {
      stepLength:{value:this.stepLength, name:'步长', type:'input'},
      stepWidth:{value:this.stepWidth, name:'步宽', type:'input'},
      modelType:{value:f(this.modelType), name:'造型类型', type:'select'},
      shapeType:{value:f(this.shapeType), name:'造型取舍', type:'select'},
    }
  }

  rebuildByParent ({vPos, vLVec, vWVec}) {
    const length = this.parent.flights[1].stepLength
    this.positionL = vPos || new Types.Vector3()
    this.positionC = new Edge().setByVec(this.positionL, this.lVec, length/2).p2
    this.positionR = new Edge().setByVec(this.positionL, this.lVec, length).p2

    this.lVec = vLVec
    this.wVec = vWVec
    this.stepHeight = this.parent.stepHeight
    this.updateTreads()
  }

  updateTreads () {
    let outlines = []
    if (this.modelType === Types.StartTreadType.sel) {
      outlines = this.createElOutline()
    } else if (outlines === 1) {
      /**补全剩余几种 */
    }

    for (let i = 0; i < outlines.length; i++) {
      if (this.treads[i]) {
        this.treads[i].rebuildByParent({vIndex:i+1, vOutline:outlines[i]})
      } else {
        this.treads.push({vParent:this,
                          vIndex:i+1,
                          vOutline:outlines[i],
                          vIsLast:false,
                          vType:Types.TreadType.tStart})
      }
    }
  }

  /**
   * 计算实际的顶点postion
   */
   computeRealPos () {
    let pos = new Types.Vector3(this.positionL)
    if (this.startTreadShapeType === 1) {
      pos = new Edge().setByVec(this.positionC, this.lVec, -this.stepLength / 2).p2
    } else if (this.startTreadShapeType === 3) {
      pos = new Edge().setByVec(this.positionR, this.lVec, -this.stepLength).p2
    }
    return pos
  }

  /**
   * 创建贝塞尔边
   * @param {Types.Vector3} vP1 起始点 
   * @param {Types.Vector3} vVec1 起始点到控制点的方向向量 
   * @param {Number} vOffset1 起始点与控制点间的距离 
   * @param {Types.Vector3} vVec2 控制点到终止点的方向向量
   * @param {Number} vOffset2 控制点与终止点间的距离
   * @returns 
   */
  createBeszerEdge (vP1, vVec1, vOffset1, vVec2, vOffset2) {
    let p1 = vP1
    let conPoi = new Edge().setByVec(vP1, vVec1, vOffset1).p2
    let p2 = new Edge().setByVec(conPoi, vVec2, vOffset2).p2
    return new Types.Edge({
      p1: p1,
      p2: p2,
      controlPos: conPoi,
      type: Types.EdgeType.ebeszer
    })
  }

  // 单层椭圆
  createElOutline() {
    let outline = new Types.Outline()
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    if (this.startTreadShapeType === 3) {
      rE = rectOutline.edges[1]
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2, this.lVec, -this.stepLength / 2)
    } else {
      rE = this.createBeszerEdge(bE.p2, this.lVec, this.offSet1, this.wVec, this.stepWidth / 2)
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2+this.stepWidth/2, this.lVec, -this.offSet1-this.stepLength/2)
    }
    if (this.startTreadShapeType === 2) {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2, this.wVec, -this.offSet2)
      lE = rectOutline.edges[3]
    } else {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2-this.offSet1, this.wVec, -this.stepWidth/2-this.offSet2)
      lE = this.createBeszerEdge(lFE.p2, this.wVec, -this.stepWidth/2, this.lVec, this.offSet1)
    }
    outline.edges.push(bE, rE, rFE, lFE, lE)
    return [outline]
  }

  //双层椭圆
  createElDOutline() {
    return []
  }

  // 单层圆角矩形
  createRROutline() {
    return []
  }

  // 双层圆角矩形
  createRRDOutline() {
    return []
  }
}