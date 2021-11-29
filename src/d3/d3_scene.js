import { OrbitControls } from "./OrbitControls"

export class D3Scene {
  constructor() {
    if (!D3Scene.instance) {
      this.init()
      D3Scene.instance = this
      window.scene = this.scene
    }
    return D3Scene.instance
  }

  init() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color( '#f8f8f8' )

    this.renderer = new THREE.WebGLRenderer({antialias:true})
    this.renderer.setSize(innerWidth, innerHeight)

    this.camera = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 10, 200000)
    this.camera.position.set(1000, 1000, 1000)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.scene.add(this.camera)

    this.control = new OrbitControls(this.camera, this.renderer.domElement)

    this.grider = new THREE.GridHelper(20000, 200, 0xc1c2c3, 0xc1c2c3)
    this.scene.add(this.grider)
  }

  addToPage() {
    document.querySelector('#canvas').appendChild(this.renderer.domElement)
    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  addEle(vObj) {
    if (vObj) {
      this.scene.add(vObj)
    }
  }
}