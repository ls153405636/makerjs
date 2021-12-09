import { Default } from "../d3_config";
import { XZOutline } from "./XZOutline";

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
    let lines = new THREE.Group()
    let i = 0;
    for ( ;i < pois.length - 1; i++) {
      let p1 = pois[i], p2 = pois[i+1]
      positionSet = positionSet.concat(this.createFaceSet(p1, p2))
      lines.add(this.createLine(p1, topPois[i]))
    }
    if (this.botRoute.isClose) {
      positionSet = positionSet.concat(this.createFaceSet(pois[i], pois[0]))
    }
    let positionAttr = new THREE.Float32BufferAttribute(positionSet, 3)
    let geo = new THREE.BufferGeometry()
    geo.setAttribute('position', positionAttr)
    lines.add(this.createLine(pois[i], topPois[i]))
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:Default.PANEL_COLOR, side:THREE.DoubleSide}))
    this.mesh.userData.d3Type = 'face'
    this.obj.add(this.mesh, lines)
  }

  createLine(vBotPoi, vTopPoi) {
    let geo = new THREE.BufferGeometry().setFromPoints([vBotPoi, vTopPoi])
    return new THREE.Line(geo, new THREE.MeshBasicMaterial({color:Default.lINE_COLOR}))
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