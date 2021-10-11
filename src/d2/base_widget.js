import { v4 as uuidv4 } from 'uuid'
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
}
