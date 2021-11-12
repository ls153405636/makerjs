import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import tool from './tool'

export class Handrail extends ChildInfo {
  constructor(vParent, vRoute) {
    super(vParent)
    this.rebuildByParent(vRoute)
  }

  rebuildByParent(vRoute) {
    this.route = vRoute
    this.paras = this.parent.handrailParameters
    this.width = tool.parseSpecification(this.paras.source.specification,'yxz').x
  }

  getArgs() {
    let targs = this.parent.handrailParameters
    return {
      height: { name: '高度', value: targs.height, type: 'input' },
      model: { name: '规格', value: '', type: 'replace' },
      material: { name: '材质', value: '', type: 'replace' },
    }
  }

  update(vArgItems) {
    super.updateParent(vArgItems, 'handrailParameters')
  }

  writePB() {
    let pb = new Types.Handrail({
      uuid: this.uuid,
      route: this.route,
      width: this.width,
    })
    return pb
  }
}
