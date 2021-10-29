import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import tool from './tool'

export class SmallColumn extends ChildInfo {
  static ARRANGR_RULE_OPTIONS = [
    { value: Types.ArrangeRule.arrThree, label: '两跑三根' },
    { value: Types.ArrangeRule.arrFour, label: '两跑四根' },
  ]
  static SPEC_OPTIONS = [
    { value: '48*48*850', label: '48*48*850' },
    { value: '48*48*950', label: '48*48*950' },
    { value: '48*48*1050', label: '48*48*1050' },
    { value: '48*48*1150', label: '48*48*1150' },
    { value: '58*58*850', label: '58*58*850' },
    { value: '58*58*950', label: '58*58*950' },
    { value: '58*58*1050', label: '58*58*1050' },
    { value: '58*58*1150', label: '58*58*1150' },
    { value: '68*68*850', label: '68*68*850' },
    { value: '68*68*950', label: '68*68*950' },
    { value: '68*68*1050', label: '68*68*1050' },
    { value: '68*68*1150', label: '68*68*1150' },
  ]
  constructor(vParent, vPosition, vSize) {
    super(vParent)
    this.position = vPosition
    this.size = vSize
  }

  getArgs() {
    let sargs = this.parent.smallColParameters
    let specOptions = []
    let height = 0
    for (const item of SmallColumn.SPEC_OPTIONS) {
      let size = tool.parseSpecification(item.value, 'xyz')
      if (size.z > this.size.z) {
        if (height) {
          if (height === size.z) {
            specOptions.push(item)
          } else if (size.z < height) {
            height = size.z
            specOptions = [item]
          }
        } else if (!height) {
          height = size.z
          specOptions = [item]
        }
      }
    }
    let f = tool.getItemFromOptions
    return {
      arrangeRule: {
        name: '排列规则',
        value: f(sargs.arrangeRule, SmallColumn.ARRANGR_RULE_OPTIONS),
        type: 'select',
        options: SmallColumn.ARRANGR_RULE_OPTIONS,
      },
      specification: {
        name: '规格',
        value: f(sargs.specification, specOptions),
        type: 'select',
        options: specOptions,
      },
      model: { name: '型号', value: '', type: 'replace' },
      material: { name: '材质', value: '', type: 'replace' },
    }
  }

  writePB() {
    return new Types.SmallColumn({
      uuid: this.uuid,
      position: this.position,
      size: this.size,
    })
  }
}
