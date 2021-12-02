import { Types } from '../../types/stair_v2'
import { Edge } from '../../utils/edge'
import { Outline } from '../../utils/outline'
import { ChildInfo } from '../child_info'
import { Default } from '../config'
import tool from '../tool'

export class StartTread extends ChildInfo {

  static START_TYPE_OPTION = [
    { value: Types.StartTreadType.st_el, label: '椭圆型'},
    { value: Types.StartTreadType.st_rr, label: '双层椭圆型'},
    { value: Types.StartTreadType.st_el_2, label: '圆角矩形'},
    { value: Types.StartTreadType.st_rr_2, label: '双层圆角矩形'},
  ]

  constructor({ vParent, vIndex, vPois, vPos,vType=Types.StartTreadType.st_el,vShapeType=Types.StartTreadShapeType.sts_no}) {
    super(vParent)
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.startTreadType = vType
    this.startTreadShapeType = vShapeType
    this.projId = Default.START_TREAD_PRO_ID
    this.rebuildByParent({ vIndex, vPois, vPos })
    this.computeBigColPos()
  }
  
  rebuildByParent({ vIndex, vPois, vPos}) {
    const length = this.parent.stepLength 
    this.index = vIndex
    this.lVec = this.parent.lVec || new Types.Vector3()
    this.wVec = this.parent.wVec || new Types.Vector3()
    this.pos = vPos

    this.positionL = this.pos || new Types.Vector3()
    this.positionC = new THREE.Vector2(this.pos.x,this.pos.y).addScaledVector(this.lVec,length / 2) || new Types.Vector3()
    this.positionR = new THREE.Vector2(this.pos.x,this.pos.y).addScaledVector(this.lVec,length) || new Types.Vector3()

    this.offSet1 = this.parent.stepWidth * 0.7
    this.offSet2 = this.parent.stepWidth / 6
    if (this.inheritL) {
      this.stepLength = this.parent.stepLength|| 0
    }
    if (this.inheritW) {
      this.stepWidth = this.parent.stepWidth || 0
    }
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    if (vPois?.length) {
      this.outline = tool.createOutlineByPois(vPois)
      this.treadType = Types.TreadType.tph
    }
    else {
      if (this.startTreadType === Types.StartTreadType.st_el) {
        this.createElOutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      else if (this.startTreadType === Types.StartTreadType.st_el_2) {
        this.createElDOutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      else if (this.startTreadType === Types.StartTreadType.st_rr) {
        this.createRROutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      else if (this.startTreadType === Types.StartTreadType.st_rr_2) {
        this.createRRDOutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      
    }
  }

  /**
   * 计算实际的顶点postion
   */
  computeRealPos () {
    let pos = new Types.Vector3(this.positionL)
    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_no) {
      pos = new Edge().setByVec(this.positionC, this.lVec, -this.stepLength / 2).p2
    } else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
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
    let pois = []

    this.outline = new Types.Outline()
    let edges = []
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
      rE = rectOutline.edges[1]
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2, this.lVec, -this.stepLength / 2)
    } else {
      rE = this.createBeszerEdge(bE.p2, this.lVec, this.offSet1, this.wVec, this.stepWidth / 2)
      rFE = this.createBeszerEdge(rE.p2, this.wVec, this.offSet2+this.stepWidth/2, this.lVec, -this.offSet1-this.stepLength/2)
    }

    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2, this.wVec, -this.offSet2)
      lE = rectOutline.edges[3]
    } else {
      lFE = this.createBeszerEdge(rFE.p2, this.lVec, -this.stepLength/2-this.offSet1, this.wVec, -this.stepWidth/2-this.offSet2)
      lE = this.createBeszerEdge(lFE.p2, this.wVec, -this.stepWidth/2, this.lVec, this.offSet1)
    }
    edges.push(bE, rE, rFE, lFE, lE)
    
    this.outline.edges = edges
  }
  //双层椭圆
  createElDOutline() {
    let pois = []

    this.outline = new Types.Outline()
    let edges = []
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let lE, rE, lFE, rFE //分别为左边、右边、左前边，右前边
    let lE_d, rE_d, lFE_d, rFE_d

    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
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

    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
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
    edges.push(bE,rE,rFE,lFE,lE,bE,rE_d,rFE_d,lFE_d,lE_d)
    
    this.outline.edges = edges
    console.log(this.outline.edges)
  }
  // 单层圆角矩形
  createRROutline() {
    let pois = []

    this.outline = new Types.Outline()
    let edges = []
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let rE = rectOutline.edges[1]
    let lE = rectOutline.edges[3]
    let rArc, lArc , rL,lL// 右圆弧、 左圆弧
    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
      rL = rE
    } else {
      rArc = this.createArcEdge(bE.p2,this.wVec,this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
    }

    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
      lL = lE
    } else {
      lArc = this.createArcEdge(dE.p2,this.wVec,-this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
    }
    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
      edges.push(bE,rL, dE,lArc)
    }else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
      edges.push(bE,rArc, dE,lL)
    }else {
      edges.push(bE,rArc, dE,lArc)
    }
    
    this.outline.edges = edges
  }
  // 双层圆角矩形
  createRRDOutline() {
    let pois = []

    this.outline = new Types.Outline()
    let edges = []
    let start = this.computeRealPos()
    let rectOutline = tool.createRectOutline(start, this.stepLength, this.stepWidth, this.lVec, this.wVec)
    
    let bE = rectOutline.edges[0]//后边
    let dE = rectOutline.edges[2]//底边
    let rE = rectOutline.edges[1]
    let lE = rectOutline.edges[3]
    let new_rE = new Edge(rectOutline.edges[1]).extendP2(this.stepWidth)
    let new_lE = new Edge(rectOutline.edges[3]).extendP2(this.stepWidth)
    let new_dE = new Edge(dE).offSet(this.stepWidth)
    let rArc, lArc , rL,lL// 右圆弧、 左圆弧
    let rArc_d, lArc_d // 第二层右圆弧， 第层左圆弧
    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
      rL = new_rE
    } else {
      rArc = this.createArcEdge(bE.p2,this.wVec,this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
      rArc_d = this.createArcEdge(bE.p2, this.wVec,this.stepWidth, -Math.PI / 2, Math.PI / 2, false)
    }

    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
      lL = new_lE
    } else {
      lArc = this.createArcEdge(dE.p2,this.wVec,-this.stepWidth / 2, -Math.PI / 2, Math.PI / 2, false)
      lArc_d = this.createArcEdge(new_dE.p2,this.wVec, -this.stepWidth,-Math.PI / 2, Math.PI / 2, false)
    }
    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
      edges.push(bE,rE,dE,lArc,bE,new_rE,new_dE,lArc_d)
    }else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
      edges.push(bE,rArc,dE,lE,bE,rArc_d,new_dE,lL)
    }else {
      edges.push(bE,rArc, dE,lArc,bE,rArc_d,new_dE,lArc_d)
    }
    
    this.outline.edges = edges
  }

  updateItem(vValue, vKey, vSecondKey) {
    if (['stepHeight', 'stepLength', 'stepWidth'].includes(vKey)) {
      this[vSecondKey] = vValue
    }
    else {
      this[vKey] = vValue
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }
  getArgs() {
    let args = {}
    args.startTreadType = {
      name: '类型',
      options: {
        0: { value: Types.StartTreadType.st_el, label: '椭圆型'},
        1: { value: Types.StartTreadType.st_el_2, label: '双层椭圆型'},
        2: { value: Types.StartTreadType.st_rr, label: '圆角矩形'},
        3: { value: Types.StartTreadType.st_rr_2, label: '双层圆角矩形'},
      },
      value: {value: this.startTreadType, label: '椭圆型'},
      type: 'select',
    }
    args.startTreadShapeType = {
      name: '造型',
      options: {
        0: { value: Types.StartTreadShapeType.sts_no, label: '保留两边造型'},
        1: { value: Types.StartTreadShapeType.sts_left, label: '去掉左边造型'},
        2: { value: Types.StartTreadShapeType.sts_right, label: '去掉右边造型'},
      },
      value: {value: this.startTreadShapeType, label: '保留两边造型'},
      type: 'select',
    }
    args.stepLength = {
      name: '步长',
      value: {
        inheritL: {
          name: '继承楼梯段',
          value: this.inheritL,
          type: 'switch',
        },
        stepLength: {
          name: '数值',
          value: this.stepLength,
          type: 'input',
          disabled: this.inheritL,
        },
      },
      type: 'group',
    }
    args.stepWidth = {
      name: '步宽',
      value: {
        inheritW: {
          name: '继承楼梯段',
          value: this.inheritW,
          type: 'switch',
        },
        stepWidth: {
          name: '数值',
          value: this.stepWidth,
          type: 'input',
          disabled: this.inheritW,
        },
      },
      type: 'group',
    }
    args.stepHeight = {
      name: '步高',
      value: {
        inheritH: { name: '继承楼梯段', value: this.inheritH, type: 'switch' },
        stepHeight: {
          name: '数值',
          value: this.stepHeight,
          type: 'input',
          disabled: this.inheritH,
        },
      },
      type: 'group',
    }
    return args
  }

  computeBigColPos () {
    /** */
    let args = this.parent.parent.bigColParameters
    this.sideOffset = this.parent.parent.sideOffset
    // this.sideOffset >50 ? this.sideOffset = this.parent.parent.sideOffset : this.sideOffset = 45
    let bigColPositionX = 0
    let bigColPositionY = 0
    if (this.startTreadType === Types.StartTreadType.st_el || this.startTreadType === Types.StartTreadType.st_rr) {
      if (this.startTreadShapeType === Types.StartTreadShapeType.sts_no) {
        bigColPositionX = this.positionC.x - this.stepLength / 2 - this.offSet1 / 2
        bigColPositionY = this.positionC.y + this.stepWidth + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
        bigColPositionX = this.positionL.x - this.offSet1 / 2
        bigColPositionY = this.positionL.y + this.stepWidth + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
        bigColPositionX = this.positionR.x - this.offSet1 / 2 - this.stepLength
        bigColPositionY = this.positionR.y + this.stepWidth + this.offSet2 * 2
      }
    } else {
      if (this.startTreadShapeType === Types.StartTreadShapeType.sts_no) {
        bigColPositionX = this.positionC.x - this.stepLength / 2 - this.offSet1 / 2
        bigColPositionY = this.positionC.y + this.stepWidth * 2 + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
        bigColPositionX = this.positionL.x - this.offSet1 / 2
        bigColPositionY = this.positionL.y + this.stepWidth * 2 + this.offSet2 * 2
      }
      else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
        bigColPositionX = this.positionR.x - this.offSet1 / 2 - this.stepLength
        bigColPositionY = this.positionR.y + this.stepWidth * 2 + this.offSet2 * 2
      }
    }
    let left = new Types.Vector3({
      x: bigColPositionX,
      y: bigColPositionY
      })

    if (args.posType === Types.BigColumnPosType.bcp_first) {
      left.y = left.y - this.stepWidth / 2 - this.offSet2 * 2
    }
    if (args.posType === Types.BigColumnPosType.bcp_second) {
      left.y = left.y - this.stepWidth - this.stepWidth / 2 - this.offSet2 * 2
    }
    
    this.positionX_R = 0
    this.positionY_R = 0
    if (this.startTreadShapeType === Types.StartTreadShapeType.sts_no) {
      this.positionX_R = this.positionC.x + this.stepLength / 2 + this.offSet1 / 2
      this.positionY_R = left.y
    }
    else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_left) {
      this.positionX_R = this.positionL.x + this.sideOffset * 2 + this.stepLength
      this.positionY_R = left.y
    }
    else if (this.startTreadShapeType === Types.StartTreadShapeType.sts_right) {
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

  writePB() {
    return new Types.Tread({
      startTreadType: this.startTreadType,
      uuid: this.uuid,
      index: this.index,
      isLast: this.isLast,
      stepOutline: this.outline,
      stepHeight: this.stepHeight,
      stepWidth: this.stepWidth,
      stepLength: this.stepLength,
      inheritH: this.inheritH,
      inheritW: this.inheritW,
      inheritL: this.inheritL,
    })
  }
}
