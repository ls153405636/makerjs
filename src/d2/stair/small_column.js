import { Types } from "../../types/stair_v2";
import { BaseWidget } from "../base_widget";
import { D2Config } from "../config";


export class SmallColumn extends BaseWidget {
  /**
   * 
   * @param {Types.SmallColumn} vPB 
   */
  constructor (vPB) {
    this.draw()
  }

  draw () {}

  addToStage () {}

  /**
   * 获取当前组件的精灵图
   * 注意，类里的所有属性，如果外界需要调用，全部使用get函数来实现
   * 外界不能直接访问类里的属性
   * @returns 
   */
  getSprite () {
    return this.sprite
  }

  addEvent () {
    /**需实现的效果，点击任意一个小柱，均为选中整套楼梯的所有小柱 
     * 可通过如下方式实现
    */
    //D2Config.CUR_STAIR.setSmallColSelected()
    //D2Config.CUR_STAIR.setSmallColHover()
  }
}