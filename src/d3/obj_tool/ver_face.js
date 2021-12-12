import { D3Config, Default, RENDER_ORDER } from "../d3_config";
import d3_tool from "../d3_tool";
import { XZOutline } from "./xz_outline";

export class VerFace {
  /**
   * 
   * @param {XZOutline} vBotRoute 
   * @param {*} vHeight 
   */
  constructor(vBotRoute, vHeight) {
    this.botRoute = vBotRoute
    this.height = vHeight
    this.obj = new THREE.Group()
    this.createObj()
  }

  createObj() {
    let pois = this.botRoute.getPois()
    let topPois = []
    for (const p of pois) {
      topPois.push(new THREE.Vector3(p.x, p.y + this.height, p.z))
    }
    let positionSet = []
    this.lineFrame = new THREE.Group()
    let i = 0;
    for ( ;i < pois.length - 1; i++) {
      let p1 = pois[i], p2 = pois[i+1]
      positionSet = positionSet.concat(this.createFaceSet(p1, p2))
      this.lineFrame.add(this.createLine(p1, topPois[i]))
    }
    if (this.botRoute.isClose) {
      positionSet = positionSet.concat(this.createFaceSet(pois[i], pois[0]))
    }
    let positionAttr = new THREE.Float32BufferAttribute(positionSet, 3)
    let geo = new THREE.BufferGeometry()
    geo.setAttribute('position', positionAttr)
    this.lineFrame.add(this.createLine(pois[i], topPois[i]))
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:Default.PANEL_COLOR, side:THREE.DoubleSide}))
    this.mesh.userData.d3Type = 'face'
    this.obj.add(this.mesh, this.lineFrame)
  }

  createLine(vBotPoi, vTopPoi) {
    let geo = new THREE.BufferGeometry().setFromPoints([vBotPoi, vTopPoi])
    let line = new THREE.Line(geo, D3Config.FRAME_MAT)
    line.renderOrder = RENDER_ORDER.FRAME
    return line
  }

  /**
   * 
   * @param {THREE.Material} vMaterila 
   */
   setLineMaterial (vMaterila) {
    this.lineFrame.traverse(c => {
      if (c.material) {
        c.material = vMaterila
      }
    })
  }


  createFaceSet(vP1, vP2) {
    return [
      vP1.x, vP1.y, vP1.z,
      vP2.x, vP2.y, vP2.z,
      vP1.x, vP1.y+this.height, vP1.z,

      vP1.x, vP1.y+this.height, vP1.z,
      vP2.x, vP2.y+this.height, vP2.z,
      vP2.x, vP2.y, vP2.z
    ]
  }

  getObj() {
    return this.obj
  }
}