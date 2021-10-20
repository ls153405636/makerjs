import { Movie } from './movie'
import { Hole } from './hole'
import { Wall } from './wall'
import { Stair } from './stair/stair'

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

export default {
  importProject,
  initD2,
}
