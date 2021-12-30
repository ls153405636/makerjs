import { COMP_TYPES } from "../../common/common_config";
import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { BaseModel } from "../d3_base_model";
import { D3Default } from "../d3_config";
import d3_tool from "../d3_tool";
import { CementComp } from "./d3_cement_comp";
import { Inlay } from "./d3_inlay";


export class Wall extends BaseModel {
  constructor (vPB) {
    super(vPB.uuid)
    this.init(vPB)
  }

  /**
   * 
   * @param {Types.Wall} vPB 
   */
  init(vPB) {
    this.type = vPB.type
    let utilE = new Edge(vPB.edge)
    this.width = utilE.getLength()
    this.depth = vPB.depth
    this.height = vPB.height
    this.position = d3_tool.translateCoord(new Edge(vPB.outEdge).getP1PB())
    this.type = vPB.type
    if (this.type === Types.WallType.wsecond) {
      this.position.y += this.height
    }
    this.angle = utilE.getAngle()
    /**@type {Array<Inlay>} */
    this.inlays = []
    this.cemectComps = []
    for (const c of vPB.components) {
      if ([Types.ComponentType.cdoor, Types.ComponentType.cwindow, Types.ComponentType.cdoor_hole].includes(c.type)) {
        this.inlays.push(new Inlay(this, c))
      } else {
        this.cemectComps.push(new CementComp(this, c))
      }
    }
    if (this.type !== Types.WallType.wnone) {
      this.createObj()
    }
  }

  createObj() {
    this.obj = new THREE.Group()
    this.lineFrame = new THREE.Group()
    let shape = new THREE.Shape()
    let height = this.type === Types.WallType.wboth ? this.height * 2 : this.height
    shape.moveTo(0, 0)
    shape.lineTo(0, height)
    shape.lineTo(this.width, height)
    shape.lineTo(this.width, 0)
    shape.lineTo(0, 0)

    let boxGeo = new THREE.BoxBufferGeometry(this.width, height, this.depth)
    boxGeo.translate(this.width/2, height/2, this.depth/2)
    let lineFrame = d3_tool.createFrameByGeo(boxGeo)
    this.lineFrame.add(lineFrame)

    for (const inlay of this.inlays) {
      let path = new THREE.Path()
      path.moveTo(inlay.disToStart, inlay.offGround)
      path.lineTo(inlay.disToStart, inlay.offGround + inlay.height)
      path.lineTo(inlay.disToStart + inlay.width, inlay.offGround + inlay.height)
      path.lineTo(inlay.disToStart + inlay.width, inlay.offGround)
      path.lineTo(inlay.disToStart, inlay.offGround)
      shape.holes.push(path)

      let iBoxGeo = new THREE.BoxGeometry(inlay.width, inlay.height, this.depth)
      iBoxGeo.translate(inlay.disToStart + inlay.width/2, inlay.offGround + inlay.height/2, this.depth/2)
      let iLineFrame = d3_tool.createFrameByGeo(iBoxGeo)
      this.lineFrame.add(iLineFrame)
    }

    let extrudeSettings = {
      steps: 1,
      depth: this.depth,
    };
    
    let geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings )
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color:D3Default.WALL_COLOR, side:THREE.DoubleSide,  transparent: true, opacity: 0}))
    this.obj.add(this.mesh, this.lineFrame)
    this.obj.position.copy(this.position)
    this.obj.rotateY(-this.angle)
  }

  getCompType() {
    return COMP_TYPES.WALL
  }

  addToScene() {
    super.addToScene()
    for (const c of this.inlays.concat(this.cemectComps)) {
      c.addToScene()
    }
  }
} 