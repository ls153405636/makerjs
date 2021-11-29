import { Types } from "../../types/stair_v2";
import { Outline } from "../../utils/outline";
import d3_tool from "../d3_tool";


export class XZOutline extends Outline{
  /**
   * 
   * @param {Types.Outline} vOutline 
   */
  constructor(vOutline) {
    super(vOutline)
  }

  getPois() {
    let xyPois = super.getPois()
    let pois = []
    for (const p of xyPois) {
      pois.push(d3_tool.translateCoord(p))
    }
    return pois
  }
}