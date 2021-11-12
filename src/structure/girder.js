import { Types } from "../types/stair_v2";
import { ChildInfo } from "./child_info";
import tool from "./tool";

export class Girder extends ChildInfo {
  static GIRDER_TYPE_OPTIONS = [
    {value:Types.GirderType.gsaw, label:'锯齿型'},
    {value:Types.GirderType.gslab, label:'平板型'}
  ]
  constructor (vParent, vInEdges, vOutEdges) {
    super(vParent)
    this.rebuildByParent(vInEdges, vOutEdges)
  }

  rebuildByParent (vInEdges, vOutEdges) {
    this.inRoute = new Types.Outline({ edges: vInEdges })
    this.outRoute = new Types.Outline({ edges: vOutEdges })
    this.paras = this.parent.girderParameters
  }

  getArgs () {
    let gargs = this.parent.girderParameters
    let f = tool.getItemFromOptions
    return {
      type: {
        name: '类型',
        value: f(gargs.type, Girder.GIRDER_TYPE_OPTIONS),
        type: 'select',
        options: Girder.GIRDER_TYPE_OPTIONS,
      },
      height: { name: '高度', value: gargs.height, type: 'input' },
      depth: { name: '厚度', value: gargs.depth, type: 'input' },
      material: { name: '材质', value: '', type: 'replace' },
    }
  }

  update (vArgItems) {
    super.updateParent(vArgItems, 'girderParameters')
  }

  writePB () {
    return new Types.Girder({
      uuid: this.uuid,
      inRoute: this.inRoute,
      outRoute: this.outRoute,
    })
  }
}