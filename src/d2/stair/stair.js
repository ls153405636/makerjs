import { start } from 'xstate/lib/actions'
import { Types } from '../../types/stair_v2'
import { BaseWidget } from '../base_widget'
import { D2Config } from '../config'
import d2_tool from '../d2_tool'
import { Flight } from './flight'
import { SmallColumn } from './small_column'

export class Stair extends BaseWidget {
  /**
   *
   * @param {Types.Stair} vPB
   */
  constructor(vPB) {
    super()
    D2Config.CUR_STAIR = this
    this.flights = []
    this.smallColumns = []
    for (const f of vPB.flights) {
      this.flights.push(new Flight(f, this))
    }
    for (const col of vPB.smallColumns) {
      this.smallColumns.push(new SmallColumn(col, this))
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
    for (const col of this.smallColumns) {
      let colSprite = col.getSprite()
      if (colSprite) {
        this.sprite.addChild(colSprite)
      }
    }
    /** 需设置整体精灵图的位置*/
    this.sprite.position.set(this.position.x, this.position.y)
  }

  setSelected() {
    this.smallColumns.forEach((col) => {
      col.setSelected()
    })
  }
  cancelSelected() {
    console.log(11)
    this.smallColumns.forEach((col) => {
      col.cancelSelected()
    })
  }

  setHover() {
    this.smallColumns.forEach((col) => {
      col.setHover()
    })
  }
  cancelHover() {
    this.smallColumns.forEach((col) => {
      col.cancelHover()
    })
  }
}
