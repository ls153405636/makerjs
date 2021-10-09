import { initProj } from '../init_temp'
import { BaseWidget } from './base'

export class Hole extends BaseWidget {
  constructor(vPB) {
    super()
    this.draw()
  }

  draw () {
    let container = new PIXI.Container()
    
    const graphics = new PIXI.Graphics();
    const path = [0, 0, 500, 0, 500, 500, 0, 500, 0, 0];
    graphics.lineStyle(10, 0x000000);
    graphics.beginFill(0x3500FA, 1);
    graphics.position.set(50, 50)
    graphics.drawPolygon(path);
    graphics.endFill();

    container.addChild(graphics)
    this.sprite = container
  }
  
}