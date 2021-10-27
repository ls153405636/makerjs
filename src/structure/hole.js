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
    this.walls = []
    this.rebuild()
  }

  rebuild () {
    let center = this.parent.center
    this.ori = new Types.Vector3({
      x: center.x - this.length / 2,
      y: center.y - this.width / 2
    })
    this.outline = tool.createRectOutline(this.ori, this.length, this.width)
    this.createWalls()
    this.updateCanvas()
  }

  update (vArgs) {
    if (vArgs.length?.value) {
      this.length = vArgs.length.value
    }
    if (vArgs.width?.value) {
      this.width = vArgs.width.value
    }
    if (vArgs.floorHeight?.value) {
      this.floorHeight = vArgs.floorHeight.value
    }
    this.walls = []
  }

  getArgs () {
    return {
      width: {name: '宽', value: 4000, type: 'input'},
      height: {name: '高', value: 3000, type: 'input'}
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