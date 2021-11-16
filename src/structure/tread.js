import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
// import { Default } from './config'
import tool from './tool'

export class Tread extends ChildInfo {
  /**
   *
   * @param {Object} param0
   * @param {Number} param0.vIndex 踏板的索引
   * @param {Array<Types.Vector3>} param0.vPois 踏板的轮廓边缘点，目前只针对休台异形踏板
   * @param {boolean} param0.vIsLast 踏板是否为二楼平面上的最后一级
   * @param {Types.Vector3} param0.vPos 踏板的位置，即矩形绘制时起始点的坐标
   */
  constructor({ vParent, vIndex, vPois, vPos, vIsLast }) {
    super(vParent)
    this.inheritL = true
    this.inheritW = true
    this.inheritH = true
    this.isLast = vIsLast
    // this.type === Types.TreadType.trect
    // this.projId = Default.START_TREAD_PRO_ID
    this.rebuildByParent({ vIndex, vPois, vPos })
  }

  getArgs() {
    let args = {}
    // if ([Types.TreadType.trect, Types.TreadType.tStart].includes(this.type)) {
    if (this.type === Types.TreadType.trect) {
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
    //args.start = {name:'起步踏造型', value:this.type===Types.TreadType.tStart, type:'switch'}
    return args
  }

  /**
   * 标准矩形踏板，根据位置及长宽构建出踏板轮廓
   */
  createRectOutline() {
    let gArgs = this.parent.parent.girderParameters
    let xOffset = gArgs.type === Types.GirderType.gslab ? gArgs.depth : 0
    this.outline = tool.createRectOutline(
      this.position,
      this.stepLength - 2 * xOffset,
      this.stepWidth,
      this.lVec,
      this.wVec
    )
  }

  /**
   * 创建起步踏板轮廓哟
   */
  // createStartOutline() {
  //   let pois = []

  //   pois[0] = new THREE.Vector2(this.position.x, this.position.y).addScaledVector(this.lVec, this.oriStepLength / 2)
  //   pois[1] = pois[0].clone().addScaledVector(this.lVec, this.oriStepLength)
  //   pois[2] = pois[1].clone().addScaledVector(this.lVec, this.oriStepLength / 9)
  //   pois[3] = pois[2].clone().addScaledVector(this.wVec, this.oriStepWidth / 2)
  //   pois[4] = pois[3].clone().addScaledVector(this.wVec, this.oriStepWidth / 2 + this.oriStepWidth / 4)
  //   pois[5] = pois[4].clone().addScaledVector(this.lVec, -(this.oriStepLength / 2 + this.oriStepLength / 9))
  //   pois[6] = pois[5].clone().addScaledVector(this.lVec, -(this.oriStepLength / 2 + this.oriStepLength / 9))
  //   pois[7] = pois[6].clone().addScaledVector(this.wVec, -(this.oriStepWidth / 2 + this.oriStepWidth / 4))
  //   pois[8] = pois[7].clone().addScaledVector(this.wVec, -this.oriStepWidth / 2)
  //   pois[9] = pois[8].clone().addScaledVector(this.lVec, this.oriStepLength / 9)

  //   this.outline = new Types.Outline()
  //   let edges = []

  //   for (let i = 0; i < pois.length - 1; i++) {
  //     let p = pois[i]
  //     let nextP = i === pois.length ? pois[0] : pois[i + 1]
  //     edges.push(
  //       new Types.Edge({
  //         p1: p,
  //         p2: nextP,
  //         type: Types.EdgeType.earc,
  //       })
  //     )
  //   }
  //   this.outline.edges = edges
  // }

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
    }
    else {
      this.createRectOutline()
      this.type = Types.TreadType.trect
    }
    // else if (this.type === Types.TreadType.trect) {
    //   this.createRectOutline()
    // }
    // else if (this.type === Types.TreadType.tStart) {
    //   this.createStartOutline()
    // }
  }

  updateItem(vValue, vKey, vSecondKey) {
    if (['stepHeight', 'stepLength', 'stepWidth'].includes(vKey)) {
      this[vSecondKey] = vValue
    }
    // else if (vKey === 'start') {
    //   this.type = vValue ? Types.TreadType.tStart : Types.TreadType.trect
    // } 
    else {
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
