import { Movie } from './movie'
import { Hole } from './hole'
import { Wall } from './wall'
import { Stair } from './stair/stair'
import { D2Config } from './config'

const WIDGET_TYPES = {
  'RectHole': Hole,
  'Wall': Wall,
  'Stair': Stair,
}

export function createWidget (vPB, vName) {
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

export function initD2() {
  new Movie().bootstrap()
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 17) {
    D2Config.IS_SINGLE_SELECTED = true
  }
})
document.addEventListener('keyup', (e) => {
  if (e.keyCode == 17) {
    D2Config.IS_SINGLE_SELECTED = false
  }
})

export default {
  importProject,
  initD2,
  createWidget
}
