// 初始化项目
import d2_action from './d2/d2_action'
import { Structure } from './structure/structure'

export function initProj() {
  let proj = new Structure().createProject()
  console.log('proj:', proj)
  d2_action.importProject(proj)
  return proj
}

export default {
  initProj,
}
