import d2_action from "./d2/d2_action";
import { Types } from "./types/stair_v2";

export function initProj() {
  // let proj = {
  //   hole: {
  //     edges: [
  //       {p1: {x:0, y:0}, p2:{x:500, y:0}},
  //       {p1: {x:500, y:0}, p2:{x:500, y:300}},
  //       {p1: {x:500, y:300}, p2:{x:0, y:300}},
  //       {p1: {x:0, y:300}, p2:{x:0, y:0}},
  //     ]
  //   },
  //   walls: []
  // }
  let proj = new Types.Project()
  proj.hole = new Types.Hole()
  let edges = []
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 0, y: 0}),
    p2: new Types.Vector3({x: 4000, y: 0}),
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 4000, y: 0}),
    p2: new Types.Vector3({x: 4000, y: 3000}),
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 4000, y: 3000}),
    p2: new Types.Vector3({x: 0, y: 3000}),
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 0, y: 3000}),
    p2: new Types.Vector3({x: 0, y: 0}),
    type: Types.EdgeType.estraight
  }))
  proj.hole.edges = edges;

  edges.forEach(e => {
    proj.walls.push(new Types.Wall({
      p1: e.p1,
      p2: e.p2,
      type: Types.WallType.wboth,
      depth: 240,
      height: 2800
    }))
  })
  console.log('pb:', proj)
  d2_action.importProject(proj)
  return proj
}

export default {
  initProj
}