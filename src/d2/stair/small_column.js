import { Types } from "../../types/stair_v2";
import { D2Config } from "../config";
import { ChildWidget } from "./child_widget";


export class SmallColumn extends ChildWidget {
  /**
   * 
   * @param {Types.SmallColumn} vPB 
   */
  constructor (vPB) {
    super()
    this.draw()
  }

  draw () {}

  addEvent () {
    /**需实现的效果，点击任意一个小柱，均为选中整套楼梯的所有小柱 
     * 可通过如下方式实现
    */
    //D2Config.CUR_STAIR.setSmallColSelected()
    //D2Config.CUR_STAIR.setSmallColHover()
  }
}