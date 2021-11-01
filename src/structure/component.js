import { Types } from '../types/stair_v2'
import { Edge } from '../utils/edge'
import { Default, StructConfig } from './config'
import { Info } from './info'

export class Component extends Info {
  /**
   *
   * @param {typeof import('./wall').Wall} vParent
   * @param {*} vType
   */
  constructor(vParent, vType) {
    super(vParent)
    this.type = vType
    this.offGround = 0
    let angle = new Edge(this.parent.edge).getAngle()
    this.rotation = new Types.Vector3({ y: angle })
    this.interval = 0
  }

  addInfo() {
    StructConfig.INFOS.set(this.uuid, this)
    this.parent.addComponent(this)
  }

  computePosition() {
    let utilEdge = new Edge(this.parent.edge)
    let pos = utilEdge
      .getP1()
      .addScaledVector(utilEdge.getVec(), this.disToStart + this.width / 2)
    if ([4, 5].includes(this.type)) {
      pos.addScaledVector(utilEdge.getNormal().negate(), this.depth / 2)
    } else {
      pos.addScaledVector(utilEdge.getNormal(), this.depth / 2)
    }
    this.position = new Types.Vector3({ x: pos.x, y: pos.y })
  }

  rebuild() {
    this.computePosition()
    this.updateCanvas()
  }

  writePB() {
    return new Types.Component({
      uuid: this.uuid,
      width: this.width,
      depth: this.depth,
      height: this.height,
      type: this.type,
      offGround: this.offGround,
      disToStart: this.disToStart,
      angle: this.angle,
      rotation: this.rotation,
      interval: this.interval,
      position: this.position,
    })
  }
}

export class Inlay extends Component {
  constructor(vParent, vType) {
    super(vParent, vType)
    this.width = Default.INLAY_WIDTH
    this.height = Default.INLAY_HEIGHT
    this.depth = this.parent.depth
    this.disToStart = (new Edge(this.parent.edge).getLength() - this.width) / 2
    this.rebuild()
  }

  getArgs() {
    return {
      depth: { name: '宽度', value: this.depth, type: 'input' },
      width: { name: '长度', value: this.width, type: 'input' },
      height: { name: '高度', value: this.height, type: 'input' },
      disToStart: {
        name: '距端点的距离',
        value: this.disToStart,
        type: 'input',
      },
    }
  }
}

export class Cloumn extends Component {
  constructor(vParent, vType) {
    super(vParent, vType)
    this.width = Default.CEMENT_SIZE
    this.height = this.parent.height
    this.depth = Default.CEMENT_SIZE
    this.disToStart = (new Edge(this.parent.edge).getLength() - this.width) / 2
    this.rebuild()
  }

  getArgs() {
    return {
      width: { name: '宽度', value: this.width, type: 'input' },
      depth: { name: '深度', value: this.depth, type: 'input' },
      height: { name: '高度', value: this.height, type: 'input' },
      interval: { name: '间隙', value: this.interval, type: 'input' },
      disToStart: {
        name: '距端点的距离',
        value: this.disToStart,
        type: 'input',
      },
    }
  }
}

export class Beam extends Component {
  constructor(vParent, vType) {
    super(vParent, vType)
    this.width = new Edge(this.parent.edge).getLength()
    this.height = Default.CEMENT_SIZE
    this.depth = Default.CEMENT_SIZE
    this.offGround = this.parent.height - this.height
    this.disToStart = 0
    this.rebuild()
  }

  getArgs() {
    return {
      width: { name: '宽度', value: this.width, type: 'input' },
      depth: { name: '深度', value: this.depth, type: 'input' },
      height: { name: '高度', value: this.height, type: 'input' },
      interval: { name: '间隙', value: this.interval, type: 'input' },
    }
  }
}
