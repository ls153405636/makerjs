import { D3Config } from "./d3_config"
import { D3Scene } from "./d3_scene"


export class BaseModel {
  constructor(vUuid) {
    this.obj = null
    this.uuid = vUuid
    D3Config.MODELS.set(this.uuid, this)
  }

  dispose() {
    if (D3Config.SELECTED && D3Config.SELECTED.uuid === this.uuid) {
      D3Config.SELECTED = null
    }
    if (this.obj) {
      this.obj.traverse(item => {
        item.geometry && item.geometry.dispose()
        if (Array.isArray(item.material)) {
          for (var i = 0; i < item.material.length; i++) {
            // 纹理
            if (item.material[i]) {
              if (item.material[i].map) {
                item.material[i].map.dispose()
              }
              item.material[i].dispose()
            }
          }
        } else {
          if (item.material) {
            item.material.dispose()
            item.material.map != null && item.material.map.dispose()
          }
        }
      })
      this.obj.parent && this.obj.parent.remove(this.obj)
    }
    D3Config.MODELS.delete(this.uuid)
  }

  init() {}

  addToScene() {
    if (this.obj) {
      new D3Scene().addEle(this.obj)
    }
  }

  getObj() {
    return this.obj
  }

  update(vPB) {
    this.dispose()
    D3Config.MODELS.set(this.uuid, this)
    this.init(vPB)
    this.addToScene()
  }

  createObj() {}
}