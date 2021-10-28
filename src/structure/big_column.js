import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import tool from './tool'

export class BigColumn extends ChildInfo {
  static POS_TYPE_OPTIONS = [
    { value: Types.BigColumnPosType.bcp_floor, label: '在地板上' },
    { value: Types.BigColumnPosType.bcp_first, label: '在第一级踏板上' },
    { value: Types.BigColumnPosType.bcp_second, label: '在第二级踏板上' },
  ]
  static SPEC_OPTIONS = [
    { value: '90*90*1200', label: '90*90*1200' },
    { value: '100*100*1200', label: '100*100*1200' },
    { value: '110*110*1200', label: '110*110*1200' },
    { value: '120*120*1200', label: '120*120*1200' },
    { value: '130*130*1200', label: '130*130*1200' },
    { value: '140*140*1200', label: '140*140*1200' },
    { value: '150*150*1200', label: '150*150*1200' },
  ]
  constructor(vParent, vPosition, vSize) {
    super(vParent)
    this.position = vPosition
    this.size = vSize
  }

  getArgs() {
    let bargs = this.parent.bigColParameters
    let f = tool.getItemFromOptions
    return {
      posType: {
        name: '位置类型',
        value: f(bargs.posType),
        type: 'selecte',
        options: BigColumn.POS_TYPE_OPTIONS,
      },
      specification: {
        name: '规格',
        value: f(bargs.specification),
        type: 'selecte',
        options: BigColumn.SPEC_OPTIONS,
      },
      model: { name: '型号', value: '', type: 'replace' },
      material: { name: '材质', value: '', type: 'replace' },
    }
  }

  writePB() {
    return new Types.BigColumn({
      uuid: this.uuid,
      position: this.position,
      size: this.size,
    })
  }
}
