import { Types } from "../../types/stair_v2";
import { BaseWidget } from "../base_widget";
import { D2Config } from "../config";
import d2_tool from "../d2_tool";
import { Flight } from "./flight";
import { SmallColumn } from "./small_column";

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
      this.flights.push(new Flight(f))
    }
    for (const col of vPB.smallColumns) {
      this.smallColumns.push(new SmallColumn(col))
    }
    this.position = d2_tool.translateCoord(vPB.position)
    this.draw()
  }

  draw () {
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
  }

  setSmallColSelected () {
    this.smallColumns.forEach(col => {
      col.setSelected()
    })
  }

  setSmallColHover () {
    this.smallColumns.forEach(col => {
      col.setHover()
    })
  }

}
