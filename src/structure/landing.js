import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Outline } from "../utils/outline";
import { BigColumn } from "./big_column";
import { ChildInfo } from "./child_info";
import { Default } from "./config";
import { SmallColumn } from "./small_column";
import tool from "./tool";


export class Landing extends ChildInfo {
  static STEP_NUM_MAP = new Map([
    [Types.LandingCutType.lct_first, 1],
    [Types.LandingCutType.lct_second, 3],
    [Types.LandingCutType.lct_third, 2],
    [Types.LandingCutType.lct_fourth, 2],
    [Types.LandingCutType.lct_fifth, 3]
  ])
  static CUT_TYPE_MAP = [
    {value:Types.LandingCutType.lct_first, label:'方案1'},
    {value:Types.LandingCutType.lct_second, label:'方案2'},
    {value:Types.LandingCutType.lct_third, label:'方案3'},
    {value:Types.LandingCutType.lct_fourth, label:'方案4'},
    {value:Types.LandingCutType.lct_fifth, label:'方案5'}
  ]
  /**
   * 
   * @param {Object} param0 
   * @param {Types.Outline} param0.vBorder 
   */
  constructor ({vParent, vTreadIndex, vBorder, vLastEdgeIndex, vNextEdgeIndex, vLastStepWidth, vNextStepWidth}) {
    super(vParent)
    this.type = Default.LANDING_TYPE
    this.corIndex = Math.max(vLastEdgeIndex, vNextEdgeIndex)
    if (Math.abs(vLastEdgeIndex - vNextEdgeIndex) === 3) {
      this.corIndex = 0
    }
    this.oppoIndex = Math.abs(this.corIndex - 2)
    this.lastEdgeIndex = vLastEdgeIndex
    this.nextEdgeIndex = vNextEdgeIndex
    this.lastVec = new Edge(vBorder.edges[this.lastEdgeIndex]).getNormal().negate()
    this.nextVec = new Edge(vBorder.edges[this.nextEdgeIndex]).getNormal()
    this.stepNum = Landing.STEP_NUM_MAP.get(this.type)
    this.rebuildByParent({vTreadIndex, vBorder,  vLastStepWidth, vNextStepWidth})
  }

  /**
   * 
   * @param {Object} param0 
   * @param {Types.Outline} param0.vBorder 整体休台的边界轮廓
   * @param {Number} param0.vTreadIndex 第一级踏板的序号
   * @param {Number} param0.vLastStepWidth 上段楼梯的步宽
   * @param {Number} param0.vNextStepWidth 下段楼梯的步宽
   */
  rebuildByParent ({vTreadIndex, vBorder, vLastStepWidth, vNextStepWidth}) {
    this.pois = []
    vBorder.edges.forEach(e => {
      this.pois.push(e.p1)
    })
    this.treadIndex = vTreadIndex
    this.edges = vBorder.edges
    this.lastStepWidth = vLastStepWidth
    this.nextStepWidth = vNextStepWidth
    this.edgeL = this.edges[this.lastEdgeIndex]
    this.edgeN = this.edges[this.nextEdgeIndex]
    this.sideEdgeL = this.edges[(this.nextEdgeIndex + 2)%4]
    this.sideEdgeN = this.edges[(this.lastEdgeIndex + 2)%4]
    //this.updateCorBigCol()
  }

  rebuild () {
    this.stepNum = Landing.STEP_NUM_MAP.get(this.type)
    super.rebuild()
  }
  
  getArgs() {
    let f = tool.getItemFromOptions
    let options = [...Landing.CUT_TYPE_MAP]
    let gArgs = this.parent.girderParameters
    if (gArgs.type === Types.GirderType.gslab) {
      options.splice(1,1)
    }
    return {
      type:{name:'分割方案', value:f(this.type, Landing.CUT_TYPE_MAP), type:'select', options:options},

    }
  }

  writePB() {
    return new Types.Landing({
      uuid:this.uuid,
      type:this.type,
      treads: this.createTreads()
    })
  }

  addBigCol (vInfo, vPosName) {
    this[vPosName] = vInfo
  }

  

  updateCorBigCol () {
    let size = this.corBigCol?.size || tool.parseSpecification(Default.BIG_COL_SPEC)
    let gArgs = this.parent.girderParameters
    let utilOutline = new Outline(new Types.Outline({edges:this.edges}))
    let xOffset
    let yOffset
    if (gArgs.type === Types.GirderType.gsaw) {
      xOffset = size.x / 2
      yOffset = size.y / 2
    } else {
      xOffset = yOffset = gArgs.depth / 2
    }
    let xCor = utilOutline.offset(xOffset, false).edges[this.corIndex].p1
    let yCor = utilOutline.offset(yOffset, false).edges[this.corIndex].p1
    let pos = new Types.Vector3({x:xCor.x, y:yCor.y})
    if (this.corBigCol) {
      this.corBigCol.rebuildByParent(pos)
    } else {
      this.corBigCol = new BigColumn({vParent:this,
                                      vPosition:pos,
                                      vIsProp:true,
                                      vPosName:'corBigCol'})
      return this.corBigCol
    }
  }

  createTreads() {
    let treads = []
    let outlines = []
    if (this.type === Types.LandingCutType.lct_first) {
      outlines = [tool.createOutlineByPois(this.pois)]
    } else if (this.type === Types.LandingCutType.lct_second) {
      outlines = this.createSecondOutlines()
    } else {
      outlines = this.createInCutOutlines()
    }
    for (let i = 0; i < outlines.length; i++) {
      treads.push(new Types.Tread({
        index:this.treadIndex + i + 1,
        stepOutline: outlines[i]
      }))
    }
    return treads
  }

  createSmallCols (vDis1, vDis2, vSize) {
    let gArgs = this.parent.girderParameters
    let utilSEL
    let utilSEN
    let cols = []
    let borderGap1 = vDis1
    let borderGap2 = vDis2
    if (gArgs.type === Types.GirderType.gslab) {
      utilSEL = new Edge(new Edge(this.sideEdgeL).offset(this.parent.sideOffset))
      utilSEN = new Edge(new Edge(this.sideEdgeN).offset(this.parent.sideOffset))
      borderGap1 -= this.parent.sideOffset
      borderGap2 -= this.parent.sideOffset
    } else {
      utilSEL = new Edge(new Edge(this.sideEdgeL).offset(this.parent.sideOffset, false))
      utilSEN = new Edge(new Edge(this.sideEdgeN).offset(this.parent.sideOffset, false))
      borderGap1 += this.parent.sideOffset
      borderGap2 += this.parent.sideOffset
    }
    while(utilSEL.getLength() > borderGap1) {
      let pos
      if (this.lastEdgeIndex === this.corIndex) {
        pos = utilSEL.extendP1(-vDis1).p1
      } else {
        pos = utilSEL.extendP2(-vDis1).p2
      }
      cols.push(new SmallColumn(this.parent, pos, vSize))
    }
    while(utilSEN.getLength() > borderGap2) {
      let pos
      if (this.lastEdgeIndex === this.corIndex) {
        pos = utilSEN.extendP2(-vDis2).p2
      } else {
        pos = utilSEN.extendP1(-vDis2).p1
      }
      cols.push(new SmallColumn(this.parent, pos, vSize))
    }
    return cols
  }

  //创建二类分割梯板轮廓
  createSecondOutlines(){
    let cor = this.pois[this.corIndex] //转角点
    let oppo = this.pois[(this.corIndex+2)%4] //对角点
    let outlines = []
    let tArgs = this.parent.parent.treadParameters
    let rArgs = this.parent.parent.riserParameters
    let backOffset = tArgs.nossing + rArgs.riserExist ? rArgs.depth : 0
    let treadOutlines = []
    let sideDisL = new Edge(this.edgeL).getLength() * Math.tan(Math.PI / 6) //上段楼梯侧边断点的偏移距离
    let sideDisN = new Edge(this.edgeN).getLength() * Math.tan(Math.PI / 6) //下段楼梯侧边断点的偏移距离
    if (this.lastEdgeIndex === this.corIndex) {
      this.bpl = new Edge(this.sideEdgeL).extendP1(-sideDisL).p1 //上段楼梯侧边断点
      this.bpN = new Edge(this.sideEdgeN).extendP2(-sideDisN).p2 //下段楼梯侧边断点
      let pL = this.edgeL.p2 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p1 //下段楼梯对应边的另个端点

      let pois1 = [this.bpl, cor, pL]
      outlines.push(tool.createOutlineByPois(pois1))
      treadOutlines.push(this.createSecondTreadOutline(pois1, this.lastVec, this.lastVec, backOffset))

      let pois2 = [this.bpN, cor, this.bpl, oppo]
      outlines.push(tool.createOutlineByPois(pois2))
      treadOutlines.push(this.createSecondTreadOutline(pois2, this.nextVec, this.lastVec, backOffset))

      let pois3 = [pN, cor, this.bpN]
      outlines.push(tool.createOutlineByPois(pois3))
      treadOutlines.push(this.createSecondTreadOutline(pois3, this.nextVec, this.nextVec, backOffset))
    } else {
      this.bpl = new Edge(this.sideEdgeL).extendP2(-sideDisL).p2 //上段楼梯侧边断点
      this.bpN = new Edge(this.sideEdgeN).extendP1(-sideDisN).p1 //下段楼梯侧边断点
      let pL = this.edgeL.p1 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p2 //下段楼梯对应边的另个端点

      let pois1 = [cor, this.bpl, pL]
      outlines.push(tool.createOutlineByPois(pois1))
      treadOutlines.push(this.createSecondTreadOutline(pois1, this.lastVec, this.lastVec, backOffset))

      let pois2 = [cor, this.bpN, oppo, this.bpl]
      outlines.push(tool.createOutlineByPois())
      treadOutlines.push(this.createSecondTreadOutline(pois2, this.lastVec, this.nextVec, backOffset))

      let pois3 = [cor, pN, this.bpN]
      outlines.push(tool.createOutlineByPois(pois3))
      treadOutlines.push(this.createSecondOutlines(pois3, this.nextVec, this.nextVec, backOffset))
    }
    return {outlines, treadOutlines}
  }

  createSecondTreadOutline (vPois, vVec1, vVec2, vBackOffset) {
    let p1 = vPois[0]
    let p2 = vPois[1]
    let p1_b = new Edge().setByVec(p1, vVec1, vBackOffset).p2
    let p2_b = new Edge().setByVec(p2, vVec2, vBackOffset).p2
    vPois.splice(1, 0, p1_b, p2_b)
    return tool.createOutlineByPois(vPois)
  }

  //创建三四五类分割梯板轮廓
  createInCutOutlines() {
    let outlines = []
    let inEdgeL = new Edge(this.edgeL).offset(this.lastStepWidth, false)
    let cor = this.pois[this.corIndex] //转角点
    let oppo = this.pois[(this.corIndex+2)%4] //对角点
    if (this.lastEdgeIndex === this.corIndex) {
      this.bpL = new Edge(this.sideEdgeL).extendP1(-this.lastStepWidth).p1
      this.bpN = new Edge(this.sideEdgeN).extendP2(-this.nextStepWidth).p2
      let pL = this.edgeL.p2 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p1 //下段楼梯对应边的另个端点
      let cutP = new Edge(inEdgeL).extendP1(-this.nextStepWidth).p1 //内部切割点
      if (this.type === Types.LandingCutType.lct_third) {
        outlines.push(tool.createOutlineByPois([this.bpL, cutP, cor, pL]))
        outlines.push(tool.createOutlineByPois([pN, cor, cutP, this.bpL, oppo]))
      } else if (this.type === Types.LandingCutType.lct_fourth) {
        outlines.push(tool.createOutlineByPois([this.bpN, cutP, cor, pL, oppo]))
        outlines.push(tool.createOutlineByPois([pN, cor, cutP, this.bpN]))
      } else {
        outlines.push(tool.createOutlineByPois([this.bpL, cutP, cor, pL]))
        outlines.push(tool.createOutlineByPois([this.bpN, cutP, this.bpL, oppo]))
        outlines.push(tool.createOutlineByPois([pN, cor, cutP, this.bpN]))
      }
    } else {
      this.bpL = new Edge(this.sideEdgeL).extendP2(-this.lastStepWidth).p2
      this.bpN = new Edge(this.sideEdgeN).extendP1(-this.nextStepWidth).p1
      let pL = this.edgeL.p1 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p2 //下段楼梯对应边的另个端点
      let cutP = new Edge(inEdgeL).extendP2(-this.nextStepWidth).p2 //内部切割点
      if (this.type === Types.LandingCutType.lct_third) {
        outlines.push(tool.createOutlineByPois([cor, cutP, this.bpL, pL]))
        outlines.push(tool.createOutlineByPois([cor, pN, oppo, this.bpL, cutP]))
      } else if (this.type === Types.LandingCutType.lct_fourth) {
        outlines.push(tool.createOutlineByPois([cor, cutP, this.bpN, oppo, pL]))
        outlines.push(tool.createOutlineByPois([cor, pN, this.bpN, cutP]))
      } else {
        outlines.push(tool.createOutlineByPois([cor, cutP, this.bpL, pL]))
        outlines.push(tool.createOutlineByPois([cutP, this.bpN, oppo, this.bpL]))
        outlines.push(tool.createOutlineByPois([cor, pN, this.bpN, cutP]))
      }
    }
    return outlines
  }

  createInCutTreadOutline () {
    
  }
}