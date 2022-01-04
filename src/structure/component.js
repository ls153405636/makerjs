import { COMP_TYPES } from '../common/common_config'
import { D2Config } from '../d2/config'
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
    this.wallLength = Math.hypot(vParent.edge.p1.x - vParent.edge.p2.x, vParent.edge.p1.y - vParent.edge.p2.y)
    this.type = vType
    this.offGround = 0
    let angle = new Edge(this.parent.edge).getAngle()
    this.rotation = new Types.Vector3({ y: angle })
    this.interval = 0
    this.wallDepth = vParent.depth
    this.wallEndExtend = vParent.endExtend
  }

  addInfo() {
    // console.log(this)
    StructConfig.INFOS.set(this.uuid, this)
    this.parent.addComponent(this)
  }
  delInfo() {
    console.log(this)
    let compId = []
    let comp = []
    for(let value of D2Config.WIDGETS.values()) {
      if (value.getWidgetType() === COMP_TYPES.CEMENT_COMP) {
        compId.push(value.uuid)
        comp.push(value)
      }
    }
    for (let i = 0; i < compId.length; i++) {
      if(this.uuid === compId[i]) {
        comp[i].destroy()
      }
    }
    StructConfig.INFOS.delete(this.uuid)
    this.parent.delComponent(this)
  }

  computePosition() {
    let utilEdge = new Edge(this.parent.edge)
    let pos = utilEdge
      .getP1()
      .addScaledVector(utilEdge.getVec(), this.disToStart + this.width / 2)
    if ([4, 5].includes(this.type)) {
      pos.addScaledVector(
        utilEdge.getNormal().negate(),
        this.depth / 2 + this.interval
      )
    } else {
      pos.addScaledVector(utilEdge.getNormal(), this.depth / 2)
    }
    this.position = new Types.Vector3({ x: pos.x, y: pos.y })
    this.position.z = this.offGround + this.height / 2
  }

  rebuild() {
    this.updateItem()
    this.computePosition()
    this.updateCanvas()
  }
  
  updateItem(vValue, vKey, vSecondKey) {
    if (vKey === undefined) {
      if (this.wallEndExtend === 240) {
        this.disToEnd = new Edge(this.parent.edge).getLength() - 240 - this.disToStart - this.width
      }else {
        this.disToEnd = new Edge(this.parent.edge).getLength() - this.disToStart - this.width
      }
    }else{
      this.disToEnd = vValue
    }
    if (vKey === 'disToEnd') {
      this.disToEnd = vValue
      if (this.wallEndExtend === 240) {
        this.disToStart = new Edge(this.parent.edge).getLength()  - this.disToEnd - this.width - 240
      }else {
        this.disToStart = new Edge(this.parent.edge).getLength()  - this.disToEnd - this.width
      }
    } else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
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
      disToEnd: this.disToEnd,
      angle: this.angle,
      rotation: this.rotation,
      interval: this.interval,
      position: this.position,
      wallDepth: this.wallDepth,
      wallLength: this.wallLength
    })
  }
}

export class Inlay extends Component {
  constructor(vParent, vType) {
    super(vParent, vType)
    this.width = Default.INLAY_WIDTH
    this.height = Default.INLAY_HEIGHT
    this.depth = this.parent.depth
    this.offGround = 0
    if (this.wallEndExtend === 240) {
      this.disToStart = ((new Edge(this.parent.edge).getLength()-240 )- this.width) / 2
      this.disToEnd = new Edge(this.parent.edge).getLength() - 240 - this.disToStart - this.width
    }else {
      this.disToStart = (new Edge(this.parent.edge).getLength()- this.width) / 2
      this.disToEnd = new Edge(this.parent.edge).getLength() - this.disToStart - this.width
    }
    this.rebuild()
  }

  getArgs() {
    return {
      disToStart: {
        name: '距起点的距离',
        value: this.disToStart,
        type: 'input',
      },
      disToEnd: {
        name: '距终点的距离',
        value: this.disToEnd,
        type: 'input',
      },
      width: { name: '宽度', value: this.width, type: 'input' },
      height: { name: '高度', value: this.height, type: 'input' },
      offGround: { name: '离地高度', value: this.offGround, type: 'input',class: "is-required" }
    }
  }
}

export class Cloumn extends Component {
  constructor(vParent, vType) {
    super(vParent, vType)
    this.width = Default.CEMENT_SIZE
    this.height = this.parent.height
    this.depth = Default.CEMENT_SIZE
    this.offGround = this.parent.height - this.height
    if (this.wallEndExtend === 240) {
      this.disToStart = ((new Edge(this.parent.edge).getLength()-240 )- this.width) / 2
      this.disToEnd = new Edge(this.parent.edge).getLength() - 240 - this.disToStart - this.width
    }else {
      this.disToStart = (new Edge(this.parent.edge).getLength()- this.width) / 2
      this.disToEnd = new Edge(this.parent.edge).getLength() - this.disToStart - this.width
    }
    this.rebuild()
    
  }

  getArgs() {
    return {
      disToStart: {
        name: '距起点的距离',
        value: this.disToStart,
        type: 'input',
      },
      disToEnd: {
        name: '距终点的距离',
        value: this.disToEnd,
        type: 'input',
      },
      width: { name: '宽度', value: this.width, type: 'input' },
      height: { name: '高度', value: this.height, type: 'input' },
      depth: { name: '深度', value: this.depth, type: 'input' },
      offGround: { name: '离地高度', value: this.offGround, type: 'input',class: "is-required" },
      interval: { name: '与墙体间的间隙', value: this.interval, type: 'input' },
    }
  }
}

export class Beam extends Component {
  constructor(vParent, vType) {
    super(vParent, vType)
    this.parent = vParent
    if (this.wallEndExtend === 240) {
      this.width = new Edge(this.parent.edge).getLength() - 240
    }else {
      this.width = new Edge(this.parent.edge).getLength()
    }
    this.height = Default.CEMENT_SIZE
    this.depth = Default.CEMENT_SIZE
    this.offGround = this.parent.height - this.height
    this.disToStart = 0
    this.rebuild()
  }

  getArgs() {
    return {
      depth: { name: '宽度', value: this.depth, type: 'input' },
      height: { name: '厚度', value: this.height, type: 'input' },
      offGround: { name: '离地高度', value: this.offGround, type: 'input',class: "is-required" },
      interval: { name: '与墙体间的间隙', value: this.interval, type: 'input' },
    }
  }
}
