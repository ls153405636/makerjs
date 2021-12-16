// 比例换算
import Victor from "victor"
import { Types } from "../types/stair_v2"
import { Edge } from "../utils/edge"
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
function translateEdges (vEdges) {
  let newEdges = new Types.Edge({
    p1: new Types.Vector3({ x: vEdges.p1.x / D2Config.SCREEN_RATE, y: vEdges.p1.y / D2Config.SCREEN_RATE, z: vEdges.p1.z / D2Config.SCREEN_RATE}),
    p2: new Types.Vector3({ x: vEdges.p2.x / D2Config.SCREEN_RATE, y: vEdges.p2.y / D2Config.SCREEN_RATE, z: vEdges.p2.z / D2Config.SCREEN_RATE }),
    type: vEdges.type,
  })
  return newEdges
}

export default {
  translateCoord,
  translateValue,
  translateEdges
}