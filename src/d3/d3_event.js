import { D3Scene } from "./d3_scene"


export class D3Event {
  constructor() {
    if (!D3Event.instance) {
      this.dom = new D3Scene().renderer.domElement
      this.isMouseDown = false
      D3Event.instance = this
    }
    return D3Event.instance
  }

  dispatch() {
    this.dom.addEventListener('mousedown', D3Event.onMouseDown, false)
    this.dom.addEventListener('mousemove', D3Event.onMouseMove, false)
    this.dom.addEventListener('wheel', D3Event.onMouseWheel, false)
  }

  static onMouseDown() {
    this.isMouseDown = true
    window.addEventListener( 'mouseup', D3Event.onMouseUp, true)
  }

  static onMouseMove() {
    if (this.isMouseDown) {
      new D3Scene().render()
    }
  }

  static onMouseWheel() {
    new D3Scene().render()
  }

  static onMouseUp() {
    this.isMouseDown = false
    window.removeEventListener('mouseup', D3Event.onMouseUp, true)
  }

}