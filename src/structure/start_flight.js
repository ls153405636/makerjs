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
    { value: Types.StartTreadType.sel_2, label: '圆角矩形'},
    { value: Types.StartTreadType.srr_2, label: '双层圆角矩形'},
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
    this.stepHeight = vStepHeight
    this.stepNum = 1 //需根据当前的
    this.modelType = Types.StartTreadType.sel
    this.shapeType = Types.StartTreadShapeType.s_no
    this.treads = []
    this.rebuildByParent({vPos, vLVec, vWVec, vStepLength})
  }

  addInfo() {
    this.parent.addStartFlight(this)
  }

  delInfo() {
    this.parent.removeStartFlight(this)
  }

  getArgs() {
    let f = tool.getItemFromOptions
    return {
      stepLength:{value:this.stepLength, name:'步长', type:'input'},
      stepWidth:{value:this.stepWidth, name:'步宽', type:'input'},
      modelType:{value:f(this.modelType, StartFlight.START_TYPE_OPTION), name:'造型类型', type:'select', options:StartFlight.START_TYPE_OPTION},
      shapeType:{value:f(this.shapeType, StartFlight.SHAPE_TYPE_OPTIONS), name:'造型取舍', type:'select', options:StartFlight.SHAPE_TYPE_OPTIONS},
    }
  }

  rebuildByParent ({vPos, vLVec, vWVec, vStepLength}) {
    this.lVec = vLVec
    this.wVec = vWVec
    this.positionL = vPos || new Types.Vector3()
    this.positionC = new Edge().setByVec(this.positionL, this.lVec, vStepLength/2).p2
    this.positionR = new Edge().setByVec(this.positionL, this.lVec, vStepLength).p2

    if (vStepLength > this.stepLength) {
      this.stepLength = vStepLength
    }

    this.offSet1 = this.stepWidth * 0.7
    this.offSet2 = this.stepWidth / 6
    this.stepHeight = this.parent.stepHeight
    this.updateTreads()
  }

  updateTreads () {
    let outlines = []
    if (this.modelType === Types.StartTreadType.sel) {
      outlines = this.createElOutline()
      /**补全剩余几种 */
    } else if (this.modelType === Types.StartTreadType.sel_2) {
      outlines = this.createElDOutline()
    } else if (this.modelType === Types.StartTreadType.srr) {
      outlines = this.createRROutline()
    } else if (this.modelType === Types.StartTreadType.srr_2) {
      outlines = this.createRRDOutline()
    }

    for (let i = 0; i < outlines.length; i++) {
      if (this.treads[i]) {
        this.treads[i].rebuildByParent({vIndex:i+1, vOutline:outlines[i]})
      } else {
        this.treads.push(new Tread({vParent:this,
                                    vIndex:i+1,
                                    vOutline:outlines[i],
                                    vIsLast:false,
                                    vType:Types.TreadType.tStart}))
      }
    }
  }

  /**
   * 计算实际的顶点postion
   */
   computeRealPos () {
    let pos = new Types.Vector3(this.positionL)
    if (this.shapeType === 1) {
      pos = new Edge().setByVec(this.positionC, this.lVec, -this.stepLength / 2).p2
    } else if (this.shapeType === 3) {
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
  /**
   * 创建圆弧
   * @param {Types.Vector3} vP1 起始点
   * @param {Types.Vector3} vVec2 起始点到终止点的方向向量
   * @param {Types.float} vRadius 半径
   * @param {Types.float} vstartAngle 起始角度
   * @param {Types.float} vEndAngle 终止角度
   * @param {Types.bool} vIsClockwise 顺逆时针
   * @returns 
   */
   createArcEdge (vP1,vVec2,vRadius,vstartAngle,vEndAngle,vIsClockwise) {
      let p1 = vP1
      let p2 = new THREE.Vector2(vP1.x, vP1.y).addScaledVector(this.wVec, vRadius * 2)
      let position = new THREE.Vector2(vP1.x, vP1.y).addScaledVector(this.wVec, vRadius)
      let radius = vRadius
      let start_angle = vstartAngle
      let end_angle = vEndAngle
      let is_clockwise = vIsClockwise
  
      return new Types.Edge({
        p1: p1,
        p2: p2,
        position: position,
        radius: radius,
        start_angle: start_angle,
        end_angle: end_angle,
        is_clockwise: is_clockwise,
        type: Types.EdgeType.earc
      })
  }

  // 单层椭圆
  createElOutline() {
    let outline = new Types.Outline()
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    if (this.shapeType === 3) {
      rE = rectOutline.edges[1]
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2, this.lVec, -this.stepLength / 2)
    } else {
      rE = this.createBeszerEdge(bE.p2, this.lVec, this.offSet1, this.wVec, this.stepWidth / 2)
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2+this.stepWidth/2, this.lVec, -this.offSet1-this.stepLength/2)
    }
    if (this.shapeType === 2) {
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

    let outline = new Types.Outline()
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    let lE_d, rE_d, lFE_d, rFE_d

    if (this.shapeType === 3) {
      rE = rectOutline.edges[1]
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2, this.lVec, -this.stepLength / 2)
      rE_d = this.createBeszerEdge(rE.p2, this.wVec, this.stepWidth, this.lVec, 0)
      rFE_d = this.createBeszerEdge(rE_d.p2, this.wVec, this.offSet2, this.lVec, -this.stepLength / 2)
    } else {
      rE = this.createBeszerEdge(bE.p2, this.lVec, this.offSet1, this.wVec, this.stepWidth / 2)
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2+this.stepWidth/2, this.lVec, -this.offSet1-this.stepLength/2)
      rE_d = this.createBeszerEdge(bE.p2, this.lVec, this.offSet1 * 2, this.wVec, this.stepWidth)
      rFE_d = this.createBeszerEdge(rE_d.p2, this.wVec, this.offSet2+this.stepWidth, this.lVec, -this.offSet1 * 2 - this.stepLength/2)
    }

    if (this.shapeType === 2) {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2, this.wVec, -this.offSet2)
      lE = rectOutline.edges[3]
      lFE_d = this.createBeszerEdge(rFE_d.p2, this.lVec, -this.stepLength / 2, this.wVec, -this.offSet2)
      lE_d = this.createBeszerEdge(lE.p2, this.wVec, -this.stepWidth / 2, this.lVec, 0)
    } else {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2-this.offSet1, this.wVec, -this.stepWidth/2-this.offSet2)
      lE = this.createBeszerEdge(lFE.p2, this.wVec, -this.stepWidth/2, this.lVec, this.offSet1)
      lFE_d = this.createBeszerEdge(rFE_d.p2, this.lVec, -this.stepLength / 2-this.offSet1 * 2, this.wVec, -this.stepWidth - this.offSet2)
      lE_d = this.createBeszerEdge(lFE_d.p2, this.wVec, -this.stepWidth, this.lVec, this.offSet1 * 2)
    }
    outline.edges.push(bE,rE,rFE,lFE,lE,bE,rE_d,rFE_d,lFE_d,lE_d)
    return [outline]
  }

  // 单层圆角矩形
  createRROutline() {
    let outline = new Types.Outline()
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let rE = rectOutline.edges[1]//右边
    let lE = rectOutline.edges[3]//左边
    let rArc, lArc , rL,lL// 右圆弧、 左圆弧
    if (this.shapeType === 3) {
      rL = rE
    } else {
      rArc = this.createArcEdge(bE.p2,this.wVec,this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
    }

    if (this.shapeType === 2) {
      lL = lE
    } else {
      lArc = this.createArcEdge(dE.p2,this.wVec,-this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
    }
    if (this.shapeType === 3) {
      outline.edges.push(bE,rL, dE,lArc)
    }else if (this.shapeType === 2) {
      outline.edges.push(bE,rArc, dE,lL)
    }else {
      outline.edges.push(bE,rArc, dE,lArc)
    }
    return [outline]
  }

  // 双层圆角矩形
  createRRDOutline() {
    let outline = new Types.Outline()
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let rE = rectOutline.edges[1]
    let lE = rectOutline.edges[3]
    let new_rE = new Edge(rectOutline.edges[1]).extendP2(this.stepWidth)
    let new_lE = new Edge(rectOutline.edges[3]).extendP2(this.stepWidth)
    let new_dE = new Edge(dE).offset(this.stepWidth)
    let rArc, lArc , rL,lL// 右圆弧、 左圆弧
    let rArc_d, lArc_d // 第二层右圆弧， 第层左圆弧
    if (this.shapeType === 3) {
      rL = new_rE
    } else {
      rArc = this.createArcEdge(bE.p2,this.wVec,this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
      rArc_d = this.createArcEdge(bE.p2, this.wVec,this.stepWidth, -Math.PI / 2, Math.PI / 2, false)
    }

    if (this.shapeType === 2) {
      lL = new_lE
    } else {
      lArc = this.createArcEdge(dE.p2,this.wVec,-this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
      lArc_d = this.createArcEdge(new_dE.p2,this.wVec, -this.stepWidth,-Math.PI / 2, Math.PI / 2, false)
    }
    if (this.shapeType === 3) {
      outline.edges.push(bE,rE,dE,lArc,bE,new_rE,new_dE,lArc_d)
    }else if (this.shapeType === 2) {
      outline.edges.push(bE,rArc,dE,lE,bE,rArc_d,new_dE,lL)
    }else {
      outline.edges.push(bE,rArc, dE,lArc,bE,rArc_d,new_dE,lArc_d)
    }
    return [outline]
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey1 === 'modelType') {
      let stepNum = 2 //根据类型获取踏步数
      let stepNumDiff = this.stepNum - stepNum
      let f1 = this.parent.flights[0]
      let lengthDiff = f1.stepWidth * stepNumDiff
      f1.updateItem(f1.stepNum + stepNumDiff, 'stepNum')
      f1.updateItem(f1.length + lengthDiff, 'length')
      this.stepNum = stepNum
    } else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  /**
   * 计算大柱位置
   * @returns 
   */
  computeBigColPos () {
    /** */
    let args = this.parent.parent.bigColParameters
    this.sideOffset = this.parent.parent.sideOffset
    this.sideOffset >50 ? this.sideOffset = this.parent.parent.sideOffset : this.sideOffset = 45
    this.positionX = 0
    this.positionY = 0
    if (this.startTreadType === Types.StartTreadType.sel || this.startTreadType === Types.StartTreadType.srr) {
      if (this.startTreadShapeType === Types.StartTreadShapeType.s_no) {
        this.positionX = this.positionC.x - this.stepLength / 2 - this.sideOffset * 2
        this.positionY = this.positionC.y + this.stepWidth + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.s_left) {
        this.positionX = this.positionL.x - this.sideOffset * 2
        this.positionY = this.positionL.y + this.stepWidth + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.s_right) {
        this.positionX = this.positionR.x - this.sideOffset * 2 - this.stepLength
        this.positionY = this.positionR.y + this.stepWidth + this.offSet2 * 2
      }
    } else {
      if (this.startTreadShapeType === Types.StartTreadShapeType.s_no) {
        this.positionX = this.positionC.x - this.stepLength / 2 - this.sideOffset * 2
        this.positionY = this.positionC.y + this.stepWidth * 2 + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.s_left) {
        this.positionX = this.positionL.x - this.sideOffset * 2
        this.positionY = this.positionL.y + this.stepWidth * 2 + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.s_right) {
        this.positionX = this.positionR.x - this.sideOffset * 2 - this.stepLength
        this.positionY = this.positionR.y + this.stepWidth * 2 + this.offSet2 * 2
      }
    }
    let left = new Types.Vector3({
      x: this.positionX,
      y: this.positionY
      })

    if (args.posType === Types.BigColumnPosType.bcp_first) {
      left.y = left.y - this.stepWidth / 2 - this.offSet2 * 2
    }
    if (args.posType === Types.BigColumnPosType.bcp_second) {
      left.y = left.y - this.stepWidth - this.stepWidth / 2 - this.offSet2 * 2
    }
    
    this.positionX_R = 0
    this.positionY_R = 0
    if (this.startTreadShapeType === Types.StartTreadShapeType.s_no) {
      this.positionX_R = this.positionC.x + this.stepLength / 2 + this.sideOffset * 2
      this.positionY_R = left.y
    }
    else if (this.startTreadShapeType === Types.StartTreadShapeType.s_left) {
      this.positionX_R = this.positionL.x + this.sideOffset * 2 + this.stepLength
      this.positionY_R = left.y
    }
    else if (this.startTreadShapeType === Types.StartTreadShapeType.s_right) {
      this.positionX_R = this.positionR.x + this.sideOffset * 2 
      this.positionY_R = left.y
    }
    let right = new Types.Vector3({
      x: this.positionX_R,
      y: this.positionY_R
    })
    return {
      left, 
      right
    }
  }

  /**
   * 创建扶手路径边集
   */
  createHandRouteEdges () {
    /**补全此函数 */
    return {
      left:[],
      right:[]
    }
  }

  writePB () {
    return new Types.Flight({
      uuid: this.uuid,
      stepParameters: new Types.StepParameters({
        stepLength: this.stepLength,
        stepWidth: this.stepWidth,
        stepNumRule: Types.StepNumRule.snr_n,
        stepNum: this.stepNum,
      }),
      treads: tool.writeItemArrayPB(this.treads),
    })
  }
}