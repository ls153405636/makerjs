import { Types } from "../../types/stair_v2";
import { ChildModel } from "../d3_child_model";
import { D3Config, Default } from "../d3_config";
import d3_tool from "../d3_tool";


export class SmallColumn extends ChildModel {
  /**
   *Creates an instance of SmallColumn.
   * @param {*} vParent
   * @param {Types.SmallColumn} vPB
   * @param {Types.SmallColParameters} vParas
   * @memberof SmallColumn
   */
  constructor(vParent, vPB, vParas) {
    super(vParent, vPB.uuid)
    this.paras = vParas
    this.size = d3_tool.translateCoord(vPB.size)
    this.position = d3_tool.translateCoord(vPB.position)
    this.createObj()
  }

  createObj() {
    this.obj = new THREE.Group()
    let geo = new THREE.CylinderBufferGeometry(this.size.x / 2, this.size.x / 2, this.size.y, 10)
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:Default.PANEL_COLOR}))
    let lineGeo = new THREE.EdgesGeometry(geo)
    //lineGeo = new THREE.LineSegmentsGeometry().fromEdgesGeometry(lineGeo)
    this.lineFrame = new THREE.LineSegments(lineGeo, D3Config.FRAME_MAT)
    this.obj.add(this.mesh, this.lineFrame)
    this.obj.position.set(this.position.x, this.position.y + this.size.y / 2, this.position.z)
  }
}