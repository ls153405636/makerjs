import earCut from 'earcut'
import { D3Config, D3Default, RENDER_ORDER } from '../d3_config';

export class Face {
  /**
   * @param {import('../obj_tool/xz_outline').XZOutline} vRoute 
   * @param {Array<import('../obj_tool/xz_outline').XZOutline>} vHoles
   */
  constructor(vRoute, vHoles = []) {
    this.route = vRoute
    this.holeRoutes = vHoles
    this.createObj()
  }

  createObj() {
    let pois = this.route.getPois()
    let cutFacePois = []
    for (const p of pois) {
      cutFacePois.push(p.x, p.z)
    }

    let poiIndexs = earCut(cutFacePois)
    let positionSet = []
    for (let i = 0; i < poiIndexs.length; i = i+3) {
      let a = poiIndexs[i], b = poiIndexs[i+1], c = poiIndexs[i+2]
      let p1 = pois[a], p2 = pois[b], p3 = pois[c]
      positionSet.push(
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z
      )
    }

    let positionAttr = new THREE.Float32BufferAttribute(positionSet, 3)
    let geo = new THREE.BufferGeometry()
    geo.setAttribute('position', positionAttr)
    this.obj = new THREE.Group()
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:D3Default.PANEL_COLOR, side:THREE.DoubleSide}))
    this.mesh.userData.d3Type = 'face'
    this.lineFrame = this.createLineFrame(this.route.isClose ? pois.concat([pois[0]]) : pois)
    this.obj.add(this.mesh, this.lineFrame)
  }

  createLineFrame (vPois) {
    let geo = new THREE.BufferGeometry().setFromPoints(vPois)
    let lineFrame = new THREE.Line(geo, D3Config.FRAME_MAT)
    lineFrame.renderOrder = RENDER_ORDER.FRAME
    return lineFrame
  }

  /**
   * 
   * @param {THREE.Material} vMaterila 
   */
  setLineMaterial (vMaterila) {
    this.lineFrame.material = vMaterila
  }

  getObj() {
    return this.obj
  }
}