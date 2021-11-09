import { Info } from "./info";


export class ChildInfo extends Info {
  constructor (vParent) {
    super(vParent)
  }

  /**
   * 当父级更新时，所有子部件随之更新，则调用此函数
   */
  rebuildByParent () {}

  rebuild () {
    this.parent.rebuild()
  }

  updateParent (vArgItems, vKey1) {
    let value = vArgItems
    let pArgeItems = new Map()
    pArgeItems.set(vKey1, value)
    this.parent.update(pArgeItems)
  }
}