import d2_action from "./d2/d2_action";
import { Types } from "./types/stairV2";

export function initProj() {
  let proj = new Types.Project()
  proj.hole = new Types.Hole()
  let edges = []
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 0, y: 0}),
    p2: new Types.Vector3({x: 500, y: 0}),
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 500, y: 0}),
    p2: new Types.Vector3({x: 500, y: 300}),
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 500, y: 300}),
    p2: new Types.Vector3({x: 0, y: 300}),
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 0, y: 300}),
    p2: new Types.Vector3({x: 0, y: 0}),
    type: Types.EdgeType.estraight
  }))
  proj.hole.edges = edges
  console.log('pb:', proj)
  d2_action.importProject(proj)
  //return proj
}

export default {
  initProj
}