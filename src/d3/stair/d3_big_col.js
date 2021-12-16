import { ChildModel } from "../d3_child_model";
import {D3Default } from "../d3_config";
import d3_tool from "../d3_tool";

export class BigColumn extends ChildModel {
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
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:D3Default.PANEL_COLOR}))
    this.lineFrame = d3_tool.createFrameByGeo(geo)
    this.obj.add(this.mesh, this.lineFrame)
    this.obj.position.set(this.position.x, this.position.y + this.size.y / 2, this.position.z)
  }
}