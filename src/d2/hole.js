// 绘制洞口
import { initProj } from '../init_temp'
import { Types } from '../types/stair_v2'
import { BaseWidget } from './base_widget'
import { D2Config } from './config'

export class Hole extends BaseWidget {
  /**
   * 
   * @param {Types.Hole} vPB 
   */
  constructor(vPB) {
    super()
    this.edges = vPB.edges
    this.draw()
  }

  draw () {
    let container = new PIXI.Container()
    
    let path = []
    for (let i = 0; i < this.edges.length; i++) {
      let e = this.edges[i]
      path.push(e.p1.x / D2Config.SCREEN_RATE, e.p1.y / D2Config.SCREEN_RATE)
    }
    const graphics = new PIXI.Graphics();
    //const path = [0, 0, 500, 0, 500, 500, 0, 500, 0, 0];
    // graphics.lineStyle(10, 0x000000);
    graphics.beginFill(0x3500FA, 1);
    graphics.drawPolygon(path);
    graphics.endFill();


    container.addChild(graphics)
    this.sprite = container
  }
}