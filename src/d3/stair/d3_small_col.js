import { ChildModel } from "../d3_child_model";
import d3_tool from "../d3_tool";


export class SmallColumn extends ChildModel {
  constructor({vParent, vPB, vParas, vGltf}) {
    super(vParent, vPB.uuid)
    this.paras = vParas
    this.size = d3_tool.translateCoord(vPB.size)
    this.position = d3_tool.translateCoord(vPB.position)
    this.createObj(vGltf)
  }

  createObj(vGltf) {
    //this.obj = new THREE.Group()
    vGltf.traverse(c => {
      if (c.geometry) {
        c.geometry.center()
      }
      c.position.set(0, 0, 0)
    })
    let box = new THREE.Box3().expandByObject(vGltf)
    let gltfSize = box.getSize(new THREE.Vector3())
    let scale = new THREE.Vector3(this.size.x/gltfSize.x, this.size.y/gltfSize.y, this.size.z/gltfSize.z)
    vGltf.scale.copy(scale)
    this.obj = vGltf
    this.obj.position.set(this.position.x, this.position.y + this.size.y / 2, this.position.z)
    this.parent.addColumnObj(this.obj)
  }
}