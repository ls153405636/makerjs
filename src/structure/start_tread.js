import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import { Default } from './config'
import tool from './tool'

export class StartTread extends ChildInfo {
  constructor({ vParent, vIndex, vPois, vPos }) {
    super(vParent)
    this.stepWidth = vParent.stepWidth
    this.stepLength = vParent.stepLength
    this.newPosition = vParent.length - this.stepWidth
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.projId = Default.START_TREAD_PRO_ID
    this.rebuildByParent({ vIndex, vPois, vPos })
  }

  rebuildByParent({ vIndex, vPois, vPos }) {
    this.position = vPos || new Types.Vector3()
    this.lVec = this.parent.lVec || new Types.Vector3()
    this.wVec = this.parent.wVec || new Types.Vector3()
    this.index = vIndex
    if (this.inheritL) {
      this.stepLength = this.parent.stepLength || 0
    }
    if (this.inheritW) {
      this.stepWidth = this.parent.stepWidth || 0
    }
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    if (vPois?.length) {
      this.outline = tool.createOutlineByPois(vPois)
      this.type = Types.TreadType.tph
    } else {
      this.createOutline(vPos)
      this.type = Types.TreadType.trect_f
    }
  }

  createOutline(
    vPos,
    vLengthVec = new THREE.Vector2(1, 0),
    vWidthVec = new THREE.Vector2(0, 1)
  ) {
    this.position = vPos || new Types.Vector3()
    // console.trace('')
    let lVec = vLengthVec
    let wVec = vWidthVec
    let pois = []

    pois[0] = new THREE.Vector2(this.position.x, this.position.y)
    pois[1] = pois[0].clone().addScaledVector(lVec, this.stepLength)
    pois[2] = pois[1].clone().addScaledVector(lVec, this.stepLength / 9)
    pois[3] = pois[2].clone().addScaledVector(wVec, this.stepWidth / 2)
    pois[4] = pois[3]
      .clone()
      .addScaledVector(wVec, this.stepWidth / 2 + this.stepWidth / 4)
    pois[5] = pois[4]
      .clone()
      .addScaledVector(lVec, -(this.stepLength / 2 + this.stepLength / 9))
    pois[6] = pois[5]
      .clone()
      .addScaledVector(lVec, -(this.stepLength / 2 + this.stepLength / 9))
    pois[7] = pois[6]
      .clone()
      .addScaledVector(wVec, -(this.stepWidth / 2 + this.stepWidth / 4))
    pois[8] = pois[7].clone().addScaledVector(wVec, -this.stepWidth / 2)
    pois[9] = pois[8].clone().addScaledVector(lVec, this.stepLength / 9)

    this.outline = new Types.Outline()
    let edges = []

    for (let i = 0; i < pois.length - 1; i++) {
      let p = pois[i]
      let nextP = i === pois.length ? pois[0] : pois[i + 1]
      edges.push(
        new Types.Edge({
          p1: p,
          p2: nextP,
          type: Types.EdgeType.earc,
        })
      )
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
