import { Movie } from './movie'
import { Hole } from './hole'
import { Wall } from './wall'
import { Stair } from './stair'

/**
 *
 * @param {Types.Project} vPB
 */
export function importProject(vPB) {
  new Hole(vPB.hole).addToStage()
  vPB.walls.forEach((w) => {
    new Wall(w).addToStage()
  })
  new Stair(vPB.stair)
}

export function initD2() {
  new Movie().bootstrap()
}

export default {
  importProject,
  initD2,
}
