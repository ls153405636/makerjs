// 比例换算
import { Types } from "../types/stair_v2"
import { D2Config } from "./config"

/**
 * 
 * @param {Types.Vector3} vRealCoord 
 */
function translateCoord (vRealCoord) {
  let screenCoord = new Types.Vector3()
  screenCoord.x = vRealCoord.x / D2Config.SCREEN_RATE
  screenCoord.y = vRealCoord.y / D2Config.SCREEN_RATE
  return screenCoord
}

function translateValue (vValue) {
  return vValue / D2Config.SCREEN_RATE
}

export default {
  translateCoord,
  translateValue
}