import { Machine } from 'xstate'
import { stage_move } from '../stage_move'
import { stage_scale } from '../stage_scale'

/**
 * [How to deal with multiple Contexts in Hierarchical and Parallel State Machines? #1528](https://github.com/davidkpiano/xstate/discussions/1528)
 */

export const stuff_machine = Machine(
  {
    id: 'stuff',
    strict: true,
    type: 'parallel',
    context: {
      count: 0,
    },
    states: {
      stage_move: stage_move,
      stage_scale: stage_scale,
    },
  },
  {
    actions: {},
    guards: {},
  }
)
