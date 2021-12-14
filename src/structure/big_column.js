import { Types } from '../types/stair_v2'
import { ChildInfo } from './child_info'
import { Default } from './config'
import tool from './tool'

export class BigColumn extends ChildInfo {
  static POS_TYPE_OPTIONS = [
    { value: Types.BigColumnPosType.bcp_floor, label: '在地板上' },
    { value: Types.BigColumnPosType.bcp_first, label: '在第一级踏板上' },
    { value: Types.BigColumnPosType.bcp_second, label: '在第二级踏板上' },
  ]
  static SPEC_OPTIONS = [
    { value: '90*90', label: '90*90' },
    { value: '100*100', label: '100*100' },
    { value: '110*110', label: '110*110' },
    { value: '120*120', label: '120*120' },
    { value: '130*130', label: '130*130' },
    { value: '140*140', label: '140*140' },
    { value: '150*150', label: '150*150' },
  ]
  constructor({vParent, vPosition, vType, vPosName='', vHeight}) {
    super(vParent)
    this.type = vType
    if (this.type !== Types.BigColumnType.bc_start) {
      this.paras = new Types.BigColParameters({
        specification: Default.BIG_COL_SPEC
      })
    } else {
      this.paras = this.parent.bigColParameters
    }
    this.posName = vPosName
    this.rebuildByParent(vPosition, vHeight)
  }

  addInfo () {
    this.parent.addBigCol(this, this.posName)
  }

  delInfo () {
    this.parent.addBigCol(null, this.posName)
  }

  rebuildByParent (vPosition, vHeight = 1200) {
    this.position = vPosition
    this.size = tool.parseSpecification(this.paras.specification)
    this.size.z = vHeight
  }

  rebuild () {
    this.size = tool.parseSpecification(this.paras.specification)
    super.rebuild()
  }

  getArgs() {
    //let bargs = this.parent.bigColParameters
    let f = tool.getItemFromOptions
    let args = {
      specification: {
        name: '规格',
        value: f(this.paras.specification, BigColumn.SPEC_OPTIONS),
        type: 'select',
        options: BigColumn.SPEC_OPTIONS,
      },
      source: { name: '型号', value: '', type: 'replace' },
      material: { name: '材质', value: '', type: 'replace' },
    }
    if (this.type === Types.BigColumnType.bc_start && this.parent?.startFlight == null) {
      args.posType = {
        name: '位置类型',
        value: f(this.paras.posType, BigColumn.POS_TYPE_OPTIONS),
        type: 'select',
        options: BigColumn.POS_TYPE_OPTIONS,
      }
    }
    args.name = '大柱参数'
    if (this.type === Types.BigColumnType.bc_start) {
      args.name = '起步大柱参数'
    } else if (this.type === Types.BigColumnType.bc_support) {
      args.name = '支撑柱参数'
    }
    return args
  }


  update (vArgItems) {
    if (this.type === Types.BigColumnType.bc_start) {
      super.updateParent(vArgItems, 'bigColParameters')
    } else {
      super.update(vArgItems)
    }
  }

  updateItem (vValue, vKey, vSecondKey) {
    if (this.paras[vKey]) {
      this.paras[vKey] = vValue
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
