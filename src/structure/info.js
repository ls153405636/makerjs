import { v4 } from 'uuid'
import { CUR_DATA } from '../common/common_config'
import { D2Config } from '../d2/config'
import d2_action from '../d2/d2_action'
import d3_action from '../d3/d3_action'
import { D3Config } from '../d3/d3_config'
import { D3Scene } from '../d3/d3_scene'
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
      if (value1 instanceof Map) {
        for (const [key2, value2] of value1) {
            this.updateItem(value2, key1, key2)
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
    // console.log(vValue, vKey, vSecondKey)
    if (this[vKey] == undefined) {
      // console.log(this)
      // if (this.parent.endExtend === 240) {

      // }
      this.disToStart = 0
      return
    }
    if (vSecondKey) {
      let curInfo = this[vKey]
      if (curInfo[vSecondKey] != undefined) {
        this[vKey][vSecondKey] = vValue
      }
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
  updateCanvas(vName) {
    if (CUR_DATA.MODE === '2d' && this.isUpdate2D) {
      let widget = D2Config.WIDGETS.get(this.uuid)
      if (!widget) {
        d2_action.createWidget(this.writePB(), vName)
      } else {
        widget.update(this.writePB())
      }
    }
    if (CUR_DATA.MODE === '3d' && this.isUpdate3D) {
      let model = D3Config.MODELS.get(this.uuid)
      if (!model) {
        d3_action.createModel(this.writePB(), vName)
      } else {
        model.update(this.writePB())
      }
      new D3Scene().render()
    }
  }

  setSelected() {}

  writePB() {}
}
