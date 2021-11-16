import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import { Default } from './config'
import tool from './tool'

export class StartTread extends ChildInfo {
  constructor({ vParent, vIndex, vPois, vPos }) {
    super(vParent)
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.projId = Default.START_TREAD_PRO_ID
    this.rebuildByParent({ vIndex, vPois, vPos })
  }

  rebuildByParent({ vIndex, vPois, vPos }) {
    this.index = vIndex
    this.lVec = this.parent.lVec || new Types.Vector3()
    this.wVec = this.parent.wVec || new Types.Vector3()
    this.position = vPos || new Types.Vector3()
    // this.position =new THREE.Vector2(vPos.x,vPos.y).addScaledVector(this.wVec, -this.index * this.parent.stepWidth)
    console.log(this.position)
    this.offSet1 = this.parent.stepWidth * 0.7
    this.offSet2 = this.parent.stepWidth / 6
    if (this.inheritL) {
      // 椭圆踏板参数
      this.stepLength = (this.parent.stepLength / 2 + this.offSet1) * 2 || 0

      // 圆角矩形踏板参数
      // this.stepLength = this.parent.stepLength + this.parent.stepWidth || 0
    }
    if (this.inheritW) {
      // 椭圆踏板参数
      this.stepWidth = this.parent.stepWidth + this.offSet2 || 0

      // 圆角矩形踏板参数
      // this.stepWidth = this.parent.stepWidth || 0
    }
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    if (vPois?.length) {
      this.outline = tool.createOutlineByPois(vPois)
      this.type = Types.TreadType.tph
    } else {
      this.createOutline(vPos)
      this.type = Types.TreadType.tStart
    }
  }

  createOutline() {
    let pois = []

    // 起点
    pois[0] = new THREE.Vector2(this.position.x, this.position.y).addScaledVector(this.lVec, this.parent.stepLength / 2)

    // 椭圆型踏板
    pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength / 2 - this.offSet1)
    pois[2] = pois[1].clone().addScaledVector(this.lVec, this.offSet1)
    pois[3] = pois[2].clone().addScaledVector(this.wVec, (this.stepWidth  - this.offSet2) / 2)
    pois[4] = pois[3].clone().addScaledVector(this.wVec, (this.stepWidth  - this.offSet2) / 2 + this.offSet2)
    pois[5] = pois[4].clone().addScaledVector(this.lVec, -this.stepLength / 2)
    pois[6] = pois[5].clone().addScaledVector(this.lVec, -this.stepLength / 2)
    pois[7] = pois[6].clone().addScaledVector(this.wVec, -(this.stepWidth  - this.offSet2) / 2 - this.offSet2)
    pois[8] = pois[7].clone().addScaledVector(this.wVec, -(this.stepWidth  - this.offSet2) / 2)
    pois[9] = pois[8].clone().addScaledVector(this.lVec, this.offSet1)
    pois[10] = pois[9].clone().addScaledVector(this.lVec, this.stepLength / 2 - this.offSet1)
    pois[11] = pois[0]

    // 双层椭圆型踏板
    // pois[1] = pois[0].clone().addScaledVector(this.lVec, this.stepLength / 2 - this.offSet1)
    // pois[2] = pois[1].clone().addScaledVector(this.lVec, this.offSet1)
    // pois[3] = pois[2].clone().addScaledVector(this.wVec, (this.stepWidth  - this.offSet2) / 2)
    // pois[4] = pois[3].clone().addScaledVector(this.wVec, (this.stepWidth  - this.offSet2) / 2 + this.offSet2)
    // pois[5] = pois[4].clone().addScaledVector(this.lVec, -this.stepLength / 2)
    // pois[6] = pois[5].clone().addScaledVector(this.lVec, -this.stepLength / 2)
    // pois[7] = pois[6].clone().addScaledVector(this.wVec, -(this.stepWidth  - this.offSet2) / 2 - this.offSet2)
    // pois[8] = pois[7].clone().addScaledVector(this.wVec, -(this.stepWidth  - this.offSet2) / 2)
    // pois[9] = pois[8].clone().addScaledVector(this.lVec, this.offSet1)
    // pois[10] = pois[9].clone().addScaledVector(this.lVec, this.stepLength / 2 - this.offSet1)
    // pois[11] = pois[0]
    // pois[12] = pois[11].clone().addScaledVector(this.lVec, this.stepLength / 2 - this.offSet1 + this.offSet1 / 4)
    // pois[13] = pois[12].clone().addScaledVector(this.lVec, this.offSet1+ this.offSet1 / 4)
    // pois[14] = pois[13].clone().addScaledVector(this.wVec, (this.stepWidth  - this.offSet2) / 2 * 2)
    // pois[15] = pois[14].clone().addScaledVector(this.wVec, ((this.stepWidth  - this.offSet2) / 2 + this.offSet2) * 2)
    // pois[16] = pois[15].clone().addScaledVector(this.lVec, -this.stepLength / 2 -  this.offSet1 / 2)
    // pois[17] = pois[16].clone().addScaledVector(this.lVec, -this.stepLength / 2 - this.offSet1 / 2)
    // pois[18] = pois[17].clone().addScaledVector(this.wVec, -(this.stepWidth  - this.offSet2) / 2 * 2- this.offSet2 * 2)
    // pois[19] = pois[18].clone().addScaledVector(this.wVec, -(this.stepWidth  - this.offSet2))
    // pois[20] = pois[19].clone().addScaledVector(this.lVec, this.offSet1 + this.offSet1 / 4)
    // pois[21] = pois[20].clone().addScaledVector(this.lVec, this.stepLength / 2 - this.offSet1 - this.offSet1 / 4)
    // pois[22] = pois[0]


    // 圆角矩形踏板
    // pois[1] = pois[0].clone().addScaledVector(this.lVec, (this.stepLength - this.stepWidth) / 2)
    // pois[2] = pois[1].clone().addScaledVector(this.wVec, this.stepWidth / 2)
    // pois[3] = pois[2].clone().addScaledVector(this.wVec, this.stepWidth / 2)
    // pois[4] = pois[3].clone().addScaledVector(this.lVec, -(this.stepLength - this.stepWidth))
    // pois[5] = pois[4].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
    // pois[6] = pois[5].clone().addScaledVector(this.wVec, -this.stepWidth / 2)
    // pois[7] = pois[0]


    this.outline = new Types.Outline()
    let edges = []

    for (let i = 0; i < pois.length - 1; i++) {
      let p = pois[i]
      let nextP = i === pois.length ? pois[0] : pois[i + 1]
      if (i === 0 || i === 1 || i === 10 || i === 11 || i === 12 || i === 13 || i === pois.length - 3 || i === pois.length - 2) {
        edges.push(
          new Types.Edge({
            p1: p,
            p2: nextP,
            type: Types.EdgeType.estraight,
          })
        )
      }
      else {
        edges.push(
          new Types.Edge({
            p1: p,
            p2: nextP,
            type: Types.EdgeType.ebeszer,
          })
        )
      }
    }
    this.outline.edges = edges
  }

  getArgs() {
    let args = {}
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
  updateItem(vValue, vKey, vSecondKey) {
    if (['stepHeight', 'stepLength', 'stepWidth'].includes(vKey)) {
      this[vSecondKey] = vValue
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  writePB() {
    return new Types.Tread({
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
