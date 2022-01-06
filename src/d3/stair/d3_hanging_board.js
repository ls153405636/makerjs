import { Default } from "../../structure/config";
import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { ChildModel } from "../d3_child_model";
import { D3Default } from "../d3_config";
import d3_tool from "../d3_tool";


export class HangingBoard extends ChildModel {
  constructor(vParent, vPB) {
    super(vParent, vPB.uuid)
    this.init(vPB)
  }

  /**
   *
   *
   * @param {Types.HangingBoard} vPB
   * @memberof HangingBoard
   */
  init(vPB) {
    this.width = vPB.width
    this.height = vPB.height
    this.depth = vPB.depth
    this.angle = new THREE.Vector2(vPB.widthVec.x, vPB.widthVec.y).angle()
    let position = new Edge().setByVec(vPB.position, vPB.widthVec, this.width/2).p2
    position = new Edge().setByVec(position, vPB.depthVec, this.depth/2).p2
    this.position = d3_tool.translateCoord(position)
    this.position.y -= this.height/2
    this.createObj()
  }

  createObj() {
    let geo = new THREE.BoxGeometry(this.width, this.height, this.depth)
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:D3Default.PANEL_COLOR}))
    d3_tool.loadMaterial(Default.MATERIAL.path, this.mesh)
    this.lineFrame = d3_tool.createFrameByGeo(geo)
    this.obj = new THREE.Group()
    this.obj.add(this.mesh, this.lineFrame)
    this.obj.position.copy(this.position)
    this.obj.rotateY(-this.angle)
  }
}