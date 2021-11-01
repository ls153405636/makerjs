import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";


export class Handrail extends ChildInfo {
  constructor(vParent, vRoute, vWidth) {
    super (vParent)
    this.rebuild(vRoute, vWidth)
  }

  rebuild (vRoute, vWidth) {
    this.route = vRoute
    this.width = vWidth
  }

  getArgs () {
    let targs = this.parent.handrailParameters
    return {
      height: {name:'高度', value:targs.height, type:'input'},
      model: {name:'规格', value:'', type:'replace'},
      material: {name:'材质', value:'', type:'replace'}
    }
  }

  update (vArgItems) {
    super.update(vArgItems, 'handrailParameters')
  }

  writePB () {
    let pb = new Types.Handrail({
      uuid: this.uuid,
      route: this.route,
      width: this.width
    })
    return pb
  }
}