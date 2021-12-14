import { Types } from '../types/stair_v2'
import { Default } from './config'
import { Info } from './info'
import tool from './tool'
import { Wall } from './wall'

class Hole extends Info {
  constructor(vParent) {
    super(vParent)
    this.floorHeight = ''
  }
}

export class RectHole extends Hole {
  constructor(vParent) {
    super(vParent)
    this.length = Default.HOLE_LENGTH
    this.width = Default.HOLE_WIDTH
    this.rebuild()
  }

  rebuild() {
    let center = this.parent.center
    this.ori = new Types.Vector3({
      x: center.x - this.length / 2,
      y: center.y - this.width / 2,
    })
    this.outline = tool.createRectOutline(this.ori, this.length, this.width)
    this.walls = []
    this.updateCanvas('RectHole')
    this.createWalls()
  }

  getArgs() {
    return {
      length: { name: '长', value: this.length, type: 'input' },
      width: { name: '宽', value: this.width, type: 'input' },
      floorHeight: { name: '层高', value: this.floorHeight, type: 'input', autofocus: this.floorHeight === '' || this.floorHeight === '' ? true : false, class: "is-required"  },
    }
  }

  createWalls() {
    for (const e of this.outline.edges) {
      let wall = new Wall(this, e)
      this.walls.push(wall)
    }
  }

  writePB() {
    return new Types.Hole({
      uuid: this.uuid,
      edges: this.outline.edges,
    })
  }

  getEdgeByPos (vPosType) {
    if (vPosType === 'bot') {
      return new Types.Edge(this.outline.edges[2]) 
    } else if (vPosType === 'top') {
      return new Types.Edge(this.outline.edges[0])
    } else if (vPosType === 'left') {
      return new Types.Edge(this.outline.edges[3])
    } else if (vPosType === 'right') {
      return new Types.Edge(this.outline.edges[1])
    }
  }
}

export class LHole extends Hole {
  constructor(vParent, vArgs) {
    super(vParent, vArgs)
    this.topLength = Default.L_HOLE_T_LENGTH
    this.topWidth = Default.L_HOLE_T_WIDTH
    this.botLength = Default.L_HOLE_B_LENGTH
    this.botWidth = Default.L_HOLE_B_WIDTH
    this.direction = 1
    this.rebuild()
  }

  rebuild() {
    let center = this.parent.center
    this.ori = new Types.Vector3({
      x: center.x - this.botLength / 2,
      y: center.y - (this.topWidth + this.botWidth) / 2,
    })

    this.outline = new Types.Outline()
    let edges = []

    if (this.direction == 1) {
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({ x: this.ori.x, y: this.ori.y }),
          p2: new Types.Vector3({
            x: this.ori.x + this.topLength,
            y: this.ori.y,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + this.topLength,
            y: this.ori.y,
          }),
          p2: new Types.Vector3({
            x: this.ori.x + this.topLength,
            y: this.ori.y + this.topWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + this.topLength,
            y: this.ori.y + this.topWidth,
          }),
          p2: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y + this.topWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y + this.topWidth,
          }),
          p2: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          p2: new Types.Vector3({
            x: this.ori.x,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          p2: new Types.Vector3({ x: this.ori.x, y: this.ori.y }),
          type: Types.EdgeType.estraight,
        })
      )
    } else {
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + (this.botLength - this.topLength),
            y: this.ori.y,
          }),
          p2: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y,
          }),
          p2: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + this.botLength,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          p2: new Types.Vector3({
            x: this.ori.x,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x,
            y: this.ori.y + this.topWidth + this.botWidth,
          }),
          p2: new Types.Vector3({
            x: this.ori.x,
            y: this.ori.y + this.topWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x,
            y: this.ori.y + this.topWidth,
          }),
          p2: new Types.Vector3({
            x: this.ori.x + (this.botLength - this.topLength),
            y: this.ori.y + this.topWidth,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: this.ori.x + (this.botLength - this.topLength),
            y: this.ori.y + this.topWidth,
          }),
          p2: new Types.Vector3({
            x: this.ori.x + (this.botLength - this.topLength),
            y: this.ori.y,
          }),
          type: Types.EdgeType.estraight,
        })
      )
    }

    this.outline.edges = edges

    this.walls = []
    this.updateCanvas('LHole')
    this.createWalls()
  }

  getArgs() {
    return {
      direction: {
        name: '对齐方向',
        options: {
          0: { value: 1, label: '左' },
          1: { value: 2, label: '右' },
        },
        value: { value: this.direction, label: '左' },
        type: 'select',
      },
      topLength: { name: '上边长', value: this.topLength, type: 'input' },
      topWidth: { name: '上边宽', value: this.topWidth, type: 'input' },
      botLength: { name: '下边长', value: this.botLength, type: 'input' },
      botWidth: { name: '下边宽', value: this.botWidth, type: 'input' },
      floorHeight: { name: '层高', value: this.floorHeight, type: 'input' },
    }
  }

  createWalls() {
    for (const e of this.outline.edges) {
      let wall = new Wall(this, e)
      this.walls.push(wall)
    }
  }

  writePB() {
    return new Types.Hole({
      uuid: this.uuid,
      edges: this.outline.edges,
    })
  }
}

export class TrapeHole extends Hole {
  constructor(vParent, vArgs) {
    super(vParent, vArgs)
  }
}
