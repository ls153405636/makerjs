import { D3Scene } from "./d3_scene"


export class BaseObj {
  constructor(vUuid) {
    this.obj = null
    this.uuid = vUuid
  }

  dispose() {}

  addToScene() {
    if (this.obj) {
      new D3Scene().addEle(this.obj)
    }
  }
}