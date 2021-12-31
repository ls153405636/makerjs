import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Types } from '../types/stair_v2'

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
    this.camera.position.set(20000, 20000, 6000)
    this.camera.lookAt(new THREE.Vector3(10000, 10000, 0))
    this.scene.add(this.camera)

    this.control = new OrbitControls(this.camera, this.renderer.domElement)

    this.grider = new THREE.GridHelper(20000, 20, 0xc1c2c3, 0xc1c2c3)
    this.scene.add(this.grider)

    this.axes = new THREE.AxesHelper(20000)
    this.scene.add(this.axes)

    this.initLight()
  }

  addToPage() {
    document.querySelector('#scene').appendChild(this.renderer.domElement)
    this.render()
  }

  /**
   *
   * @param {Types.Vector3} vSize
   * @param {Types.Vector3} vCenter
   * @memberof D3Scene
   */
  resetCamera(vSize, vCenter) {
    this.camera.position.set(vCenter.x + vSize.x*2, vCenter.y + vSize.y*2, vCenter.z + vSize.z*2)
    this.camera.lookAt(new THREE.Vector3(vCenter.x, vCenter.y, vCenter.z))
    this.control.target = new THREE.Vector3(vCenter.x, vCenter.y, vCenter.z)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  initLight() {
    let pointColor = 0xffffff
    let lightStrength = [0.72, 0.60, 0.48, 0.36]
    let topColor = 0xffffff

    let lights = new THREE.Group()

    const directLight0 = new THREE.DirectionalLight( pointColor, lightStrength[0] )
    directLight0.position.set( 60000, 0, 60000 )
    lights.add( directLight0 )

    const directLight1 = new THREE.DirectionalLight( pointColor, lightStrength[1] )
    directLight1.position.set( 0, 0, 60000 )
    lights.add( directLight1 )

    const directLight2 = new THREE.DirectionalLight( pointColor, lightStrength[2] )
    directLight2.position.set( -60000, 0, 60000 )
    lights.add( directLight2 )

    const directLight3 = new THREE.DirectionalLight( pointColor, lightStrength[3] )
    directLight3.position.set( -60000, 0, 0 )
    lights.add( directLight3 )

    const directLight4 = new THREE.DirectionalLight( pointColor, lightStrength[0] )
    directLight4.position.set( -60000, 0, -60000 )
    lights.add( directLight4 )

    const directLight5 = new THREE.DirectionalLight( pointColor, lightStrength[1] )
    directLight5.position.set( 0, 0, -60000 )
    lights.add( directLight5 )

    const directLight6 = new THREE.DirectionalLight( pointColor, lightStrength[2] )
    directLight6.position.set( 60000, 0, -60000 )
    lights.add( directLight6 )

    const directLight7 = new THREE.DirectionalLight( pointColor, lightStrength[3] )
    directLight7.position.set( 60000, 0, 0 )
    lights.add( directLight7 )

    const directLight8 = new THREE.DirectionalLight( topColor, 1.0 )
    directLight8.position.set( 0, 10000, 0 )
    lights.add( directLight8 )

    const directLight9 = new THREE.DirectionalLight( topColor, 1.0 )
    directLight9.position.set( 0, -10000, 0 )
    lights.add( directLight9 )

    this.scene.add(lights)
  }

  addEle(vObj) {
    if (vObj) {
      this.scene.add(vObj)
    }
  }
}