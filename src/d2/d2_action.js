import { Movie } from './movie'
import { Hole } from './hole'
import { Wall } from './wall'
import { Stair } from './stair/stair'
import { D2Config } from './config'

const WIDGET_TYPES = {
  RectHole: Hole,
  Wall: Wall,
  Stair: Stair,
  LHole: Hole,
}

export function createWidget(vPB, vName) {
  let widget = null
  if (WIDGET_TYPES[vName]) {
    widget = new WIDGET_TYPES[vName](vPB).addToStage()
  }
  return widget
}

/**
 *
 * @param {Types.Project} vPB
 */
export function importProject(vPB) {
  new Hole(vPB.hole).addToStage() // 添加洞口

  vPB.walls.forEach((w) => {
    // 添加墙体
    new Wall(w).addToStage()
  })

  new Stair(vPB.stair).addToStage()
}

export function clear() {
  /**补全 */
}

export function initD2() {
  new Movie().bootstrap()
}

function dispose() {
  /**补全 */
}

function dispatch() {
  /**补全 */
}

let once = true
document.addEventListener('keydown', (e) => {
  if (e.keyCode == 17) {
    D2Config.IS_SINGLE_SELECTED = true
    if (once) {
      console.log(D2Config.IS_SINGLE_SELECTED)
    }
    once = false
  }
})
document.addEventListener('keyup', (e) => {
  if (e.keyCode == 17) {
    D2Config.IS_SINGLE_SELECTED = false
    once = true
    console.log(D2Config.IS_SINGLE_SELECTED)
  }
})

export default {
  importProject,
  initD2,
  createWidget,
  clear,
  dispatch,
  dispose
}
