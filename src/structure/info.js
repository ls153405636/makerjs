import { v4 } from "uuid"
import { CUR_DATA } from "../common/common_config"
import { D2Config } from "../d2/config"
import d2_action from "../d2/d2_action"
import { StructConfig } from "./config"

export class Info {
  /**
   * 
   * @param {Info} vParent 
   */
  constructor (vParent) {
    this.uuid = v4()
    this.parent = vParent
    this.isUpdate2D = true
    this.isUpdate3D = true
    StructConfig.INFOS.set(this.uuid, this)
  }

  addInfo () {}

  delInfo () {}

  rebuild () {}

  update () {}

  getArgs () {
    return {}
  }

  /**
   * 提供给更新命令调用
   */
   getArgItems (vArgItems) {
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
   }

   getItemValue (vItem) {
     let value = null
     if (vItem.type === 'select') {
       value = vItem.value.value
     } else {
       value = vItem.value
     }
     return value
   }

  updateCanvas () {
    if (CUR_DATA.MODE === '2D' && this.isUpdate2D) {
      let widget = D2Config.WIDGETS.get(this.uuid)
      if (!widget) {
        d2_action.createWidget(this.writePB(), this.constructor.name)
      } else {
        widget.update(this.writePB())
      }
    } 
  }

  setSelected () {}

  writePB () {}
}