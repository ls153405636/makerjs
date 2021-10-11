import { Types } from "../types/stair_v2"
import { Config } from "./config"

/**
 * 
 * @param {Types.Vector3} vRealCoord 
 */
function translateCoord (vRealCoord) {
  let screenCoord = new Types.Vector3()
  screenCoord.x = vRealCoord.x / Config.SCREEN_RATE
  screenCoord.y = vRealCoord.y / Config.SCREEN_RATE
}

function translateValue (vValue) {
  return vValue / Config.SCREEN_RATE
}

export default {
  translateCoord,
  translateValue
}