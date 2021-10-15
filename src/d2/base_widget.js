import { v4 as uuidv4 } from 'uuid'
import { Movie } from './movie'
export class BaseWidget {
  constructor() {
    /** @type {string} */
    this.uuid = uuidv4()
    /** @type {PIXI.Container} */
    this.sprite = null
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
