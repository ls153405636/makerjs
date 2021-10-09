import Types from '../types/stairV2'
import { Movie } from './movie'

/**
 * 
 * @param {Types.Project} vPB 
 */
export function importProject (vPB) {
  new Hole(vPB.hole).addToStage()
  vPB.walls.forEach(w => {
    new Wall(w).addToStage()
  })
}

export function initD2 () {
  new Movie().bootstrap()
}

export default {
  importProject,
  initD2
}