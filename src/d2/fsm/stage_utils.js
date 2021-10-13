import { Point } from 'core/src/logic/graphics/point'
import Victor from 'victor'
import { RunContext } from './context'

export const stage_point = (point) => {
  let vec = new Victor(point.x, point.y)
  vec
    .subtract(RunContext.context.app.stage.position)
    .multiplyScalar(1 / RunContext.context.scale)
  return Point.from(vec)
}

/**
 * @param {Array<PIXI.Container>} objs
 */
export const stage_remove = (...objs) => {
  objs.forEach((obj) => {
    if (obj && obj.parent) {
      obj.parent.removeChild(obj)
    }
  })
}
