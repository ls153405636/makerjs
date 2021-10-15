import { Types } from "../../types/stair_v2";
import { BaseWidget } from "../base_widget";

/**
 * 梁、柱，房间中的水泥结构部件
 */
export class CementComp extends BaseWidget {
  /**
   * 
   * @param {Types.Component} vPB 
   */
  constructor (vPB) {
    super()
    this.type = vPB.type
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */
  draw () {

  }

  addEvent () {

  }
}