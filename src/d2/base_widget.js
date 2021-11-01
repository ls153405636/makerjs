import { v4 as uuidv4 } from 'uuid'
import { D2Config } from './config'
import { Movie } from './movie'
export class BaseWidget {
  constructor(uuid) {
    /** @type {PIXI.Container} */
    this.uuid = uuid || uuidv4()
    this.sprite = null
    this.isSelected = false
    D2Config.WIDGETS.set(this.uuid, this)
  }

  /**
   * 销毁函数
   */
  destroy() {
    /**由外部和父级调用，销毁此精灵，阅读学习PIXI里的destory方法 */
    /**父类里可写一部分通用方法，不同的子类如果有需要，也要写具体实现 */
    /**注意以下两点，精灵图destory的时候，其child的状态，以及destory之后，其绑定事件的处理*/
    if (this.isSelected) {
      D2Config.SELECTED = null
      this.isSelected = false
    }
    this.sprite.destroy({children:true})
    D2Config.WIDGETS.delete(this.uuid)
  }

  init () {}

  getWidgetType () {}

  /**
   * 页面参数发生改变后，结构计算模块会调用此函数
   * 当前逻辑为销毁当前组件的精灵图，重新绘制
   * @param {*} vPB 
   */
  update (vPB) {
    this.destroy()
    this.init(vPB)
    D2Config.WIDGETS.set(this.uuid, this)
    this.addToStage()
  }

  setuuid(uuid) {
    if (uuid) {
      this.uuid = uuid
      this.sprite.uuid = uuid
    }
    return this
  }

  draw() {
    throw '必须由子类实现'
    /* eslint-disable */
    return this
  }

  addToStage() {
    if (this.sprite) {
      // debugger
      new Movie().addEle(this.sprite)
    }
    if (this.lineSprite) {
      // debugger
      new Movie().addEle(this.lineSprite)
    }
    if (this.textSprite) {
      // debugger
      new Movie().addEle(this.textSprite)
    }
  }

  addEvent() {
    throw '必须由子类实现'
    /* eslint-disable */
    return this
  }

  cancelSelected() {}

  setSelected() {}

  setHover() {}

  cancelHover() {}
}
