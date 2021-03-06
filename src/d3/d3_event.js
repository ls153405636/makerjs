import { Command } from "../common/command"
import { COMP_TYPES } from "../common/common_config"
import { Core } from "../common/core"
import { D3Config } from "./d3_config"
import { D3Scene } from "./d3_scene"


export class D3Event {

  constructor() {
    if (!D3Event.instance) {
      this.dom = new D3Scene().renderer.domElement
      this.isMouseDown = false
      this.mouse = new THREE.Vector2()
      this.downMouse = new THREE.Vector2()
      this.raycaster = new THREE.Raycaster()
      this.isCtrlDown = false
      D3Event.instance = this
    }
    return D3Event.instance
  }

  dispatch() {
    this.dom.addEventListener('mousedown', D3Event.onMouseDown, false)
    this.dom.addEventListener('mousemove', D3Event.onMouseMove, false)
    this.dom.addEventListener('wheel', D3Event.onMouseWheel, false)
  }

  dispose() {
    
  }

  static onMouseDown(e) {
    new D3Event().isMouseDown = true
    window.addEventListener( 'mouseup', D3Event.onMouseUp, true)
    new D3Event().downMouse.x = ( e.clientX / innerWidth ) * 2 - 1
	  new D3Event().downMouse.y = - ( e.clientY / innerHeight ) * 2 + 1
  }

  static onMouseMove(e) {
    new D3Event().mouse.x = ( e.clientX / innerWidth ) * 2 - 1;
	  new D3Event().mouse.y = - ( e.clientY / innerHeight ) * 2 + 1;
    if (new D3Event().isMouseDown) {
      new D3Scene().render()
      return
    } else {
      new D3Event().isCtrlDown = e.ctrlKey
      new D3Event().raycaster.setFromCamera(new D3Event().mouse, new D3Scene().camera)
      let intersects = new D3Event().raycaster.intersectObjects( D3Config.OBJS, true )
      let model = new D3Event().getInterModel(intersects)
      new D3Event().switchHover(model)
    }
  }

  static onMouseWheel() {
    new D3Scene().render()
  }

  static onMouseUp(e) {
    new D3Event().isMouseDown = false
    window.removeEventListener('mouseup', D3Event.onMouseUp, true)
    let upMouse = new THREE.Vector2()
    upMouse.x = ( e.clientX / innerWidth ) * 2 - 1
	  upMouse.y = - ( e.clientY / innerHeight ) * 2 + 1
    if (upMouse.distanceTo(new D3Event().downMouse) < 0.00001) {
      new D3Event().isCtrlDown = e.ctrlKey
      new D3Event().raycaster.setFromCamera(upMouse, new D3Scene().camera)
      let intersects = new D3Event().raycaster.intersectObjects( D3Config.OBJS, true )
      let model = new D3Event().getInterModel(intersects)
      new D3Event().switchSelecte(model)
    }
  }



  getInterModel(vIntersects) {
    let obj = vIntersects[0]?.object
    if (!obj) {
      return null
    }
    while(obj && obj.userData.d3Type !== 'obj') {
      obj = obj.parent
    }
    let uuid = obj?.userData.uuid
    let model = D3Config.MODELS.get(uuid)
    if (!model) {
      return null
    }
    if (model.getCompType() === COMP_TYPES.RISER) {
      model = model.parent
    }
    if (model.getCompType() === COMP_TYPES.TREAD && (!this.isCtrlDown)) {
      model = model.parent
    }
    return model
  }

  switchHover(vModel) {
    if (vModel) {
      if (D3Config.SELECTED && D3Config.SELECTED.uuid === vModel.uuid) {
        return
      }
      if (D3Config.HOVER) {
        if (vModel.uuid !== D3Config.HOVER.uuid ) {
          D3Config.HOVER.setHover(false)
          D3Config.HOVER = vModel
          D3Config.HOVER.setHover(true)
          new D3Scene().render()
        }
      } else {
        D3Config.HOVER = vModel
        D3Config.HOVER.setHover(true)
        new D3Scene().render()
      }
    } else {
      if (D3Config.HOVER) {
        D3Config.HOVER.setHover(false)
        D3Config.HOVER = null
        new D3Scene().render()
      }
    }
  }

  switchSelecte(vModel) {
    let core = new Core()
    if (vModel) {
      if (D3Config.SELECTED && vModel.uuid === D3Config.SELECTED.uuid){
        return
      }
      core.execute(new Command(core.cmds.SelecteCmd, {uuid:vModel.uuid, type:vModel.getCompType()})) 
      if (D3Config.HOVER && D3Config.HOVER.uuid === vModel.uuid) {
        D3Config.HOVER = null
      }
    } else {
      if (D3Config.SELECTED) {
        core.execute(new Command(core.cmds.SelecteCmd, {uuid:null}))
      }
    }
  }


}