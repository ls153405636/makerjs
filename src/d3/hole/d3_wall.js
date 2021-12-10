import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { BaseModel } from "../d3_base_model";
import d3_tool from "../d3_tool";


export class Wall extends BaseModel {
  constructor (vPB) {
    super(vPB.uuid)
  }

  /**
   * 
   * @param {Types.Wall} vPB 
   */
  init(vPB) {
    this.type = vPB.type
    let utilE = new Edge(vPB.edge)
    this.width = utilE.getLength()
    this.depth = vPB.depth
    this.height = vPB.height
    this.position = d3_tool.translateCoord(utilE.getCenter())
    this.position.y = this.height / 2
    utilE.offset(this.depth / 2)
    if (this.type === Types.WallType.wsecond) {
      this.position.y += this.height
    } else if (this.type === Types.WallType.wboth) {
      this.position.y = this.height
    }
    this.angle = utilE.getAngle()
    if (this.type !== Types.WallType.wnone) {
      this.createObj()
    }
  }

  createObj() {

  }
} 