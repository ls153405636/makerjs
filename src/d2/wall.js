import { Types } from "../types/stair_v2";
import { BaseWidget } from "./base_widget";
import d2_tool from "./d2_tool";

export class Wall extends BaseWidget{
  /**
   * 
   * @param {Types.Wall} vPB 
   */
  constructor(vPB) {
    super()
    this.p1 = d2_tool.translateCoord(vPB.p1)
    this.p2 = d2_tool.translateCoord(vPB.p2)
    // this.outP1 = 
    // this.outP2 = 
    this.depth = d2_tool.translateCoord(vPB.depth)
    this.draw()
  }

  draw () {
    
  }

  addEvent () {
    this.sprite.interactive = true;
    this.sprite
    .on("mouseover", () => {

    })
    .on("mouseout", () => {
      
    });
  }
}