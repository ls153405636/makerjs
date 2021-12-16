import { Types } from "../types/stair_v2"
import { D3Config, RENDER_ORDER } from "./d3_config"

/**
 * 
 * @param {Types.Vector3} vPBCoord 
 */
function translateCoord (vPBCoord) {
  let y = vPBCoord.z
  let z = vPBCoord.y
  return new THREE.Vector3(vPBCoord.x, y, z)
}

/**
 *
 *
 * @param {Array<THREE.Vector3>} vPois
 * @returns
 */
function createFrameByPois(vPois, vMat = D3Config.FRAME_MAT) {
  let geo = new THREE.BufferGeometry().setFromPoints(vPois)
  let line = new THREE.Line(geo, vMat)
  line.renderOrder = RENDER_ORDER.FRAME
  return line
}

function createFrameByGeo(vGeo, vMat = D3Config.FRAME_MAT) {
  let lineGeo = new THREE.EdgesGeometry(vGeo)
  let lineFrame = new THREE.LineSegments(lineGeo, vMat)
  lineFrame.renderOrder = RENDER_ORDER.FRAME
  return lineFrame
}

export default {
  translateCoord,
  createFrameByPois,
  createFrameByGeo
}