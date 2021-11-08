import { Point } from '../../graphics/point'
import { events } from './state_event'
import { RunContext } from './context'
import { with_log } from './fsm_util'
import store from '../../store'

export class stage_scale_context {
  static actions = {
    /**
     * @param {*} context
     * @param {*} state
     * @param {Object} event
     * @param {WheelEvent} event.data
     */
    wheel: (context, event, state) => {
      let delta = event.data.deltaY || event.data.detail
      if (delta > 0) {
        let zoom = RunContext.context.scale - 0.1
        if (zoom <= 0.5) {
          this.set_scale(0.5)
        } else {
          this.set_scale(zoom)
        }
      } else {
        let zoom = RunContext.context.scale + 0.1
        if (zoom >= 4) {
          this.set_scale(4)
        } else {
          this.set_scale(zoom)
        }
      }
    },

    reset_canvas_position: (context, event, state) => {
      RunContext.context.scale = 1

      RunContext.context.app.stage.position.set(0, 0)
      RunContext.context.app.stage.scale.set(1, 1)
    },
  }

  static set_scale(n, around_center = false) {
    let current = Point.from(RunContext.context.app.stage.position)
    let event = around_center //是否绕屏幕中心缩放
      ? { x: window.screen.availWidth / 2, y: window.innerHeight / 2 }
      : RunContext.context.app.renderer.plugins.interaction.mouse.global
    if (event.x == Infinity) {
      // 3D to 2D
      event = Point.from(current)
    }
    // TODO: 忘了这个算法是怎么来的了
    let px = event.x - ((event.x - current.x) * n) / RunContext.context.scale
    let py = event.y - ((event.y - current.y) * n) / RunContext.context.scale

    RunContext.context.scale = n

    RunContext.context.app.stage.position.set(px, py)
    RunContext.context.app.stage.scale.set(n, n)

    store.commit('change_zoom/saveZoom', {
      scale_number: n,
    })
  }
}

/** @type import('xstate').StateNodeConfig */
export const stage_scale = with_log('stage_scale', {
  initial: 'watch',
  states: {
    watch: {
      on: {
        [events.WHEEL]: {
          actions: stage_scale_context.actions.wheel,
        },
      },
    },
  },
  on: {
    [events.USER_RESET_CANVAS_POSITION]: {
      actions: stage_scale_context.actions.reset_canvas_position,
    },
  },
})
