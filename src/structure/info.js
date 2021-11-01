import { v4 } from 'uuid'
import { CUR_DATA } from '../common/common_config'
import { D2Config } from '../d2/config'
import d2_action from '../d2/d2_action'
import { StructConfig } from './config'

export class Info {
  /**
   * 结构计算模块的基类
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

  /**
   * 重新计算当前组件
   */
  rebuild() {}

  /**
   * 由命令调用，当页面参数发生改变时，由此函数更新当前组件
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

  /**
   * 逐条更新参数
   * @param {*} vValue 
   * @param {String} vKey 
   * @param {String} vSecondKey 
   */
  updateItem (vValue, vKey, vSecondKey) {
    if (vSecondKey) {
      this[vKey][vSecondKey] = vValue
    } else {
      this[vKey] = vValue
    }
  }

  /**
   * 返回页面参数，全部由子类重写
   * @returns
   */
  getArgs() {
    return {}
  }

  /**
   * 获取命令里保存的argItems，以供撤销恢复使用
   * @returns {Map}
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

  /**
   * 根据页面参数中的一条信息，提取其中的value值
   * @param {*} vObjItem 
   * @returns 
   */
  getItemValue(vObjItem) {
    let value = null
    if (vObjItem.type === 'select') {
      value = vObjItem.value.value
    } else {
      value = vObjItem.value
    }
    return value
  }

  /**
   * 本组件重新计算完成后，更新23d画布
   */
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
