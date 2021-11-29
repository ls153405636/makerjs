import { Types } from "../types/stair_v2"

/**
 * 
 * @param {Types.Vector3} vPBCoord 
 */
function translateCoord (vPBCoord) {
  let y = vPBCoord.z
  let z = vPBCoord.y
  return new THREE.Vector3(vPBCoord.x, y, z)
}

export default {
  translateCoord
}