import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Outline } from "../utils/outline";
import { ChildInfo } from "./child_info";
import { Default } from "./config";
import tool from "./tool";
import { Tread } from "./tread";

export class StartFlight extends ChildInfo{
  static START_TYPE_OPTION = [
    {value: Types.StartTreadType.st_el, label: '椭圆型'},
    {value: Types.StartTreadType.st_el_2, label: '双层椭圆型'},
    {value: Types.StartTreadType.st_rr, label: '圆角矩形'},
    {value: Types.StartTreadType.st_rr_2, label: '双层圆角矩形'},
  ]
  static SHAPE_TYPE_OPTIONS = [
    {value: Types.StartTreadShapeType.sts_no, label: '保留两边造型'},
    {value: Types.StartTreadShapeType.sts_left, label: '去掉左边造型'},
    {value: Types.StartTreadShapeType.sts_right, label: '去掉右边造型'},
  ]
  constructor ({vParent, vPos, vLVec, vWVec, vStepLength, vStepWidth, vStepHeight}) {
    super(vParent)
    this.stepLength = vStepLength
    this.initStePlength = vStepLength
    this.stepWidth = vStepWidth
    this.stepHeight = vStepHeight
    this.stepNum = 1 //需根据当前的
    this.modelType = Types.StartTreadType.st_el
    this.shapeType = Types.StartTreadShapeType.sts_no
    /**@type {Array<Tread>} */
    this.treads = []
    this.length = 0
    this.startHeight = 0
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
      name:'起步踏参数',
      stepLength:{value:this.stepLength, name:'步长', type:'input'},
      stepWidth:{value:this.stepWidth, name:'步宽', type:'input'},
      modelType:{value:f(this.modelType, StartFlight.START_TYPE_OPTION), name:'造型类型', type:'select', options:StartFlight.START_TYPE_OPTION},
      shapeType:{value:f(this.shapeType, StartFlight.SHAPE_TYPE_OPTIONS), name:'造型取舍', type:'select', options:StartFlight.SHAPE_TYPE_OPTIONS},
    }
  }

  rebuildByParent ({vPos, vLVec, vWVec, vStepLength}) {
    this.lVec = vLVec
    this.wVec = vWVec
    this.pos = vPos
    this.positionL = this.pos || new Types.Vector3()
    this.positionC = new Edge().setByVec(this.positionL, this.lVec, vStepLength/2).p2
    this.positionR = new Edge().setByVec(this.positionL, this.lVec, vStepLength).p2

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
      outlines = this.createRROutline()
      treadOutlines = this.createRROutline({start:treStart, stepWidth:treWidth})
    }
    else if (this.modelType === Types.StartTreadType.st_rr_2) {
      outlines = this.createRRDOutline()
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
      border.backIndex = 0
      border.inIndex = [1]
      border.outIndex = [outlines[i].edges.length - 1]
      if ([Types.StartTreadType.st_el, Types.StartTreadType.st_el_2].includes(this.modelType)) {
        border.frontIndex = [2,3]
      } else if ([Types.StartTreadType.st_rr, Types.StartTreadType.st_rr_2].includes(this.modelType)) {
        border.frontIndex = [2]
      }
      if (this.treads[i]) {
        this.treads[i].rebuildByParent({vIndex:i+1, vBorder:border})
      } else {
        this.treads.push(new Tread({vParent:this,
                                    vIndex:i+1,
                                    vBorder:border,
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
  createElOutline({start, stepWidth = this.stepWidth, offset1 = this.offset1, offset2 = this.offset2}) {
    let outline = new Types.Outline({isClock:true, isClose:true})
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

    let outline = new Types.Outline({isClock:true, isClose:true})
    let outline1 = new Types.Outline({isClock:true, isClose:true})
    let rectOutline = tool.createRectOutline(start, this.stepLength, stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    let lE_d, rE_d, lFE_d, rFE_d // 第二层左边、右边、左前边，右前边

    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      rE = rectOutline.edges[1]
      rFE = this.createBeszerEdge(rE.p2, this.wVec, offset2, this.lVec, -this.stepLength / 2)
      rE_d = this.createBeszerEdge(rE.p2, this.wVec, stepWidth, this.lVec, 0)
      rFE_d = this.createBeszerEdge(rE_d.p2, this.wVec, offset2, this.lVec, -this.stepLength / 2)
    } else {
      rE = this.createBeszerEdge(bE.p2, this.lVec, offset1, this.wVec, stepWidth / 2)
      rFE = this.createBeszerEdge(rE.p2, this.wVec, offset2+stepWidth/2, this.lVec, -offset1-this.stepLength/2)
      rE_d = this.createBeszerEdge(bE.p2, this.lVec, offset1 * 2, this.wVec, stepWidth)
      rFE_d = this.createBeszerEdge(rE_d.p2, this.wVec, offset2+stepWidth, this.lVec, -offset1 * 2 - this.stepLength/2)
    }

    if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2, this.wVec, -offset2)
      lE = rectOutline.edges[3]
      lFE_d = this.createBeszerEdge(rFE_d.p2, this.lVec, -this.stepLength / 2, this.wVec, -offset2)
      lE_d = this.createBeszerEdge(lE.p2, this.wVec, -stepWidth / 2, this.lVec, 0)
    } else {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2-offset1, this.wVec, -stepWidth/2-offset2)
      lE = this.createBeszerEdge(lFE.p2, this.wVec, -stepWidth/2, this.lVec, offset1)
      lFE_d = this.createBeszerEdge(rFE_d.p2, this.lVec, -this.stepLength / 2-offset1 * 2, this.wVec, -stepWidth - offset2)
      lE_d = this.createBeszerEdge(lFE_d.p2, this.wVec, -stepWidth, this.lVec, offset1 * 2)
    }
    outline.edges.push(bE,rE,rFE,lFE,lE)
    outline1.edges.push(bE,rE_d,rFE_d,lFE_d,lE_d)
    return [outline1,outline]
  }

  // 单层圆角矩形
  createRROutline({start, stepWidth = this.stepWidth}) {
    let outline = new Types.Outline({isClock:true, isClose:true})
    let rectOutline = tool.createRectOutline(start, this.stepLength, stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let rE = rectOutline.edges[1]//右边
    let lE = rectOutline.edges[3]//左边
    let rArc, lArc , rL,lL// 右圆弧、 左圆弧
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      rL = rE
    } else {
      rArc = this.createArcEdge(bE.p2,this.wVec,stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
    }

    if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      lL = lE
    } else {
      lArc = this.createArcEdge(dE.p2,this.wVec,-stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
    }
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      outline.edges.push(bE,rL, dE,lArc)
    }else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      outline.edges.push(bE,rArc, dE,lL)
    }else {
      outline.edges.push(bE,rArc, dE,lArc)
    }
    return [outline]
  }

  // 双层圆角矩形
  createRRDOutline({start, stepWidth = this.stepWidth}) {
    let outline = new Types.Outline({isClock:true, isClose:true})
    let outline1 = new Types.Outline({isClock:true, isClose:true})
    let rectOutline = tool.createRectOutline(start, this.stepLength, stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let rE = rectOutline.edges[1]// 右边
    let lE = rectOutline.edges[3]// 左边
    let new_rE = new Edge(rectOutline.edges[1]).extendP2(stepWidth)
    let new_lE = new Edge(rectOutline.edges[3]).extendP2(stepWidth)
    let new_dE = new Edge(dE).offset(stepWidth)
    let rArc, lArc , rL,lL// 右圆弧、 左圆弧
    let rArc_d, lArc_d // 第二层右圆弧， 第层左圆弧
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      rL = new_rE
    } else {
      rArc = this.createArcEdge(bE.p2,this.wVec,stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
      rArc_d = this.createArcEdge(bE.p2, this.wVec,stepWidth, -Math.PI / 2, Math.PI / 2, false)
    }

    if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      lL = new_lE
    } else {
      lArc = this.createArcEdge(dE.p2,this.wVec,-stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
      lArc_d = this.createArcEdge(new_dE.p2,this.wVec, -stepWidth,-Math.PI / 2, Math.PI / 2, false)
    }
    if (this.shapeType === Types.StartTreadShapeType.sts_right) {
      outline.edges.push(bE,rE,dE,lArc)
      outline1.edges.push(bE,new_rE,new_dE,lArc_d)
    }else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
      outline.edges.push(bE,rArc,dE,lE)
      outline1.edges.push(bE,rArc_d,new_dE,lL)
    }else {
      outline.edges.push(bE,rArc, dE,lArc)
      outline1.edges.push(bE,rArc_d,new_dE,lArc_d)
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
      this.treads = []
      let stepNumDiff = this.stepNum - stepNum
      let f1 = this.parent.flights[0]
      let lengthDiff = f1.stepWidth * stepNumDiff
      f1.updateItem(f1.stepNum + stepNumDiff, 'stepNum')
      f1.updateItem(f1.length + lengthDiff, 'length')
      this.stepNum = stepNum
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
    let startTreadoffSet1 = this.parent.flights[this.parent.flights.length - 1].offSet1
    this.sideOffset = this.parent.sideOffset
    // this.sideOffset >50 ? this.sideOffset = this.parent.sideOffset : this.sideOffset = 45
    this.positionX = 0
    this.positionY = 0
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        this.positionX = this.positionC.x - this.stepLength / 2 - this.offset1 / 2
        this.positionY = this.positionC.y + this.stepWidth / 2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        this.positionX = this.positionL.x + this.sideOffset
        this.positionY = this.positionL.y + this.stepWidth / 2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        this.positionX = this.positionR.x - this.stepLength - this.offset1 / 2
        this.positionY = this.positionR.y + this.stepWidth / 2
      }
    }
    else {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        this.positionX = this.positionC.x - this.stepLength / 2 - this.stepWidth / 8
        this.positionY = this.positionC.y + this.stepWidth / 2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        this.positionX = this.positionL.x + this.sideOffset
        this.positionY = this.positionL.y + this.stepWidth / 2
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        this.positionX = this.positionR.x - this.stepLength - this.stepWidth / 8
        this.positionY = this.positionR.y + this.stepWidth / 2
      }
    }
    let left = new Types.Vector3({
      x: this.positionX,
      y: this.positionY
    })

    
    this.positionX_R = 0
    this.positionY_R = 0
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        this.positionX_R = this.positionC.x + this.stepLength / 2 + this.offset1 / 2
        this.positionY_R = left.y
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        this.positionX_R = this.positionL.x + this.stepLength + this.offset1 / 2
        this.positionY_R = left.y
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        this.positionX_R = this.positionR.x -this.sideOffset
        this.positionY_R = left.y
      }
    }
    else {
      if (this.shapeType === Types.StartTreadShapeType.sts_no) {
        this.positionX_R = this.positionC.x + this.stepLength / 2 + this.stepWidth / 8
        this.positionY_R = left.y
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        this.positionX_R = this.positionL.x + this.stepLength + this.stepWidth / 8
        this.positionY_R = left.y
      }
      else if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        this.positionX_R = this.positionR.x -this.sideOffset
        this.positionY_R = left.y
      }

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
    if (this.parent.flights[0]) {
      this.width = this.parent.flights[0].stepLength
    } else {
      this.width = Default.STEP_LENGTH
    }
    console.log(this)
    console.log(this.parent)
    let handrailHeight = this.parent.handrailParameters.height
    let stepLength = this.parent.flights[this.parent.flights.length - 1].treads[0].stepLength
    let stepWidth = this.parent.flights[this.parent.flights.length - 1].treads[0].stepWidth
    let sideOffset = this.parent.sideOffset
    let arcRL = 90 //左弯头半径
    let arcRR = 90 //右弯头半径
    if (this.shapeType === 2) {
      arcRL = 45
    } else if (this.shapeType === 3) {
      arcRR = 45
    }
    let leftC = new Types.Outline()
    let rightC = new Types.Outline()
    let leftPois = []
    let rightPois = []

    // 左边扶手
    // 椭圆踏板扶手路径
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        leftPois[0] = new Types.Vector3({
          x: this.positionR.x - this.stepLength - this.offset1 / 2 ,
          y: this.positionR.y + stepWidth / 2,
          z: handrailHeight,
        })
      } else {
        leftPois[0] = new Types.Vector3({
          x: this.positionC.x - this.stepLength / 2 - this.offset1 / 2,
          y: this.positionC.y + this.stepWidth / 2,
          z: handrailHeight,
        })
      }
    }
    // 圆角矩形踏板扶手路径
    else {
      if (this.shapeType === Types.StartTreadShapeType.sts_right) {
        leftPois[0] = new Types.Vector3({
          x: this.positionR.x - this.stepLength - this.stepWidth / 4 ,
          y: this.positionR.y + this.stepWidth / 2,
          z: handrailHeight,
        })
      }else {
        leftPois[0] = new Types.Vector3({
          x: this.positionC.x - this.stepLength / 2 - this.stepWidth / 4,
          y: this.positionC.y + this.stepWidth / 2,
          z: handrailHeight,
        })
      }
    }
    leftPois[1] = new Types.Vector3({
      x: this.positionL.x + sideOffset - arcRL,
      y: this.positionC.y + this.stepWidth / 2,
      z: handrailHeight,
    })
    leftPois[2] = new Types.Vector3({
      x: this.positionL.x + sideOffset,
      y: this.positionC.y + this.stepWidth / 2 - arcRL,
      z: handrailHeight,
    })
    leftPois[3] = new Types.Vector3({
      x: this.positionL.x + sideOffset,
      y: this.positionC.y,
      z: handrailHeight
    })

    // 右边扶手
    if (this.modelType === Types.StartTreadType.st_el || this.modelType === Types.StartTreadType.st_el_2) {
      if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        rightPois[0] = new Types.Vector3({
          x: this.positionL.x + this.stepLength + this.offset1 / 2,
          y: this.positionL.y + this.stepWidth / 2,
          z: handrailHeight
        })
      }else {
        rightPois[0] = new Types.Vector3({
          x: this.positionC.x + this.stepLength / 2 + this.offset1 / 2,
          y: this.positionC.y + this.stepWidth / 2,
          z: handrailHeight
        })
      }
    }else {
      if (this.shapeType === Types.StartTreadShapeType.sts_left) {
        rightPois[0] = new Types.Vector3({
          x: this.positionL.x + this.stepLength + this.stepWidth / 4,
          y: this.positionL.y + this.stepWidth / 2,
          z: handrailHeight
        })
      }else {
        rightPois[0] = new Types.Vector3({
          x: this.positionC.x + this.stepLength / 2 + this.stepWidth / 4,
          y: this.positionC.y + this.stepWidth / 2,
          z: handrailHeight
        })
      }
    }
    rightPois[1] = new Types.Vector3({
      x: this.positionL.x + this.width - sideOffset + arcRR,
      y: this.positionC.y + this.stepWidth / 2,
      z: handrailHeight
    })
    rightPois[2] = new Types.Vector3({
      x: this.positionL.x + this.width - sideOffset,
      y: this.positionC.y + this.stepWidth / 2 - arcRR,
      z: handrailHeight
    })
    rightPois[3] = new Types.Vector3({
      x: this.positionL.x + this.width - sideOffset,
      y: this.positionC.y,
      z: handrailHeight
    })

    for (let i = 0; i < leftPois.length - 1; i++) {
      if (i !== 1) {
        leftC.edges.push(
          new Types.Edge({
            p1: leftPois[i],
            p2: leftPois[i + 1],
            type: Types.EdgeType.estraight,
          })
        )
      }
    }
    let firstLE = leftC.edges[0]
    let bzrLE = this.createBeszerEdge(firstLE.p2,this.lVec,arcRL,this.wVec,-arcRL)
    leftC.edges.splice(1,0,bzrLE)
    if (this.shapeType === 2) {
      leftC.edges.splice(0,2)
    }

    for (let i = 0; i < rightPois.length - 1; i++) {
      if (i !== 1) {
        rightC.edges.push(
          new Types.Edge({
            p1: rightPois[i],
            p2: rightPois[i + 1],
            type: Types.EdgeType.estraight,
          })
        )
      }
    }
    let firstRE = rightC.edges[0]
    let bzrRE = this.createBeszerEdge(firstRE.p2,this.lVec,-arcRR,this.wVec,-arcRR)
    rightC.edges.splice(1,0,bzrRE)
    if (this.shapeType === 3) {
      rightC.edges.splice(0,2)
    }

    let left = leftC.edges
    let right = rightC.edges
    return {
      left,
      right
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