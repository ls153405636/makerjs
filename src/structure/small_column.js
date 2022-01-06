import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import tool from './tool'

export class SmallColumn extends ChildInfo {
  static ARRANGR_RULE_OPTIONS = [
    { value: Types.ArrangeRule.arrThree, label: '两级三根' },
    { value: Types.ArrangeRule.arrFour, label: '两级四根' },
    { value: Types.ArrangeRule.arrTwo, label: '一级一根'}
  ]
  //弧形梯内侧外弧规则
  static IN_ARRANGR_RULE_OPTIONS = [
    { value: Types.ArrangeRule.arrFour, label: '一级两根' },
    { value: Types.ArrangeRule.arrSix, label: '一级三根' },
    { value: Types.ArrangeRule.arrEight, label: '一级四根' },
  ]
  //弧形梯外侧内弧规则
  static OUT_ARRANGR_RULE_OPTIONS = [
    { value: Types.ArrangeRule.arrHalf, label: '两级一根' },
    { value: Types.ArrangeRule.arrTwo, label: '一级一根'}
  ]
  static SPEC_OPTIONS = [
    { value: '48*48', label: '48*48' },
    { value: '58*58', label: '58*58' },
    { value: '68*68', label: '68*68' },
  ]
  constructor(vParent, vPosition, vSize, vRotation) {
    super(vParent)
    this.position = vPosition
    this.size = vSize
    this.rotation = vRotation || new Types.Vector3()
  }

  getArgs() {
    let sargs = this.parent.smallColParameters
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
        value: f(sargs.specification, SmallColumn.SPEC_OPTIONS),
        type: 'select',
        options: SmallColumn.SPEC_OPTIONS,
      },
      model: { name: '型号', value: '', type: 'replace' },
      material: { name: '材质', value: '', type: 'replace' },
    }
  }

  update (vArgItems) {
    console.log(vArgItems)
    super.updateParent(vArgItems, 'smallColParameters')
  }

  writePB() {
    return new Types.SmallColumn({
      uuid: this.uuid,
      position: this.position,
      size: this.size,
      rotation: this.rotation
    })
  }
}
