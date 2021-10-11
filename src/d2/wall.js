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
    console.log(this.p1,this.p2)
    // this.outP1 = 
    // this.outP2 = 
    this.depth = d2_tool.translateValue(vPB.depth)
    this.draw()
  }

  draw () {
    // let line = new PIXI.Graphics();
    // line.lineStyle(this.depth, 0xFFFFFF, 1);
    // line.moveTo(this.p1.x, this.p1.y);
    // line.lineTo(this.p2.x, this.p2.y);
    // line.x = 300;
    // line.y = 300;

    let wall = new PIXI.Graphics();

    // wall.lineStyle(50,0xffffff)
    wall.beginFill(0xffffff);
    const path = [this.p1.x, this.p1.y,this.p2.x , this.p2.y,this.p2.x, this.p2.y - this.depth,this.p1.x, this.p1.y - this.depth,this.p1.x, this.p1.y];
    // const path = [this.p1.x, this.p1.y,this.p2.x, this.p2.y]
    wall.position.set(100,100)
    wall.drawPolygon(path);
    wall.endFill();
    
    this.sprite = wall
  }

  // addEvent () {
  //   this.sprite.interactive = true;
  //   this.sprite
  //   .on("mousedown", () => {

  //   })
  //   .on("mouseout", () => {
      
  //   });
  // }
}