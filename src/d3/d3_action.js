import { Types } from "../types/stair_v2"
import { D3Config } from "./d3_config"
import { Stair } from "./stair/d3_stair"


const MODEL_TYPES = {
  Stair: Stair,
}


export function createModel(vPB, vName) {
  let model = null
  if (MODEL_TYPES[vName]) {
    model = new MODEL_TYPES[vName](vPB).addToScene()
  }
  return model
}

export function clear() {
  for (const m of D3Config.MODELS.values()) {
    m.dispose()
  }
}

/**
 * 
 * @param {Types.Project} vPB 
 */
export function importProject(vPB) {
  /**添加洞口 */

  /**添加墙体 */

  vPB.stair && new Stair(vPB.stair).addToScene()
}

export default {
  createModel,
  clear,
  importProject,
}