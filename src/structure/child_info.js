import { Info } from "./info";


export class ChildInfo extends Info {
  constructor (vParent) {
    super(vParent)
    this.isUpdateParent = false
  }

  update (vArgs) {
    if (this.isUpdateParent) {
      this.parent.update(vArgs)
      this.isUpdateParent = false
    } else {
      this.rebuild()
    }
  }
}