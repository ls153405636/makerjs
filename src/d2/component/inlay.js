import { Types } from "../../types/stair_v2";
import { BaseWidget } from "../base_widget";


/**
 * 门窗门洞，内嵌入墙体的结构部件
 */
export class Inlay extends BaseWidget {
  /**
   * 
   * @param {Types.Component} vPB 
   */
  constructor (vPB) {
    super()
    this.type = vPB.type
    this.draw()
  }

  /**
   * 建议方法，根据宽深属性绘制矩形，然后设置位置和角度
   */
  draw () {
    console.log('画门窗门洞')
  }

  addEvent() {}
}