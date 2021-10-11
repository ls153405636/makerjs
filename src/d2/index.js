import { BaseWidget } from './base_widget'

export class D2 {
  constructor() {
    // prettier-ignore
    if (!D2.instance) {
      let app = new PIXI.Application({
        width                : 860,
        height               : 480,
        transparent          : false,
        resolution           : 1,
        antialias            : true,
        preserveDrawingBuffer: true,
      })

      globalThis.d2 = this

      app.stage.interactive        = true
      app.stage.sortableChildren   = true
      app.renderer.backgroundColor = 0xdfdfdf

      app.ticker.maxFPS = 60

      app.renderer.autoResize = true
      app.renderer.resize(window.screen.availWidth, window.screen.availHeight)

      this.app = app
      /** @type {Array<BaseWidget>} */
      this.widgets = []

      this.scale = 1

      D2.instance = this
    }
    return D2.instance
  }

  bootstrap() {
    document.querySelector('#canvas').appendChild(this.app.view)

    this.initialize_interaction_manager()
  }

  initialize_interaction_manager() {
    this.app.view.oncontextmenu = (e) => e.preventDefault()
  }

  /**
   * @param {string} uuid
   * @returns {BaseWidget|null}
   */
  find_uuid(uuid) {
    for (let i = 0; i < this.widgets.length; i++) {
      const item = this.widgets[i]
      if (item.uuid === uuid) {
        return item
      }
    }
    return null
  }

  /**
   * @param {BaseWidget} widget
   */
  add(widget) {
    if (widget instanceof BaseWidget) {
      console.assert(widget.sprite != null, 'widget 的 sprite 必须由子类初始化')

      this.widgets.push(widget)
      this.app.stage.addChild(widget.sprite)
    }
  }

  /**
   * @param {BaseWidget} widget
   */
  del(widget) {
    if (widget instanceof BaseWidget) {
      this.widgets = this.widgets.filter((item) => {
        return item.uuid != widget.uuid
      })
      widget.sprite.parent.removeChild(widget)
    }
  }
}
