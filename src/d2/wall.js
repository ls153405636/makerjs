// import { Graphics } from "../../public/pixi/pixi";
import { initProj } from '../init_temp'
import { Types } from "../types/stair_v2";
import { BaseWidget } from "./base_widget";
import d2_tool from './d2_tool';


export class Wall extends BaseWidget{
  /**
   * 
   * @param {Types.Wall} vPB 
   */
  constructor(vPB) {
    super()
    this.p1 = d2_tool.translateCoord(vPB.p1)
    this.p2 = d2_tool.translateCoord(vPB.p2)
    // console.log(this.p1,this.p2)
    this.outP1 = d2_tool.translateCoord(vPB.outP1)
    this.outP2 = d2_tool.translateCoord(vPB.outP2)
    this.depth = d2_tool.translateValue(vPB.depth)
    this.draw()
    this.addEvent()
  }

  // 墙体绘制
  draw () {
    let wall = new PIXI.Graphics();
    wall.lineStyle(1,0x000000)
    wall.beginFill(0xffffff, 1);
    const path = [this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.outP2.x,this.outP2.y, this.outP1.x, this.outP1.y];
    wall.drawPolygon(path);
    wall.endFill();
    this.sprite = wall
  }
  // 绑定事件
  addEvent () {
    this.sprite.interactive = true;
    this.sprite
    .on("mouseover", () => {
      console.log("1")
    })
    .on("mouseout", () => {
      
    });
  }
}