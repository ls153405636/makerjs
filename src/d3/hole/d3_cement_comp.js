import { Types } from "../../types/stair_v2";
import { ChildModel } from "../d3_child_model";
import { D3Default } from "../d3_config";
import d3_tool from "../d3_tool";


export class CementComp extends ChildModel {
  constructor(vParent, vPB) {
    super(vParent, vPB.uuid)
    this.init(vPB)
  }

  /**
   *
   * @param {Types.Component} vPB
   * @memberof CementComp
   */
  init(vPB) {
    this.width = vPB.width
    this.depth = vPB.depth
    this.height = vPB.height
    this.position = d3_tool.translateCoord(vPB.position)
    this.angle = vPB.rotation.y
    this.createObj()
  }

  createObj() {
    this.obj = new THREE.Group()
    let geo = new THREE.BoxGeometry(this.width, this.height, this.depth)
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:D3Default.WALL_COLOR}))
    this.lineFrame = d3_tool.createFrameByGeo(geo)
    this.obj.add(this.mesh, this.lineFrame)
    this.obj.position.copy(this.position)
    this.obj.rotateY(-this.angle)
  }
}