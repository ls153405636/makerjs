import { start } from 'xstate/lib/actions'
import { Types } from "../../types/stair_v2";
import { BaseWidget } from "../base_widget";
import { D2Config } from "../config";
import d2_tool from "../d2_tool";
import { BigColumn } from './big_column';
import { ChildWidget } from './child_widget';
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
    this.bigColumns = []
    for (const f of vPB.flights) {
      this.flights.push(new Flight(f))
    }
    for (const col of vPB.smallColumns) {
      this.smallColumns.push(new SmallColumn(col))
    }
    for (const col of vPB.bigColumns) {
      this.bigColumns.push(new BigColumn(col))
    }
    this.position = d2_tool.translateCoord(vPB.position)
    this.draw()
  }

  draw() {
    this.sprite = new PIXI.Container()
    this.addSprites(this.flights)
    this.addSprites(this.smallColumns)
    this.addSprites(this.bigColumns)
    /** 需设置整体精灵图的位置*/
    this.sprite.position.set(this.position.x, this.position.y)
  }

  /**
   * 将附属组件的精灵图添加到容器中
   * @param {Array<ChildWidget>} vItems 
   */
  addSprites (vItems) {
    for (const item of vItems) {
      let itemSprite = item.getSprite()
      if (itemSprite) {
        this.sprite.addChild(itemSprite)
      }
    }
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
