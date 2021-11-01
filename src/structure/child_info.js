import { Info } from "./info";


export class ChildInfo extends Info {
  constructor (vParent) {
    super(vParent)
    this.isUpdateParent = false
  }

  update (vArgItems, vKey1) {
    let value = vArgItems
    let pArgeItems = new Map()
    pArgeItems.set(vKey1, value)
    this.parent.update(pArgeItems)
  }
}