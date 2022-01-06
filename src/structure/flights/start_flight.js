import Victor from "victor";
import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { Outline } from "../../utils/outline";
import { UtilVec2 } from "../../utils/util_vec_2";
import { Default } from "../config";
import tool from "../tool";
import { StartTread } from "../treads/start_tread";
import { StraightFlight } from "./straight_flight";

export class StartFlight extends StraightFlight{
  static START_TYPE_OPTION = [
    {value: Types.StartTreadType.st_el, label: '椭圆型'},
    {value: Types.StartTreadType.st_el_2, label: '双层椭圆型'},
    {value: Types.StartTreadType.st_rr, label: '圆角矩形'},
    {value: Types.StartTreadType.st_rr_2, label: '双层圆角矩形'},
  ]
  static SHAPE_TYPE_OPTIONS = [
    {value: Types.StartTreadShapeType.sts_no, label: '保留两边造型'},
    {value: Types.StartTreadShapeType.sts_left, label: '去掉内侧造型'},
    {value: Types.StartTreadShapeType.sts_right, label: '去掉外侧造型'},
  ]
  constructor ({vParent, vStepWidth, vStepHeight, vClock}) {
    super({vParent, vClock})
    this.stepWidth = vStepWidth
    this.stepHeight = vStepHeight
    this.stepNum = 1 //需根据当前的
    this.modelType = Types.StartTreadType.st_el
    this.shapeType = Types.StartTreadShapeType.sts_no
    /**@type {Array<StartTread>} */
    this.treads = []
    this.length = 0
    this.type = Types.FlightType.fStart
    //this.rebuildByParent({vPos, vLVec, vWVec, vStepLength})
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
      name:'起步踏参数',
      stepLength:{value:this.stepLength, name:'步长', type:'input'},
      stepWidth:{value:this.stepWidth, name:'步宽', type:'input'},
      modelType:{value:f(this.modelType, StartFlight.START_TYPE_OPTION), name:'造型类型', type:'select', options:StartFlight.START_TYPE_OPTION},
      shapeType:{value:f(this.shapeType, StartFlight.SHAPE_TYPE_OPTIONS), name:'造型取舍', type:'select', options:StartFlight.SHAPE_TYPE_OPTIONS},
    }
  }

  rebuildByParent ({vPos, vLVec, vWVec, vStepLength}) {
    super.rebuildByParent({vIndex:0, vTreadIndex:0, vIsLast:false, vPos, vWVec, vLVec})
    this.positionIn = this.pos || new Types.Vector3()
    this.positionC = new Edge().setByVec(this.positionIn, this.lVec, vStepLength/2).p2
    this.positionOut = new Edge().setByVec(this.positionIn, this.lVec, vStepLength).p2

    if (vStepLength > this.stepLength) {
      this.stepLength = vStepLength
    }

    this.offset1 = this.stepWidth * 1
    this.offset2 = this.stepWidth / 6
    this.stepHeight = this.parent.stepHeight
    this.updateTreads()
  }

  updateTreads () {
    let outlines = []
    let treadOutlines = []
    let start = this.computeRealPos()
    let backOffset = this.parent.getTreadBackOffset()
    let treStart = new Edge().setByVec(start, this.wVec, -backOffset).p2
    let treWidth = this.stepWidth + backOffset
    let treOffset1 = treWidth * 1
    let treOffset2 = treWidth / 6
    if (this.modelType === Types.StartTreadType.st_el) {
      outlines = this.createElOutline({start})
      treadOutlines = this.createElOutline({start:treStart, stepWidth:treWidth, offset1:treOffset1, offset2:treOffset2})
    }
    else if (this.modelType === Types.StartTreadType.st_el_2) {
      outlines = this.createElDOutline({start})
      treadOutlines = this.createElDOutline({start:treStart, stepWidth:treWidth, offset1:treOffset1, offset2:treOffset2})
    }
    else if (this.modelType === Types.StartTreadType.st_rr) {
      outlines = this.createRROutline({start})
      treadOutlines = this.createRROutline({start:treStart, stepWidth:treWidth})
    }
    else if (this.modelType === Types.StartTreadType.st_rr_2) {
      outlines = this.createRRDOutline({start})
      treadOutlines = this.createRRDOutline({start:treStart, stepWidth:treWidth})
    }

    let heightSum = 0
    for (let k = 0; k < outlines.length; k++) {
      if (this.treads[k]) {
        outlines[k] = new Outline(outlines[k]).setZCoord(heightSum + this.treads[k].stepHeight)
        treadOutlines[k] = new Outline(treadOutlines[k]).setZCoord(heightSum + this.treads[k].stepHeight)
        heightSum = heightSum + this.treads[k].stepHeight
      } else {
        outlines[k] = new Outline(outlines[k]).setZCoord(this.stepHeight * (k+1))
        treadOutlines[k] = new Outline(treadOutlines[k]).setZCoord(this.stepHeight * (k+1))
      }
    }

    for (let i = 0; i < outlines.length; i++) {
      let border = new Types.TreadBorder({
        stepOutline:outlines[i],
        treadOutline:treadOutlines[i],
      })
      border.backIndex = [0]
      border.inIndex = [1]
      border.outIndex = [outlines[i].edges.length - 1]
      let stepWidth = this.stepWidth
      if (i === 0 && outlines.length === 2) {
        stepWidth = this.stepWidth * 2
      }
      if ([Types.StartTreadType.st_el, Types.StartTreadType.st_el_2].includes(this.modelType)) {
        border.frontIndex = [2,3]
      } else if ([Types.StartTreadType.st_rr, Types.StartTreadType.st_rr_2].includes(this.modelType)) {
        border.frontIndex = [2]
      }
      if (this.treads[i]) {
        this.treads[i].rebuildByParent({vIndex:i+1, vBorder:border, vStepWidth: stepWidth})
      } else {
        this.treads.push(new StartTread({vParent:this,
                                          vIndex:i+1,
                                          vBorder:border,
                                          vStepWidth: stepWidth}))
      }

    }
  }

  /**
   * 计算实际的顶点postion
   */
   computeRealPos () {
    let pos = new Types.Vector3(this.positionIn)
    if (this.shapeType === 1) {
      pos = new Edge().setByVec(this.positionC, this.lVec, -this.stepLength / 2).p2
    } else if (this.shapeType === 3) {
      pos = new Edge().setByVec(this.positionOut, this.lVec, -this.stepLength).p2
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
      let radius = Math.abs(vRadius)
      let start_angle = vstartAngle
      let end_angle = vEndAngle
      let is_clockwise = vIsClockwise
  
      return new Types.Edge({
        p1: p1,
        p2: p2,
        position: position,
        radius: radius,
        startAngle: start_angle,
        endAngle: end_angle,
        isClockwise: is_clockwise,
        type: Types.EdgeType.earc
      })
  }

  // 单层椭圆
  createElOutline({start, stepWidth = this.stepWidth, offset1 = this.offset1, offset2 = this.offset2}) {
    let outline = new Types.Outline({isClock:this.clock, isClose:true})
    let rectOutline = tool.createRectOutline(start, this.stepLength, stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      rE = rectOutline.edges[1]
      rFE = this.createBeszerEdge(rE.p2, this.wVec, offset2, this.lVec, -this.stepLength / 2)
    } else {
      rE = this.createBeszerEdge(bE.p2, this.lVec, offset1, this.wVec, stepWidth / 2)
      rFE = this.createBeszerEdge(rE.p2, this.wVec, offset2+stepWidth/2, this.lVec, -offset1-this.stepLength/2)
    }
    if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2, this.wVec, -offset2)
      lE = rectOutline.edges[3]
    } else {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2-offset1, this.wVec, -stepWidth/2-offset2)
      lE = this.createBeszerEdge(lFE.p2, this.wVec, -stepWidth/2, this.lVec, offset1)
    }
    outline.edges.push(bE, rE, rFE, lFE, lE)
    return [outline]
  }

  //双层椭圆
  createElDOutline({start, stepWidth = this.stepWidth, offset1 = this.offset1, offset2 = this.offset2}) {

    let outline = new Types.Outline({isClock:this.clock, isClose:true})
    let outline1 = new Types.Outline({isClock:this.clock, isClose:true})
    let rectOutline = tool.createRectOutline(start, this.stepLength, stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    let lE_d, rE_d, lFE_d, rFE_d // 第二层左边、右边、左前边，右前边

    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      rE = rectOutline.edges[1]
      rFE = this.createBeszerEdge(rE.p2, this.wVec, offset2, this.lVec, -this.stepLength / 2)
      //rE_d = this.createBeszerEdge(rE.p2, this.wVec, stepWidth, this.lVec, 0)
      rE_d = new Edge(rectOutline.edges[1]).extendP2(stepWidth)
      rFE_d = this.createBeszerEdge(rE_d.p2, this.wVec, offset2 * 2, this.lVec, -this.stepLength / 2)
    } else {
      rE = this.createBeszerEdge(bE.p2, this.lVec, offset1, this.wVec, stepWidth / 2)
      rFE = this.createBeszerEdge(rE.p2, this.wVec, offset2+stepWidth/2, this.lVec, -offset1-this.stepLength/2)
      rE_d = this.createBeszerEdge(bE.p2, this.lVec, offset1 * 2, this.wVec, stepWidth)
      rFE_d = this.createBeszerEdge(rE_d.p2, this.wVec, offset2 * 2+stepWidth, this.lVec, -offset1 * 2 - this.stepLength/2)
    }

    if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2, this.wVec, -offset2)
      lE = rectOutline.edges[3]
      lFE_d = this.createBeszerEdge(rFE_d.p2, this.lVec, -this.stepLength / 2, this.wVec, -offset2)
      //lE_d = this.createBeszerEdge(lE.p2, this.wVec, -stepWidth / 2, this.lVec, 0)
      lE_d = new Edge(rectOutline.edges[3]).extendP1(stepWidth)
    } else {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2-offset1, this.wVec, -stepWidth/2-offset2)
      lE = this.createBeszerEdge(lFE.p2, this.wVec, -stepWidth/2, this.lVec, offset1)
      lFE_d = this.createBeszerEdge(rFE_d.p2, this.lVec, -this.stepLength / 2-offset1 * 2, this.wVec, -stepWidth - offset2 * 2)
      lE_d = this.createBeszerEdge(lFE_d.p2, this.wVec, -stepWidth, this.lVec, offset1 * 2)
    }
    outline.edges.push(bE,rE,rFE,lFE,lE)
    outline1.edges.push(bE,rE_d,rFE_d,lFE_d,lE_d)
    return [outline1,outline]
  }

  // 单层圆角矩形
  createRROutline({start, stepWidth = this.stepWidth}) {
    let outline = new Types.Outline({isClock:this.clock, isClose:true})
    let rectOutline = tool.createRectOutline(start, this.stepLength, stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let outE = rectOutline.edges[1]//右边
    let inE = rectOutline.edges[3]//左边
    let inEAngleP = new Victor(inE.p2.x - inE.p1.x, inE.p2.y - inE.p1.y).angle()
    let inEAngleR = new Victor(inE.p1.x - inE.p2.x, inE.p1.y - inE.p2.y).angle()
    let outEAngleP = new Victor(outE.p2.x - outE.p1.x, outE.p2.y - outE.p1.y).angle()
    let outEAngleR = new Victor(outE.p1.x - outE.p2.x, outE.p1.y - outE.p2.y).angle()
    let outArc, inArc , outL,inL// 右圆弧、 左圆弧
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      outL = outE
    } else {
      outArc = this.createArcEdge(bE.p2,this.wVec, stepWidth / 2, inEAngleP, inEAngleR, this.clock)
    }

    if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      inL = inE
    } else {
      inArc = this.createArcEdge(dE.p2,this.wVec, -stepWidth / 2, outEAngleP, outEAngleR, this.clock)
    }
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      outline.edges.push(bE,outL, dE,inArc)
    }else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      outline.edges.push(bE,outArc, dE,inL)
    }else {
      outline.edges.push(bE,outArc, dE,inArc)
    }
    return [outline]
  }

  // 双层圆角矩形
  createRRDOutline({start, stepWidth = this.stepWidth}) {
    let outline = new Types.Outline({isClock:this.clock, isClose:true})
    let outline1 = new Types.Outline({isClock:this.clock, isClose:true})
    let rectOutline = tool.createRectOutline(start, this.stepLength, stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let rE = rectOutline.edges[1]// 右边
    let lE = rectOutline.edges[3]// 左边
    let new_rE = new Edge(rectOutline.edges[1]).extendP2(stepWidth)
    let new_lE = new Edge(rectOutline.edges[3]).extendP1(stepWidth)
    let new_dE = new Edge(dE).offset(stepWidth, this.clock)

    let new_lEAngleP = new Victor(new_lE.p2.x - new_lE.p1.x, new_lE.p2.y - new_lE.p1.y).angle()
    let new_lEAngleR = new Victor(new_lE.p1.x - new_lE.p2.x, new_lE.p1.y - new_lE.p2.y).angle()
    let new_rEAngleP = new Victor(new_rE.p2.x - new_rE.p1.x, new_rE.p2.y - new_rE.p1.y).angle()
    let new_rEAngleR = new Victor(new_rE.p1.x - new_rE.p2.x, new_rE.p1.y - new_rE.p2.y).angle()

    let outArc, inArc , outL,inL// 右圆弧、 左圆弧
    let outArc_d, inArc_d // 第二层右圆弧， 第层左圆弧
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      outL = new_rE
    } else {
      outArc = this.createArcEdge(bE.p2,this.wVec, stepWidth / 2, new_lEAngleP, new_lEAngleR, this.clock)
      outArc_d = this.createArcEdge(bE.p2, this.wVec, stepWidth, new_lEAngleP, new_lEAngleR, this.clock)
    }

    if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      inL = new_lE
    } else {
      inArc = this.createArcEdge(dE.p2,this.wVec, -stepWidth / 2, new_rEAngleP, new_rEAngleR, this.clock)
      inArc_d = this.createArcEdge(new_dE.p2,this.wVec,  -stepWidth, new_rEAngleP, new_rEAngleR, this.clock)
    }
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      outline.edges.push(bE,rE,dE,inArc)
      outline1.edges.push(bE,new_rE,new_dE,inArc_d)
    }else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      outline.edges.push(bE,outArc,dE,lE)
      outline1.edges.push(bE,outArc_d,new_dE,inL)
    }else {
      outline.edges.push(bE,outArc, dE,inArc)
      outline1.edges.push(bE,outArc_d,new_dE,inArc_d)
    }
    return [outline1,outline]
  }

  updateItem(vValue, vKey1, vKey2) {
    if (vKey1=== 'modelType') {
      this.modelType = vValue
      let stepNum = 0 //根据类型获取踏步数
      if (this.modelType === 1 || this.modelType === 3) {
        stepNum = 1
      }
      else if (this.modelType === 2 || this.modelType === 4) {
        stepNum = 2
      }
      let stepNumDiff = stepNum - this.stepNum
      let f1 = this.parent.segments[0]
      if (f1.type === Types.FlightType.frect && f1.stepNum > stepNumDiff) {
        let lengthDiff = f1.stepWidth * stepNumDiff
        f1.updateItem(f1.stepNum - stepNumDiff, 'stepNum')
        f1.updateItem(f1.length - lengthDiff, 'length') 
      }
      this.stepNum = stepNum
      this.parent.clearTreads()
    }else {
      super.updateItem(vValue, vKey1, vKey2)
    }
  }

  /**
   * 计算大柱位置
   * @returns 
   */
  computeBigColPos () {
    /** */
    let sideOffset = this.parent.sideOffset
    let inPos = new Types.Vector3()
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        inPos = new Edge().setByVec(this.positionC, this.lVec, - this.stepLength / 2 - this.offset1 / 2).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        inPos = new Edge().setByVec(this.positionIn, this.lVec, sideOffset).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        inPos = new Edge().setByVec(this.positionOut, this.lVec, - this.stepLength - this.offset1 / 2).p2
      }
    }
    else {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        inPos = new Edge().setByVec(this.positionC, this.lVec, - this.stepLength / 2 - this.stepWidth / 8).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        inPos = new Edge().setByVec(this.positionIn, this.lVec, sideOffset).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        inPos = new Edge().setByVec(this.positionOut, this.lVec, - this.stepLength - this.stepWidth / 8).p2
      }
    }
    inPos = new Edge().setByVec(inPos, this.wVec, this.stepWidth / 2).p2

    
    let outPos = new Types.Vector3()
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        outPos = new Edge().setByVec(this.positionC, this.lVec, this.stepLength / 2 + this.offset1 / 2).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        outPos = new Edge().setByVec(this.positionIn, this.lVec, this.stepLength + this.offset1 / 2).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        outPos = new Edge().setByVec(this.positionOut, this.lVec, -sideOffset).p2
      }
    }
    else {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        outPos = new Edge().setByVec(this.positionC, this.lVec, this.stepLength / 2 + this.stepWidth / 8).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        outPos = new Edge().setByVec(this.positionIn, this.lVec, this.stepLength + this.stepWidth / 8).p2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        outPos = new Edge().setByVec(this.positionOut, this.lVec, -sideOffset).p2
      }
    }
    outPos = new Edge().setByVec(outPos, this.wVec, this.stepWidth / 2).p2

    inPos.z = this.treads[this.treads.length - 1].position.z
    outPos.z = this.treads[this.treads.length - 1].position.z
    let rot = new Types.Vector3()
    rot.z = new UtilVec2(this.lVec).getAngle()
    return {
      inPos,
      outPos,
      rot
    }
  }

  createGirderRoute() {
    return []
  }

  createHandEdges ({vSide, vArgs}) {
    let {inEdges, outEdges} = this.createHandRouteEdges(vArgs)
    if (vSide === 'in') {
      return inEdges
    } else {
      return outEdges
    }
  }

  /**
   * 创建扶手路径边集
   */
  createHandRouteEdges (vArgs) {
    /**补全此函数 */
    if (this.parent.flights[0]) {
      this.width = this.parent.flights[0].stepLength
    } else {
      this.width = Default.STEP_LENGTH
    }
    let stepLength = this.parent.flights[this.parent.flights.length - 1].treads[0].stepLength
    let stepWidth = this.parent.flights[this.parent.flights.length - 1].treads[0].stepWidth
    let sideOffset = this.parent.sideOffset
    let arcRL = 80 //左弯头半径
    let arcRR = 80 //右弯头半径
    if (this.shapeType === 2) {
      arcRL = 50
    } else if (this.shapeType === 3) {
      arcRR = 50
    }
    let inRoute = new Types.Outline()
    let outRoute = new Types.Outline()
    let inPois = []
    let outPois = []

    // 左边扶手
    // 椭圆踏板扶手路径
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        inPois[0] = new Edge().setByVec(this.positionOut, this.lVec, - this.stepLength - this.offset1 / 2).p2
      } else {
        inPois[0] = new Edge().setByVec(this.positionC, this.lVec, - this.stepLength / 2 - this.offset1 / 2).p2
      }
    }
    // 圆角矩形踏板扶手路径
    else {
      if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        inPois[0] = new Edge().setByVec(this.positionOut, this.lVec, - this.stepLength - this.stepWidth / 4).p2
      }else {
        inPois[0] = new Edge().setByVec(this.positionC, this.lVec, - this.stepLength / 2 - this.stepWidth / 4).p2
      }
    }
    inPois[0] = new Edge().setByVec(inPois[0], this.wVec, this.stepWidth / 2).p2
    inPois[1] = new Edge().setByVec(this.positionIn, this.lVec, sideOffset - arcRL).p2
    inPois[1] = new Edge().setByVec(inPois[1], this.wVec, this.stepWidth / 2).p2
    inPois[2] = new Edge().setByVec(this.positionIn, this.lVec, sideOffset).p2
    inPois[2] = new Edge().setByVec(inPois[2], this.wVec, this.stepWidth / 2 - arcRL).p2
    inPois[3] = new Edge().setByVec(this.positionIn, this.lVec, sideOffset).p2

    // 右边扶手
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        outPois[0] = new Edge().setByVec(this.positionIn, this.lVec, this.stepLength + this.offset1 / 2).p2
      }else {
        outPois[0] = new Edge().setByVec(this.positionC, this.lVec, this.stepLength / 2 + this.offset1 / 2).p2
      }
    }else {
      if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        outPois[0] = new Edge().setByVec(this.positionIn, this.lVec, this.stepLength + this.stepWidth / 4).p2
      }else {
        outPois[0] = new Edge().setByVec(this.positionC, this.lVec, this.stepLength / 2 + this.stepWidth / 4).p2
      }
    }
    outPois[0] = new Edge().setByVec(outPois[0], this.wVec, this.stepWidth / 2).p2
    outPois[1] = new Edge().setByVec(this.positionIn, this.lVec, this.width - sideOffset + arcRR).p2
    outPois[1] = new Edge().setByVec(outPois[1], this.wVec, this.stepWidth / 2).p2
    outPois[2] = new Edge().setByVec(this.positionIn, this.lVec, this.width - sideOffset).p2
    outPois[2] = new Edge().setByVec(outPois[2], this.wVec, this.stepWidth / 2 - arcRR).p2
    outPois[3] = new Edge().setByVec(this.positionIn, this.lVec, this.width - sideOffset).p2

    for (let i = 0; i < inPois.length - 1; i++) {
      if (i !== 1) {
        inRoute.edges.push(
          new Types.Edge({
            p1: inPois[i],
            p2: inPois[i + 1],
            type: Types.EdgeType.estraight,
          })
        )
      }
    }
    let firstLE = inRoute.edges[0]
    let bzrLE = this.createBeszerEdge(firstLE.p2,this.lVec,arcRL,this.wVec,-arcRL)
    inRoute.edges.splice(1,0,bzrLE)
    if (this.shapeType === 2) {
      inRoute.edges.splice(0,2)
    }

    for (let i = 0; i < outPois.length - 1; i++) {
      if (i !== 1) {
        outRoute.edges.push(
          new Types.Edge({
            p1: outPois[i],
            p2: outPois[i + 1],
            type: Types.EdgeType.estraight,
          })
        )
      }
    }
    let firstRE = outRoute.edges[0]
    let bzrRE = this.createBeszerEdge(firstRE.p2,this.lVec,-arcRR,this.wVec,-arcRR)
    outRoute.edges.splice(1,0,bzrRE)
    if (this.shapeType === 3) {
      outRoute.edges.splice(0,2)
    }

    let inEdges = inRoute.edges
    let outEdges = outRoute.edges

    let nextT = this.parent.flights[0].treads[0]
    let height = nextT.position.z - nextT.stepHeight/2 + vArgs.height
    let step = arcRL * nextT.stepHeight / this.stepWidth
    if (inEdges.length === 3) {
      inEdges[0].p1.z = height
      inEdges[0].p2.z = height
      inEdges[1].p1.z = height
      inEdges[1].p2.z = height + step
      inEdges[2].p1.z = height + step
      inEdges[2].p2.z = nextT.position.z + vArgs.height
    } else {
      inEdges[0].p1.z = height
      inEdges[0].p2.z = nextT.position.z + vArgs.height
    }
    if (outEdges.length === 3) {
      outEdges[0].p1.z = height
      outEdges[0].p2.z = height
      outEdges[1].p1.z = height
      outEdges[1].p2.z = height + step
      outEdges[2].p1.z = height + step
      outEdges[2].p2.z = nextT.position.z + vArgs.height
    } else {
      outEdges[0].p1.z = height
      outEdges[0].p2.z = nextT.position.z + vArgs.height
    }

    return {
      inEdges,
      outEdges
    }
  }

  getEndHeight () {
    let endHeight = 0
    if (this.treads.length) {
      this.treads.forEach(t => {
        if (t.inheritH) {
          /**考虑到更新和本函数的调用顺序，此处须直接取stair的步高 */
          endHeight += this.parent.stepHeight
        } else {
          endHeight += t.stepHeight
        }
      })
    } else {
      endHeight = this.parent.stepHeight * this.stepNum
    }
    return endHeight
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