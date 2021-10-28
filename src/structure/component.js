import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Default } from "./config";
import { Info } from "./info";


export class Component extends Info {
  static TYPE_MAP = new Map([
    [1, Inlay],
    [2, Inlay],
    [3, Inlay],
    [4, Cloumn],
    [5, Beam]
  ])
  constructor (vParent, vType) {
    super (vParent)
    this.type = vType
    this.offGround = 0
    this.disToStart = (this.parent.width - this.width) / 2
    let angle = new Edge(this.parent.edge).getAngle()
    this.rotation = new Types.rotation({y:angle})
    this.interval = 0
  }

  computePosition () {
    let utilEdge = new Edge(this.parent.edge)
    let pos = utilEdge.getP1().addScaledVector(utilEdge.getVec(), (this.disToStart + this.width / 2))
    if ([Types.ComponentType.cbeam, Types.ComponentType.cpillar].includes(this.type)) {
      pos.addScaledVector(utilEdge.getNormal().negate(), (this.parent.depth + this.depth) / 2)
    }
    this.position = new Types.Vector3({x:pos.x, y:pos.y})
  }

  rebuild () {
    this.computePosition()
    this.updateCanvas()
  }

  writePB () {
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
      interval: this.interval
    })
  }
}

export class Inlay extends Component {
  constructor (vParent, vType) {
    super(vParent, vType)
    this.width = Default.INLAY_WIDTH
    this.height = Default.INLAY_HEIGHT
    this.depth = this.parent.depth
    this.rebuild()
  }

  getArgs () {

  }
}

export class Cloumn extends Component {
  constructor (vParent, vType) {
    super(vParent, vType)
    this.width = Default.CEMENT_SIZE
    this.height = this.parent.height
    this.depth = Default.CEMENT_SIZE
    this.rebuild()
  }

  getArgs () {

  }
}

export class Beam extends Component {
  constructor (vParent, vType) {
    super(vParent, vType)
    this.width = new Edge(this.parent.edge).getLength()
    this.height = Default.CEMENT_SIZE
    this.depth = Default.CEMENT_SIZE
    this.offGround = this.parent.height - this.height
    this.disToStart = 0
    this.rebuild()
  }

  getArgs () {

  }

}