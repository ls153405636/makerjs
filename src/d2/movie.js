import { D2Config } from './config'
import { D2Grid } from '../widget2/d2_grid'

import { interpret } from 'xstate'

import { stuff_machine } from './fsm/stuff'
import { events } from './fsm/state_event'
import { RunContext } from './fsm/context'
import { Wall } from './wall'

export class Movie {
  constructor() {
    if (!Movie.instance) {
      let app = new PIXI.Application({
        width: D2Config.CANVAS_WIDTH,
        height: D2Config.CANVAS_HEIGHT,
        transparent: false,
        resolution: 1,
        antialias: true,
        preserveDrawingBuffer: true,
      })

      globalThis.mv = this

      app.stage.cursor = 'pointer'
      app.stage.interactive = true
      app.stage.buttonMode = true
      app.stage.sortableChildren = true
      app.renderer.backgroundColor = 0xdfdfdf

      app.ticker.maxFPS = 60

      app.renderer.autoResize = true
      // app.renderer.resize(window.screen.availWidth, window.screen.availHeight)

      this.app = app

      window.stage = app.stage.children

      this.scale = 1

      RunContext.context = this
      Movie.instance = this
    }
    return Movie.instance
  }

  bootstrap() {
    document.querySelector('#canvas').appendChild(this.app.view)

    // console.log('movie bootstrap')

    this.initialize_interaction_manager()
    this.start()

    this.service = interpret(stuff_machine)
      .onTransition((state) => {
        if (state.changed) {
          // console.log('-->onTransition', state.value, state.context)
        }
      })
      .start()
    window.beta = this.service
  }

  initialize_interaction_manager() {
    // ! 阻止鼠标中键导航到上一页和下一页
    window.history.pushState(null, '', window.location.href)
    window.onpopstate = function (event) {
      window.history.pushState(null, '', window.location.href)
    }
    // 键盘禁用
    // document.addEventListener('keydown', (event) => {
    //   this.service.send({ type: events.KEY_DOWN, data: event })
    // })

    // 阻止鼠标右键打开上下文菜单
    this.app.view.oncontextmenu = (e) => e.preventDefault()

    this.app.view.addEventListener('wheel', (event) => {
      this.service.send({ type: events.WHEEL, data: event })
    })
    this.app.view.addEventListener('mouseleave', (event) => {
      this.service.send({ type: events.MOUSE_LEAVE, data: event })
    })

    this.app.renderer.plugins.interaction
      .on('click', (/** @type {PIXI.interaction.InteractionEvent} */ event) => {
        // console.error('-->', event.type)
        // ! 为什么不能出发 click 事件
        this.service.send({ type: events.CLICK, data: event })
      })
      .on('mousedown', (
        /** @type {PIXI.interaction.InteractionEvent} */ event
      ) => {
        if (event.stopped) {
          return
        }

        if (D2Config.SELECTED) {
          D2Config.SELECTED.cancelSelected()
        }
        // console.error('-->', event.type)
        //this.service.send({type: events.MOUSE_DOWN, data: event})
      })
      // .on('mouseup', (/** @type {PIXI.interaction.InteractionEvent} */ event) => {
      //   // console.error('-->', event.type)
      //   this.service.send({type: events.MOUSE_UP, data: event})
      // })
      .on('rightclick', (
        /** @type {PIXI.interaction.InteractionEvent} */ event
      ) => {
        // console.error('-->', event.type)
        this.service.send({ type: events.RIGHT_CLICK, data: event })
      })
      .on('rightdown', (
        /** @type {PIXI.interaction.InteractionEvent} */ event
      ) => {
        // console.error('-->', event.type)
        this.service.send({ type: events.RIGHT_DOWN, data: event })
      })
      .on('rightup', (
        /** @type {PIXI.interaction.InteractionEvent} */ event
      ) => {
        // console.error('-->', event.type)
        this.service.send({ type: events.RIGHT_UP, data: event })
      })
      .on('mousemove', (
        /** @type {PIXI.interaction.InteractionEvent} */ event
      ) => {
        // 在任何鼠标事件期间，buttons 务必用于指示当前正在按下的鼠标按钮组合，以位掩码表示
        // https://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/#widl-MouseEvent-buttons

        // 所以没必要用 mouseDownMove、mouseUpMove
        this.service.send({ type: events.MOUSE_MOVE, data: event })
      })
  }
  start() {
    let grid = new D2Grid(1, 6840, 6840, 10, 120)
    grid.position.set(
      D2Config.CANVAS_WIDTH / 2 - grid.width / 2,
      D2Config.CANVAS_HEIGHT / 2 - grid.height / 2
    )
    this.app.stage.addChild(grid)
  }

  addEle(vEle) {
    this.app.stage.addChild(vEle)
  }
}

let movie = new Movie()

export default movie
