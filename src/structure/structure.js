import { D2Config } from '../d2/config'
import { Types } from '../types/stair_v2'
import { StructConfig } from './config'

// const tempPages = {
//   hole: {
//     length:
//   }
// }

const FloorHeight = 2840

export class Structure {
  constructor() {
    if (!Structure.instance) {
      Structure.instance = this
      this.proj = null
      this.center = new THREE.Vector2(
        (D2Config.CANVAS_WIDTH * D2Config.SCREEN_RATE) / 2,
        (D2Config.CANVAS_HEIGHT * D2Config.SCREEN_RATE) / 2
      )
    }
    return Structure.instance
  }

  createProject() {
    let proj = new Types.Project()
    this.proj = proj
    proj.hole = this.createRectTHole()
    proj.walls = this.createWalls(proj.hole)
    this.createStair()
    return proj
  }

  // 矩形洞口
  createRectHole() {
    let center = this.center
    let edges = []
    let l = StructConfig.INIT_HOLE_LENGTH
    let w = StructConfig.INIT_HOLE_WIDTH
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    let hole = new Types.Hole({
      edges: edges,
      floorHeight: FloorHeight,
    })
    return hole
  }

  // 梯形洞口
  createRectTHole() {
    let center = this.center
    let edges = []
    let l = StructConfig.INIT_HOLE_LENGTH
    let w = StructConfig.INIT_HOLE_WIDTH
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    let hole = new Types.Hole({
      edges: edges,
      floorHeight: FloorHeight,
    })
    return hole
  }

  // 圆型洞口
  createRectCHole() {
    let center = new THREE.Vector2(
      (D2Config.CANVAS_WIDTH * D2Config.SCREEN_RATE) / 2,
      (D2Config.CANVAS_HEIGHT * D2Config.SCREEN_RATE) / 2
    )
    let edges = []
    let l = StructConfig.INIT_HOLE_LENGTH
    let w = StructConfig.INIT_HOLE_WIDTH
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x + l / 2, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    let hole = new Types.Hole({
      edges: edges,
    })
    return hole
  }

  // L型洞口
  createRectLHole() {
    let center = new THREE.Vector2(
      (D2Config.CANVAS_WIDTH * D2Config.SCREEN_RATE) / 2, //1920*10
      (D2Config.CANVAS_HEIGHT * D2Config.SCREEN_RATE) / 2 //937*10
    )
    let edges = []
    let l = StructConfig.INIT_HOLE_LENGTH // 4000
    let w = StructConfig.INIT_HOLE_WIDTH // 3000
    edges.push(
      new Types.Edge({
        // center.x = 9600 center.y 4685
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x + l / 2, y: center.y - w / 2 }),
        p2: new Types.Vector3({ x: center.x + l / 2, y: center.y }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x + l / 2, y: center.y }),
        p2: new Types.Vector3({ x: center.x, y: center.y }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x, y: center.y }),
        p2: new Types.Vector3({ x: center.x, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    edges.push(
      new Types.Edge({
        p1: new Types.Vector3({ x: center.x - l / 2, y: center.y + w / 2 }),
        p2: new Types.Vector3({ x: center.x - l / 2, y: center.y - w / 2 }),
        type: Types.EdgeType.estraight,
      })
    )
    let hole = new Types.Hole({
      edges: edges,
    })
    return hole
  }

  /**
   *
   * @param {Types.Hole} vHole
   */
  createWalls(vHole) {
    let walls = []
    let center = new THREE.Vector2(0, 0)
    for (const e of vHole.edges) {
      let p1 = new THREE.Vector2(e.p1.x, e.p1.y)
      let p2 = new THREE.Vector2(e.p2.x, e.p2.y)
      let vec = new THREE.Vector2().subVectors(p2, p1).normalize()
      //轮廓方向永远为2d平面（即y轴竖直向下的平面）的顺时针
      //转换到threejs的2d平面后，则变为逆时针
      //因此法线方向需顺时针旋转
      let norVec = vec
        .clone()
        .rotateAround(center, -Math.PI / 2)
        .normalize()
      let outP1 = new THREE.Vector2().addVectors(
        p1,
        norVec.clone().multiplyScalar(StructConfig.INIT_WALL_DEPTH)
      )
      let outP2 = new THREE.Vector2().addVectors(
        p2,
        norVec.clone().multiplyScalar(StructConfig.INIT_WALL_DEPTH)
      )
      let edge = new Types.Edge({
        p1: new Types.Vector3({ x: p1.x, y: p1.y }),
        p2: new Types.Vector3({ x: p2.x, y: p2.y }),
      })
      let outEdge = new Types.Edge({
        p1: new Types.Vector3({ x: outP1.x, y: outP1.y }),
        p2: new Types.Vector3({ x: outP2.x, y: outP2.y }),
      })
      walls.push(
        new Types.Wall({
          edge: edge,
          outEdge: outEdge,
          depth: StructConfig.INIT_WALL_DEPTH,
          type: Types.WallType.wboth,
          normal: new Types.Vector3({ x: norVec.x, y: norVec.y, z: norVec.z }),
        })
      )
    }

    for (let i = 1; i <= 4; i++) {
      this.createComponent(walls[i - 1], i + 1)
    }

    return walls
  }

  /**
   *
   * @param {Types.Wall} vWall
   * @param {*} vType
   */
  createComponent(vWall, vType) {
    let p1 = new THREE.Vector2(vWall.edge.p1.x, vWall.edge.p1.y)
    let p2 = new THREE.Vector2(vWall.edge.p2.x, vWall.edge.p2.y)
    let vec = new THREE.Vector2().subVectors(p2, p1)
    let nor = new THREE.Vector2(vWall.normal.x, vWall.normal.y)
    let middle = new THREE.Vector2().addVectors(p1, p2).multiplyScalar(1 / 2)
    let length = p1.distanceTo(p2)
    let component = new Types.Component({
      type: vType,
    })
    if (
      [
        Types.ComponentType.cdoor,
        Types.ComponentType.cdoor_hole,
        Types.ComponentType.cwindow,
      ].includes(vType)
    ) {
      component.width = 600
      component.height = 2000
      component.depth = vWall.depth
      component.disToStart = (length - component.width) / 2
      let position = middle.clone().addScaledVector(nor, vWall.depth / 2)
      component.position = new Types.Vector3({ x: position.x, y: position.y })
    } else if (vType === Types.ComponentType.cbeam) {
      component.width = length
      component.height = 300
      component.depth = 300
      component.offGround = vWall - component.height
      let position = middle
        .clone()
        .addScaledVector(nor.clone().negate(), component.depth / 2)
      component.position = new Types.Vector3({ x: position.x, y: position.y })
    } else if (vType === Types.ComponentType.cpillar) {
      component.width = 300
      component.depth = 300
      component.height = vWall.height
      component.disToStart = (length - component.width) / 2
      let position = middle
        .clone()
        .addScaledVector(nor.clone().negate(), component.depth / 2)
      component.position = new Types.Vector3({ x: position.x, y: position.y })
    }
    let angle = vec.angle()
    component.rotation = new Types.Vector3({ y: angle })
    vWall.components.push(component)
  }

  createStair(vArgs) {
    this.proj.stair = new Types.Stair({
      exitBeamDepth: 580,
      type: Types.StairType.sstright,
      againstWallType: Types.AgainstWallType.aw_no,
      treadParameters: new Types.TreadParameters({
        depth: 40,
        nossingType: Types.NossingType.nno,
      }),
    })
    this.createFlight()
  }

  createFlight(vArgs) {
    let flight = new Types.Flight({
      stepLength: 770,
      stepWidth: 240,
      stepNumRule: Types.StepNumRule.snr_n_add_1,
      stepNum: 14,
    })
    let hole = this.proj.hole
    let step_num = flight.stepNum + 1
    flight.step_height = Math.ceil(hole.floorHeight / step_num)
    let x_min = hole.edges[0].p1.x,
      x_max = hole.edges[0].p1.x,
      y_min = hole.edges[0].p1.y
    hole.edges.forEach((e) => {
      x_min = Math.min(x_min, e.p1.x, e.p2.x)
      y_min = Math.min(y_min, e.p1.y, e.p2.y)
      x_max = Math.max(x_max, e.p1.x, e.p2.x)
    })

    if (this.proj.stair.againstWallType === Types.AgainstWallType.aw_no) {
      x_min = this.center.x - flight.stepLength / 2
    } else if (
      this.proj.stair.againstWallType === Types.AgainstWallType.aw_right
    ) {
      x_min = x_max - flight.stepLength
    }

    for (let i = 0; i < flight.stepNum; i++) {
      let tread = new Types.Tread({})
      let edges = []
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({ x: x_min, y: y_min + flight.stepWidth * i }),
          p2: new Types.Vector3({
            x: x_min + flight.stepLength,
            y: y_min + flight.stepWidth * i,
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: x_min + flight.stepLength,
            y: y_min + flight.stepWidth * i,
          }),
          p2: new Types.Vector3({
            x: x_min + flight.stepLength,
            y: y_min + flight.stepWidth * (i + 1),
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: x_min + flight.stepLength,
            y: y_min + flight.stepWidth * (i + 1),
          }),
          p2: new Types.Vector3({
            x: x_min,
            y: y_min + flight.stepWidth * (i + 1),
          }),
          type: Types.EdgeType.estraight,
        })
      )
      edges.push(
        new Types.Edge({
          p1: new Types.Vector3({
            x: x_min,
            y: y_min + flight.stepWidth * (i + 1),
          }),
          p2: new Types.Vector3({ x: x_min, y: y_min + flight.stepWidth * i }),
          type: Types.EdgeType.estraight,
        })
      )
      tread.stepOutline = new Types.Outline({
        edges: edges,
      })
      flight.treads.push(tread)
    }

    flight.treads.reverse()
    this.proj.stair.flights.push(flight)
  }
}
