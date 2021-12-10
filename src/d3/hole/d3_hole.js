import { StructConfig } from "../../structure/config";
import { Types } from "../../types/stair_v2";
import { BaseModel } from "../d3_base_model";


export class Hole extends BaseModel {
  /**
   * 
   * @param {Types.Hole} vPB 
   */
  constructor(vPB) {
    super(vPB.uuid)
  }

  /**
   * 
   * @param {Types.Hole} vPB 
   */
  init(vPB) {
    let holeInfo = StructConfig.INFOS.get(vPB.uuid)
    let edges = [...vPB.edges]
    for (let i = 0; i < holeInfo.walls.length; i++) {
      let w = holeInfo.walls[i]
      if ([Types.WallType.wnone, Types.WallType.wfirst].includes(w.type)) {
        
      }
    }
  }
}