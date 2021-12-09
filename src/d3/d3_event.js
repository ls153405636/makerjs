import { D3Config } from "./d3_config"
import { D3Scene } from "./d3_scene"


export class D3Event {

  constructor() {
    if (!D3Event.instance) {
      this.dom = new D3Scene().renderer.domElement
      this.isMouseDown = false
      this.mouse = new THREE.Vector2()
      this.raycaster = new THREE.Raycaster()
      D3Event.instance = this
    }
    return D3Event.instance
  }

  static onMouseDown() {
    new D3Event().isMouseDown = true
    window.addEventListener( 'mouseup', D3Event.onMouseUp, true)
  }

  static onMouseMove(e) {
    new D3Event().mouse.x = ( e.clientX / innerWidth ) * 2 - 1;
	  new D3Event().mouse.y = - ( e.clientY / innerHeight ) * 2 + 1;
    if (new D3Event().isMouseDown) {
      new D3Scene().render()
      return
    } else {
      new D3Event().raycaster.setFromCamera(new D3Event().mouse, new D3Scene().camera)
      let intersects = new D3Event().raycaster.intersectObjects( D3Config.OBJS, true )
      let model = new D3Event().getInterModel(intersects)
      model && model.setHover()
    }
  }

  static onMouseWheel() {
    new D3Scene().render()
  }

  static onMouseUp() {
    new D3Event().isMouseDown = false
    window.removeEventListener('mouseup', D3Event.onMouseUp, true)
  }

  getInterModel(vIntersects) {
    let obj = vIntersects[0]?.object
    if (!obj) {
      return null
    }
    while(obj?.userData.d3Type !== 'obj') {
      obj = obj.parent
    }
    let uuid = obj?.userData.uuid
    let model = D3Config.MODELS.get(uuid)
    return model
  }

  dispatch() {
    this.dom.addEventListener('mousedown', D3Event.onMouseDown, false)
    this.dom.addEventListener('mousemove', D3Event.onMouseMove, false)
    this.dom.addEventListener('wheel', D3Event.onMouseWheel, false)
  }

  dispose() {
    
  }

}