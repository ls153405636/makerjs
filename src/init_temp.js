// import { Types } from "./types/stairV2";

// export function initProj () {
//   let proj = new Types.Project()
//   proj.hole = new Types.Hole()
//   let edges = []
//   edges.push(new Types.Edge({
//     p1:new Types.Vector3({x:0, y:0}),
//     p2:new Types.Vector3({x:500, y:0}),
//     type: Types.EdgeType.estraight
//   }))
//   edges.push(new Types.Edge({
//     p1:new Types.Vector3({x:500, y:0}),
//     p2:new Types.Vector3({x:500, y:300}),
//     type: Types.EdgeType.estraight
//   }))
//   edges.push(new Types.Edge({
//     p1:new Types.Vector3({x:500, y:300}),
//     p2:new Types.Vector3({x:0, y:300}),
//     type: Types.EdgeType.estraight
//   }))
//   edges.push(new Types.Edge({
//     p1:new Types.Vector3({x:0, y:300}),
//     p2:new Types.Vector3({x:0, y:0}),
//     type: Types.EdgeType.estraight
//   }))
//   proj.hole.edges = edges
//   return proj
// }

import { Types } from "./types/stairV2";

export function initProj() {
  let proj = new Types.Project()
  let hole = new Types.Hole()
  let edges = []
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 0, y: 0})
    p2: new Types.Vector3({x: 500, y: 0})
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 500, y: 0})
    p2: new Types.Vector3({x: 500, y: 300})
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 500, y: 300})
    p2: new Types.Vector3({x: 0, y: 300})
    type: Types.EdgeType.estraight
  }))
  edges.push(new Types.Edge({
    p1: new Types.Vector3({x: 0, y: 300})
    p2: new Types.Vector3({x: 0, y: 0})
    type: Types.EdgeType.estraight
  }))
  proj.hole.edges = edges
  return proj
}