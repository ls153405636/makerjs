import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import { Default } from './config'
import tool from './tool'

export class StartTread extends ChildInfo {

  static START_TYPE_OPTION = [
    { value: Types.StartTreadType.sel, label: '椭圆型'},
    { value: Types.StartTreadType.srr, label: '双层椭圆型'},
    { value: Types.StartTreadType.sel_w, label: '圆角矩形'},
    { value: Types.StartTreadType.srr_w, label: '双层圆角矩形'},
  ]

  constructor({ vParent, vIndex, vPois, vPos,vType=Types.StartTreadType.sel,vShapeType=Types.StartTreadShapeType.s_no}) {
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

    this.positionL = vPos || new Types.Vector3()
    this.positionC = new THREE.Vector2(vPos.x,vPos.y).addScaledVector(this.lVec,length / 2) || new Types.Vector3()
    this.positionR = new THREE.Vector2(vPos.x,vPos.y).addScaledVector(this.lVec,length) || new Types.Vector3()

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
      if (this.startTreadType === Types.StartTreadType.sel) {
        this.createElOutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      else if (this.startTreadType === Types.StartTreadType.sel_2) {
        this.createElDOutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      else if (this.startTreadType === Types.StartTreadType.srr) {
        this.createRROutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      else if (this.startTreadType === Types.StartTreadType.srr_2) {
        this.createRRDOutline(vPos,this.startTreadType,this.startTreadShapeType)
        this.treadType = Types.TreadType.tStart
      }
      
    }
  }


  // 单层椭圆
  createElOutline() {
    let pois = []

    // 椭圆型踏板
    if (this.startTreadShapeType === 1) {
      // 起点
      pois[0] = new THREE.Vector2(this.positionC.x, this.positionC.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[2] = pois[1].clone().addScaledVector(this.lVec, this.offSet1)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.wVec, this.stepWidth / 2 + this.offSet2)
      pois[5] = pois[4].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1)
      pois[6] = pois[5].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1)
      pois[7] = pois[6].clone().addScaledVector(this.wVec, -this.stepWidth / 2 - this.offSet2)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
      pois[9] = pois[8].clone().addScaledVector(this.lVec, this.offSet1)
      pois[10] = pois[9].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[11] = pois[0]
    } else if (this.startTreadShapeType === 2) {
      // 去掉左边
      pois[0] = new THREE.Vector2(this.positionL.x, this.positionL.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.lVec, this.offSet1)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.wVec, this.stepWidth / 2 + this.offSet2)
      pois[5] = pois[4].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1)
      pois[6] = pois[5].clone().addScaledVector(this.lVec, -this.stepLength / 2)
      pois[7] = pois[6].clone().addScaledVector(this.wVec, -this.offSet2)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[9] = pois[0]
    } else {
      // 去掉右边
      pois[0] = new THREE.Vector2(this.positionR.x, this.positionR.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.lVec, -this.offSet1)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.wVec, this.stepWidth / 2 + this.offSet2)
      pois[5] = pois[4].clone().addScaledVector(this.lVec, this.stepLength / 2 + this.offSet1)
      pois[6] = pois[5].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[7] = pois[6].clone().addScaledVector(this.wVec, -this.offSet2)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[9] = pois[0]
    }
    
    this.outline = new Types.Outline()
    let edges = []

    for (let i = 0; i < pois.length - 1; i++) {
      let p = pois[i]
      let nextP = i === pois.length ? pois[0] : pois[i + 1]
      // if (i === 0 || i === 1 || i === 10 || i === 11 || i === 12 || i === 13 || i === pois.length - 3 || i === pois.length - 2) {
      //   edges.push(
      //     new Types.Edge({
      //       p1: p,
      //       p2: nextP,
      //       type: Types.EdgeType.estraight,
      //     })
      //   )
      // }
      // else {
        edges.push(
          new Types.Edge({
            p1: p,
            p2: nextP,
            type: Types.EdgeType.ebeszer,
          })
        )
      // }
    }
    this.outline.edges = edges
  }
  //双层椭圆
  createElDOutline() {
    let pois = []
    // 双层椭圆型踏板
    if (this.startTreadShapeType === 1) {
      // 起点
      pois[0] = new THREE.Vector2(this.positionC.x, this.positionC.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[2] = pois[1].clone().addScaledVector(this.lVec, this.offSet1)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.wVec, this.stepWidth / 2 + this.offSet2)
      pois[5] = pois[4].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1)
      pois[6] = pois[5].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1)
      pois[7] = pois[6].clone().addScaledVector(this.wVec, -this.stepWidth / 2 - this.offSet2)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
      pois[9] = pois[8].clone().addScaledVector(this.lVec, this.offSet1)
      pois[10] = pois[9].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[11] = pois[0]
      pois[12] = pois[11].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[13] = pois[12].clone().addScaledVector(this.lVec, this.offSet1 + this.offSet1 / 4)
      pois[14] = pois[13].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[15] = pois[14].clone().addScaledVector(this.wVec, this.stepWidth + this.offSet2)
      pois[16] = pois[15].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1 - this.offSet1 / 4)
      pois[17] = pois[16].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1 - this.offSet1 / 4)
      pois[18] = pois[17].clone().addScaledVector(this.wVec, -this.stepWidth - this.offSet2)
      pois[19] = pois[18].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[20] = pois[19].clone().addScaledVector(this.lVec, this.offSet1 + this.offSet1 / 4)
      pois[21] = pois[20].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[22] = pois[0]
    } else if (this.startTreadShapeType === 2) {
      // 去掉左边
      pois[0] = new THREE.Vector2(this.positionL.x, this.positionL.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.lVec, this.offSet1)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.wVec, this.stepWidth / 2 + this.offSet2)
      pois[5] = pois[4].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1)
      pois[6] = pois[5].clone().addScaledVector(this.lVec, -this.stepLength / 2)
      pois[7] = pois[6].clone().addScaledVector(this.wVec, -this.offSet2)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[9] = pois[0]
      pois[10] = pois[9].clone().addScaledVector(this.lVec, this.stepLength)
      pois[11] = pois[10].clone().addScaledVector(this.lVec, this.offSet1 + this.offSet1 / 4)
      pois[12] = pois[11].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[13] = pois[12].clone().addScaledVector(this.wVec, this.stepWidth + this.offSet2)
      pois[14] = pois[13].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1 - this.offSet1 / 4)
      pois[15] = pois[14].clone().addScaledVector(this.lVec, -this.stepLength / 2)
      pois[16] = pois[15].clone().addScaledVector(this.wVec, -this.offSet2)
      pois[17] = pois[16].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[18] = pois[0]
    } else {
      // 去掉右边
      pois[0] = new THREE.Vector2(this.positionR.x, this.positionR.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.lVec, -this.offSet1)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.wVec, this.stepWidth / 2 + this.offSet2)
      pois[5] = pois[4].clone().addScaledVector(this.lVec, this.stepLength / 2 + this.offSet1)
      pois[6] = pois[5].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[7] = pois[6].clone().addScaledVector(this.wVec, -this.offSet2)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[9] = pois[0]
      pois[10] = pois[9].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[11] = pois[10].clone().addScaledVector(this.lVec, -this.offSet1 - this.offSet1 / 4)
      pois[12] = pois[11].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[13] = pois[12].clone().addScaledVector(this.wVec, this.stepWidth + this.offSet2)
      pois[14] = pois[13].clone().addScaledVector(this.lVec, this.stepLength / 2 + this.offSet1 + this.offSet1 / 4)
      pois[15] = pois[14].clone().addScaledVector(this.lVec, +this.stepLength / 2)
      pois[16] = pois[15].clone().addScaledVector(this.wVec, -this.offSet2)
      pois[17] = pois[16].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[18] = pois[0]

    }

    this.outline = new Types.Outline()
    let edges = []

    for (let i = 0; i < pois.length - 1; i++) {
      let p = pois[i]
      let nextP = i === pois.length ? pois[0] : pois[i + 1]
      // if (i === 0 || i === 1 || i === 10 || i === 11 || i === 12 || i === 13 || i === pois.length - 3 || i === pois.length - 2) {
      //   edges.push(
      //     new Types.Edge({
      //       p1: p,
      //       p2: nextP,
      //       type: Types.EdgeType.estraight,
      //     })
      //   )
      // }
      // else {
        edges.push(
          new Types.Edge({
            p1: p,
            p2: nextP,
            type: Types.EdgeType.ebeszer,
          })
        )
      // }
    }
    this.outline.edges = edges
  }
  // 单层圆角矩形
  createRROutline() {
    let pois = []

    // 圆角矩形踏板
    if (this.startTreadShapeType === 1) {

      // 起点
      pois[0] = new THREE.Vector2(this.positionC.x, this.positionC.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[2] = pois[1].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[5] = pois[4].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
      pois[6] = pois[5].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
      pois[7] = pois[0]
      
    } else if (this.startTreadShapeType === 2) {
      // 去掉左边
      pois[0] = new THREE.Vector2(this.positionL.x, this.positionL.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[5] = pois[4].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[6] = pois[0]

    } else {

      // 去掉右边
      pois[0] = new THREE.Vector2(this.positionR.x, this.positionR.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.lVec, this.stepLength)
      pois[5] = pois[4].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[6] = pois[0]
    }
    
    


    this.outline = new Types.Outline()
    let edges = []

    for (let i = 0; i < pois.length - 1; i++) {
      let p = pois[i]
      let nextP = i === pois.length ? pois[0] : pois[i + 1]
      // if (i === 0 || i === 1 || i === 10 || i === 11 || i === 12 || i === 13 || i === pois.length - 3 || i === pois.length - 2) {
      //   edges.push(
      //     new Types.Edge({
      //       p1: p,
      //       p2: nextP,
      //       type: Types.EdgeType.estraight,
      //     })
      //   )
      // }
      // else {
        edges.push(
          new Types.Edge({
            p1: p,
            p2: nextP,
            type: Types.EdgeType.ebeszer,
          })
        )
      // }
    }
    this.outline.edges = edges
  }
  // 双层圆角矩形
  createRRDOutline() {
    let pois = []
    // 双层圆角矩形踏板
    if (this.startTreadShapeType === 1) {

      // 起点
      pois[0] = new THREE.Vector2(this.positionC.x, this.positionC.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[2] = pois[1].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[5] = pois[4].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
      pois[6] = pois[5].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
      pois[7] = pois[0]
      pois[8] = pois[7].clone().addScaledVector(this.lVec, this.stepLength / 2)
      pois[9] = pois[8].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[10] = pois[9].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[11] = pois[10].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[12] = pois[11].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[13] = pois[12].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[14] = pois[7]
    } else if (this.startTreadShapeType === 2) {
      // 去掉左边
      pois[0] = new THREE.Vector2(this.positionL.x, this.positionL.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[5] = pois[4].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[6] = pois[0]
  
      pois[7] = pois[6].clone().addScaledVector(this.lVec, this.stepLength)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[9] = pois[8].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[10] = pois[9].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[11] = pois[10].clone().addScaledVector(this.wVec, -this.stepWidth * 2)
      pois[12] = pois[0]

    } else {

      // 去掉右边
      pois[0] = new THREE.Vector2(this.positionR.x, this.positionR.y)
      pois[1] = pois[0].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[2] = pois[1].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
      pois[4] = pois[3].clone().addScaledVector(this.lVec, this.stepLength)
      pois[5] = pois[4].clone().addScaledVector(this.wVec, -this.stepWidth)
      pois[6] = pois[0]
  
      pois[7] = pois[6].clone().addScaledVector(this.lVec, -this.stepLength)
      pois[8] = pois[7].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[9] = pois[8].clone().addScaledVector(this.wVec, this.stepWidth)
      pois[10] = pois[9].clone().addScaledVector(this.lVec, this.stepLength)
      pois[11] = pois[10].clone().addScaledVector(this.wVec, -this.stepWidth * 2)
      pois[12] = pois[0]
    }

    this.outline = new Types.Outline()
    let edges = []

    for (let i = 0; i < pois.length - 1; i++) {
      let p = pois[i]
      let nextP = i === pois.length ? pois[0] : pois[i + 1]
      // if (i === 0 || i === 1 || i === 10 || i === 11 || i === 12 || i === 13 || i === pois.length - 3 || i === pois.length - 2) {
      //   edges.push(
      //     new Types.Edge({
      //       p1: p,
      //       p2: nextP,
      //       type: Types.EdgeType.estraight,
      //     })
      //   )
      // }
      // else {
        edges.push(
          new Types.Edge({
            p1: p,
            p2: nextP,
            type: Types.EdgeType.ebeszer,
          })
        )
      // }
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
        0: { value: Types.StartTreadType.sel, label: '椭圆型'},
        1: { value: Types.StartTreadType.sel_2, label: '双层椭圆型'},
        2: { value: Types.StartTreadType.srr, label: '圆角矩形'},
        3: { value: Types.StartTreadType.srr_2, label: '双层圆角矩形'},
      },
      value: {value: this.startTreadType, label: '椭圆型'},
      type: 'select',
    }
    args.startTreadShapeType = {
      name: '造型',
      options: {
        0: { value: Types.StartTreadShapeType.s_no, label: '保留两边造型'},
        1: { value: Types.StartTreadShapeType.s_left, label: '去掉左边造型'},
        2: { value: Types.StartTreadShapeType.s_right, label: '去掉右边造型'},
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
