import { D2Config } from '../d2/config'
import { Types } from '../types/stair_v2'
import { ArcStair } from './arc_stair'
import { BigUTypeStair } from './b_u_type_stair'
import { StructConfig } from './config'
import { RectHole } from './hole'
import { LHole } from './hole'
import { LTypeStair } from './l_type_stair'
import { StraightStair } from './straight_stair'
import { SmallUTypeStair } from './s_u_type_stair'

const FloorHeight = 2840

export class Structure {
  constructor() {
    if (!Structure.instance) {
      Structure.instance = this
      this.proj = null
      StructConfig.CENTER = this.center = new THREE.Vector2(
        (D2Config.CANVAS_WIDTH * D2Config.SCREEN_RATE) / 2,
        (D2Config.CANVAS_HEIGHT * D2Config.SCREEN_RATE) / 2
      )
    }
    return Structure.instance
  }

  initHole(vType) {
    if (vType === 'rect') {
      this.hole = new RectHole(this)
    }
    if (vType === 'L') {
      this.hole = new LHole(this)
    }
    return this
  }

  initStair({type = Types.StairType.sstright,againstWall,floadSide = Types.Side.si_right}) {
    if (type === Types.StairType.sstright) {
      this.stair = new StraightStair(this, againstWall)
      //this.stair.addStartFlight()
    }
    if (type === Types.StairType.sl_type) {
      this.stair = new LTypeStair(this, againstWall, floadSide)
      //this.stair.addStartFlight()
    }
    if (type === Types.StairType.s_small_u_type) {
      this.stair = new SmallUTypeStair(this, againstWall, floadSide)
      //this.stair.addStartFlight()
    }
    if (type === Types.StairType.s_big_u_type) {
      this.stair = new BigUTypeStair(this, againstWall, floadSide)
      //this.stair.addStartFlight()
    }
    if (type === Types.StairType.s_arc_type) {
      this.stair = new ArcStair(this, againstWall, floadSide)
    }
    return this
  }

  createProject() {
    let proj = new Types.Project()
    if (this.hole) {
      proj.hole = this.hole.writePB()
      for (const w of this.hole.walls) {
        proj.walls.push(w.writePB())
      }
    }
    if (this.stair) {
      proj.stair = this.stair.writePB()
    }
    return proj
  }

  // createProject() {
  //   let proj = new Types.Project()
  //   this.proj = proj
  //   StructConfig.CUR_PROJ = this.proj
  //   proj.hole = this.createRectHole()
  //   proj.walls = this.createWalls(proj.hole)
  //   //this.createStair()
  //   return proj
  // }

  // ????????????
  // createRectHole() {
  //   let center = this.center
  //   let edges = []
  //   let l = StructConfig.INIT_HOLE_LENGTH
  //   let w = StructConfig.INIT_HOLE_WIDTH
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   let hole = new Types.Hole({
  //     edges: edges,
  //     floorHeight: FloorHeight,
  //   })
  //   return hole
  // }

  // // ????????????
  // createRectTHole() {
  //   let center = this.center
  //   let edges = []
  //   let l = StructConfig.INIT_HOLE_LENGTH
  //   let w = StructConfig.INIT_HOLE_WIDTH
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   let hole = new Types.Hole({
  //     edges: edges,
  //     floorHeight: FloorHeight,
  //   })
  //   return hole
  // }

  // // ????????????
  // createRectCHole() {
  //   let center = new THREE.Vector2(
  //     (D2Config.CANVAS_WIDTH * D2Config.SCREEN_RATE) / 2,
  //     (D2Config.CANVAS_HEIGHT * D2Config.SCREEN_RATE) / 2
  //   )
  //   let edges = []
  //   let l = StructConfig.INIT_HOLE_LENGTH
  //   let w = StructConfig.INIT_HOLE_WIDTH
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   let hole = new Types.Hole({
  //     edges: edges,
  //   })
  //   return hole
  // }

  // // L?????????
  // createRectLHole() {
  //   let center = new THREE.Vector2(
  //     (D2Config.CANVAS_WIDTH * D2Config.SCREEN_RATE) / 2, //1920*10
  //     (D2Config.CANVAS_HEIGHT * D2Config.SCREEN_RATE) / 2 //937*10
  //   )
  //   let edges = []
  //   let l = StructConfig.INIT_HOLE_LENGTH // 4000
  //   let w = StructConfig.INIT_HOLE_WIDTH // 3000
  //   edges.push(
  //     new Types.Edge({
  //       // center.x = 9600 center.y 4685
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
  //       p2: new Types.Vector3({ x: center.x + l / 2, y: center.y }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x + l / 2, y: center.y }),
  //       p2: new Types.Vector3({ x: center.x, y: center.y }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x, y: center.y }),
  //       p2: new Types.Vector3({ x: center.x, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   edges.push(
  //     new Types.Edge({
  //       p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
  //       p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
  //       type: Types.EdgeType.estraight,
  //     })
  //   )
  //   let hole = new Types.Hole({
  //     edges: edges,
  //   })
  //   return hole
  // }

  // /**
  //  *
  //  * @param {Types.Hole} vHole
  //  */
  // createWalls(vHole) {
  //   let walls = []
  //   let center = new THREE.Vector2(0, 0)
  //   let i = 0
  //   for (const e of vHole.edges) {
  //     i++
  //     let p1 = new THREE.Vector2(e.p1.x, e.p1.y)
  //     let p2 = new THREE.Vector2(e.p2.x, e.p2.y)
  //     let vec = new THREE.Vector2().subVectors(p2, p1).normalize()
  //     //?????????????????????2d????????????y???????????????????????????????????????
  //     //?????????threejs???2d??????????????????????????????
  //     //????????????????????????????????????
  //     let norVec = vec
  //       .clone()
  //       .rotateAround(center, -Math.PI / 2)
  //       .normalize()
  //     let outP1 = new THREE.Vector2().addVectors(
  //       p1,
  //       norVec.clone().multiplyScalar(StructConfig.INIT_WALL_DEPTH)
  //     )
  //     let outP2 = new THREE.Vector2().addVectors(
  //       p2,
  //       norVec.clone().multiplyScalar(StructConfig.INIT_WALL_DEPTH)
  //     )
  //     let edge = new Types.Edge({
  //       p1: new Types.Vector3({ x: p1.x, y: p1.y }),
  //       p2: new Types.Vector3({ x: p2.x, y: p2.y }),
  //     })
  //     let outEdge = new Types.Edge({
  //       p1: new Types.Vector3({ x: outP1.x, y: outP1.y }),
  //       p2: new Types.Vector3({ x: outP2.x, y: outP2.y }),
  //     })
  //     walls.push(
  //       new Types.Wall({
  //         edge: edge,
  //         outEdge: outEdge,
  //         depth: StructConfig.INIT_WALL_DEPTH,
  //         type: i, //
  //         normal: new Types.Vector3({ x: norVec.x, y: norVec.y, z: norVec.z }),
  //       })
  //     )
  //   }

  //   for (let i = 1; i <= 4; i++) {
  //     this.createComponent(walls[i - 1], i + 1)
  //   }

  //   return walls
  // }

  // /**
  //  *
  //  * @param {Types.Wall} vWall
  //  * @param {*} vType
  //  */
  // createComponent(vWall, vType) {
  //   let p1 = new THREE.Vector2(vWall.edge.p1.x, vWall.edge.p1.y)
  //   let p2 = new THREE.Vector2(vWall.edge.p2.x, vWall.edge.p2.y)
  //   let vec = new THREE.Vector2().subVectors(p2, p1)
  //   let nor = new THREE.Vector2(vWall.normal.x, vWall.normal.y)
  //   let middle = new THREE.Vector2().addVectors(p1, p2).multiplyScalar(1 / 2)
  //   let length = p1.distanceTo(p2)
  //   let component = new Types.Component({
  //     type: vType,
  //   })
  //   if (
  //     [
  //       Types.ComponentType.cdoor,
  //       Types.ComponentType.cdoor_hole,
  //       Types.ComponentType.cwindow,
  //     ].includes(vType)
  //   ) {
  //     component.width = 600
  //     component.height = 2000
  //     component.depth = vWall.depth
  //     component.disToStart = (length - component.width) / 2
  //     let position = middle.clone().addScaledVector(nor, vWall.depth / 2)
  //     component.position = new Types.Vector3({ x: position.x, y: position.y })
  //   } else if (vType === Types.ComponentType.cbeam) {
  //     component.width = length
  //     component.height = 300
  //     component.depth = 300
  //     component.offGround = vWall - component.height
  //     let position = middle
  //       .clone()
  //       .addScaledVector(nor.clone().negate(), component.depth / 2)
  //     component.position = new Types.Vector3({ x: position.x, y: position.y })
  //   } else if (vType === Types.ComponentType.cpillar) {
  //     component.width = 300
  //     component.depth = 300
  //     component.height = vWall.height
  //     component.disToStart = (length - component.width) / 2
  //     let position = middle
  //       .clone()
  //       .addScaledVector(nor.clone().negate(), component.depth / 2)
  //     component.position = new Types.Vector3({ x: position.x, y: position.y })
  //   }
  //   let angle = vec.angle()
  //   component.rotation = new Types.Vector3({ y: angle })
  //   vWall.components.push(component)
  // }

  // createStair() {
  //   this.stair = new Stair({})
  //   this.proj.stair = this.stair.writePB()
  // }
}
