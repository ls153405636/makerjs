const { Types } = require("../types/stair_v2");
const { Config } = require("./config");

/**
 * 
 * @param {Types.Vector3} vRealCoord 
 */
function translateCoord (vRealCoord) {
  let screeCoord = new Types.Vector3()
  screeCoord.x = vRealCoord.x / Config.SCREEM_RATE
  screeCoord.y = vRealCoord.y / Config.SCREEM_RATE
}

function translateValue (vValue) {
  return vValue / Config.SCREEM_RATE
}

export default {
  translateCoord,
  translateValue
}