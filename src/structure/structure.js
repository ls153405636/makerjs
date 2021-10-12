import { D2Config } from "../d2/config"
import { Types } from "../types/stair_v2"
import { StructConfig } from "./config"

export class Structure {
  constructor () {
    if (!Structure.instance) {
      Structure.instance = this
      this.proj = null
    }
    return Structure.instance
  }


  createProject () {
    let proj = new Types.Project()
    proj.hole = this.createRectHole()
    proj.walls = this.createWalls(proj.hole)
    this.proj = proj
    return proj
  }

  createRectHole () {
    let center = new THREE.Vector2(D2Config.CANVAS_WIDTH * D2Config.SCREEN_RATE / 2, D2Config.CANVAS_HEIGHT * D2Config.SCREEN_RATE / 2)
    let edges = []
    let l = StructConfig.INIT_HOLE_LENGTH
    let w = StructConfig.INIT_HOLE_WIDTH
    edges.push(new Types.Edge({
      p1: new Types.Vector3({x: center.x - l / 2, y: center.y - w / 2}),
      p2: new Types.Vector3({x: center.x + l / 2, y: center.y - w / 2}),
      type: Types.EdgeType.estraight
    }))
    edges.push(new Types.Edge({
      p1: new Types.Vector3({x: center.x + l / 2, y: center.y - w / 2}),
      p2: new Types.Vector3({x: center.x + l / 2, y: center.y + w / 2}),
      type: Types.EdgeType.estraight
    }))
    edges.push(new Types.Edge({
      p1: new Types.Vector3({x: center.x + l / 2, y: center.y + w / 2}),
      p2: new Types.Vector3({x: center.x - l / 2, y: center.y + w / 2}),
      type: Types.EdgeType.estraight
    }))
    edges.push(new Types.Edge({
      p1: new Types.Vector3({x: center.x - l / 2, y: center.y + w / 2}),
      p2: new Types.Vector3({x:center.x - l / 2, y: center.y - w / 2}),
      type: Types.EdgeType.estraight
    }))
    let hole = new Types.Hole({
      edges: edges
    })
    return hole
  }

  createxxxxHole() {

  }

  createxxxxHole() {
    
  }

  /**
   * 
   * @param {Types.Hole} vHole 
   */
  createWalls (vHole) {
    let walls = []
    let center = new THREE.Vector2(0, 0)
    for (const e of vHole.edges) {
      let p1 = new THREE.Vector2(e.p1.x, e.p1.y)
      let p2 = new THREE.Vector2(e.p2.x, e.p2.y)
      let vec = new THREE.Vector2().subVectors(p2, p1).normalize()
      let norVec = vec.clone().rotateAround(center, -Math.PI/2).normalize()
      let outP1 = new THREE.Vector2().addVectors(p1, norVec.clone().multiplyScalar(StructConfig.INIT_WALL_DEPTH))
      let outP2 = new THREE.Vector2().addVectors(p2, norVec.clone().multiplyScalar(StructConfig.INIT_WALL_DEPTH))
      walls.push(new Types.Wall({
        p1: new Types.Vector3({x:p1.x, y:p1.y}),
        p2: new Types.Vector3({x:p2.x, y:p2.y}),
        outP1: new Types.Vector3({x:outP1.x, y:outP1.y}),
        outP2: new Types.Vector3({x:outP2.x, y:outP2.y}),
        depth: StructConfig.INIT_WALL_DEPTH,
        type: Types.WallType.wboth
      }))
    }
    return walls
  }

  

}