import { Outline } from "../../common/common_tools/outline";
import { Types } from "../../types/stair_v2";


/**需继承自childWidget */
export class Handrail {
  /**
   * 
   * @param {Types.Handrail} vPB 
   */
  constructor (vPB) {
    let width = vPB.width
    let route = vPB.route
    /**pb里只保存了中线路径，通过中线路径向两侧分别偏移宽度的1/2
     * 可得到两侧的路径，用这两条路径可以绘制扶手
     * 偏移方法和调用模式如下
    */
    let inRoute = new Outline(route).offset(width/2, true)
    let outRoute = new Outline(route).offset(width/2, false)
  }

  draw () {

  }
}