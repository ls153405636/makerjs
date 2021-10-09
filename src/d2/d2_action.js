import Types from '../types/stairV2'
import { Movie } from './movie'

/**
 * 
 * @param {Types.Project} vPB 
 */
export function importProject (vPB) {
  new Hole(vPB.hole)
}

export function initD2 () {
  new Movie().bootstrap()
}

export default {
  importProject,
  initD2
}