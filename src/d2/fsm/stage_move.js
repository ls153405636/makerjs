import { Point } from './point'
import { events } from './state_event'
import { RunContext } from './context'
import { with_log } from './fsm_util'

class stage_move_context {
  static point_down = null

  static actions = {
    on_move: (context, event, state) => {
      if (this.point_down != null) {
        let point_move = Point.from(event.data.data.global)
        let origin = Point.from(RunContext.context.app.stage.position)

        RunContext.context.app.stage.position.x =
          origin.x + point_move.x - this.point_down.x
        RunContext.context.app.stage.position.y =
          origin.y + point_move.y - this.point_down.y

        this.point_down = point_move
      }
    },

    on_down: (context, event, state) => {
      if (this.point_down == null) {
        this.point_down = Point.from(event.data.data.global)
      }
    },

    on_up: (context, event, state) => {
      this.point_down = null
    },
  }
}

// ! 此处暂时没有用状态机建模
/** @type import('xstate').StateNodeConfig */
export const stage_move = with_log('stage_move', {
  initial: 'watch',
  states: {
    watch: {
      on: {
        [events.MOUSE_MOVE]: {
          actions: stage_move_context.actions.on_move,
        },
        [events.MOUSE_DOWN]: {
          actions: stage_move_context.actions.on_down,
        },
        [events.RIGHT_DOWN]: {
          actions: stage_move_context.actions.on_down,
        },
        [events.MOUSE_UP]: {
          actions: stage_move_context.actions.on_up,
        },
        [events.RIGHT_UP]: {
          actions: stage_move_context.actions.on_up,
        },
        /**
         * ! 移动过程中, 鼠标移动到 canvas 外, mouse down 和 up 不匹配
         */
        [events.MOUSE_LEAVE]: {
          actions: stage_move_context.actions.on_up,
        },
      },
    },
  },
})
