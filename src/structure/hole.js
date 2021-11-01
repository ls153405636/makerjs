import { Types } from "../types/stair_v2";
import { Default } from "./config";
import { Info } from "./info";
import tool from "./tool";
import { Wall } from "./wall";

export class RectHole extends Info {
  constructor (vParent) {
    super (vParent)
    this.length = Default.HOLE_LENGTH
    this.width = Default.HOLE_WIDTH
    this.floorHeight = Default.FLOOR_HEIGHT
    this.rebuild()
  }

  rebuild () {
    let center = this.parent.center
    this.ori = new Types.Vector3({
      x: center.x - this.length / 2,
      y: center.y - this.width / 2
    })
    this.outline = tool.createRectOutline(this.ori, this.length, this.width)
    this.walls = []
    this.updateCanvas('RectHole')
    this.createWalls()
  }

  getArgs () {
    return {
      length: {name: '长', value: this.length, type: 'input'},
      width: {name: '宽', value: this.width, type: 'input'},
      floorHeight: {name: '层高', value: this.floorHeight, type: 'input'},
    }
  }

  createWalls () {
    for (const e of this.outline.edges) {
      let wall = new Wall(this, e)
      this.walls.push(wall)
    }
  }

  writePB () {
    return new Types.Hole({
      uuid: this.uuid,
      edges: this.outline.edges,
    })
  }
}

export class LHole extends RectHole {
  constructor (vParent, vArgs) {
    super(vParent, vArgs)
  }
}

export class TrapeHole extends RectHole {
  constructor (vParent, vArgs) {
    super(vParent, vArgs)
  }
}