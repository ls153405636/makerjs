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
  destory() {
    /**由外部和父级调用，销毁此精灵，阅读学习PIXI里的destory方法 */
    /**父类里可写一部分通用方法，不同的子类如果有需要，也要写具体实现 */
  }

  /**清空函数 */
  clear() {
    /**类内部调用，阅读学习PIXI里的clear方法 */
  }

  reDraw() {
    /**清空后重新绘制 */
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
