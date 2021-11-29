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

export default {
  createModel
}