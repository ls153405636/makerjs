import { v4 } from 'uuid'
import { CUR_DATA } from '../common/common_config'
import { D2Config } from '../d2/config'
import d2_action from '../d2/d2_action'
import { StructConfig } from './config'

export class Info {
  /**
   *
   * @param {Info} vParent
   */
  constructor(vParent) {
    this.uuid = v4()
    this.parent = vParent
    this.isUpdate2D = true
    this.isUpdate3D = true
    StructConfig.INFOS.set(this.uuid, this)
  }

  addInfo() {}

  delInfo() {}

  rebuild() {}

  /**
   * 
   * @param {Map} vArgItems 
   */
  update(vArgItems) {
    for (const [key1, value1] of vArgItems) {
      if (this[key1] == undefined) {
        continue
      }
      if (value1 instanceof Map) {
        let curInfo = this[key1]
        for (const [key2, value2] of value1) {
          if (curInfo[key2] != undefined) {
            this.updateItem(value2, key1, key2)
          }
        }
      } else {
        this.updateItem(value1, key1)
      }
    }
    this.rebuild()
  }

  updateItem (vValue, vKey, vSecondKey) {
    if (vSecondKey) {
      this[vKey][vSecondKey] = vValue
    } else {
      this[vKey] = vValue
    }
  }

  getArgs() {
    return {}
  }

  /**
   * 提供给更新命令调用
   */
  getArgItems(vArgItems) {
    let args = this.getArgs()
    let argItems = new Map()
    for (const [key, value] of vArgItems) {
      if (!args[key]) {
        continue
      }
      if (value instanceof Map) {
        argItems.set(key, new Map())
        for (const [key1, value1] of value) {
          if (!args[key].value[key1]) {
            continue
          }
          let item = args[key].value[key1]
          let itemValue = this.getItemValue(item)
          argItems.get(key).set(key1, itemValue)
        }
      } else {
        let item = args[key]
        let itemValue = this.getItemValue(item)
        argItems.set(key, itemValue)
      }
    }
    return argItems
  }

  getItemValue(vObjItem) {
    let value = null
    if (vObjItem.type === 'select') {
      value = vObjItem.value.value
    } else {
      value = vObjItem.value
    }
    return value
  }

  updateCanvas() {
    if (CUR_DATA.MODE === '2D' && this.isUpdate2D) {
      let widget = D2Config.WIDGETS.get(this.uuid)
      if (!widget) {
        d2_action.createWidget(this.writePB(), this.constructor.name)
      } else {
        widget.update(this.writePB())
      }
    }
  }

  setSelected() {}

  writePB() {}
}
