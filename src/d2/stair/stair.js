import { start } from 'xstate/lib/actions'
import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import d2_tool from '../d2_tool'
import { Flight } from './flight'

export class Stair extends BaseWidget {
  /**
   *
   * @param {Types.Stair} vPB
   */
  constructor(vPB) {
    super()
    this.flights = []
    for (const f of vPB.flights) {
      this.flights.push(new Flight(f))
    }
    this.position = d2_tool.translateCoord(vPB.position)
    this.draw()
  }

  draw() {
    this.sprite = new PIXI.Container()
    for (const f of this.flights) {
      let flightSprite = f.getSprite()
      if (flightSprite) {
        this.sprite.addChild(flightSprite)
      }
    }
    /** 需设置整体精灵图的位置*/
    this.sprite.position.set(this.position.x, this.position.y)
  }
}
