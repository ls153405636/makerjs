import { COMP_TYPES } from "../common/common_config";
import { Types } from "../types/stair_v2";
import { Edge } from "../utils/edge";
import { Outline } from "../utils/outline";
import { BigColumn } from "./big_column";
import { ChildInfo } from "./child_info";
import { Default } from "./config";
import { SmallColumn } from "./small_column";
import tool from "./tool";
import { CorTread } from "./treads/cor_tread";
import { SpecTread } from "./treads/spec_tread";


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
  constructor ({vParent, vTreadIndex, vBorder, vLastEdgeIndex, vNextEdgeIndex, vLastStepWidth, vNextStepWidth, vStartHeight, vIndex}) {
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
    this.index = vIndex
    this.rebuildByParent({vTreadIndex, vBorder,  vLastStepWidth, vNextStepWidth, vStartHeight})
  }

  /**
   * 
   * @param {Object} param0 
   * @param {Types.Outline} param0.vBorder 整体休台的边界轮廓
   * @param {Number} param0.vTreadIndex 第一级踏板的序号
   * @param {Number} param0.vLastStepWidth 上段楼梯的步宽
   * @param {Number} param0.vNextStepWidth 下段楼梯的步宽
   */
  rebuildByParent ({vTreadIndex, vBorder, vLastStepWidth, vNextStepWidth, vStartHeight}) {
    this.pois = []
    vBorder.edges.forEach(e => {
      this.pois.push(e.p1)
    })
    this.treadIndex = vTreadIndex
    this.edges = vBorder.edges
    this.lastStepWidth = vLastStepWidth
    this.nextStepWidth = vNextStepWidth
    /**@type {Array<Tread>} */
    this.treads = []
    this.edgeL = this.edges[this.lastEdgeIndex]
    this.edgeN = this.edges[this.nextEdgeIndex]
    this.sideEdgeL = this.edges[(this.nextEdgeIndex + 2)%4]
    this.sideEdgeN = this.edges[(this.lastEdgeIndex + 2)%4]
    this.startHeight = vStartHeight
    this.stepHeight = this.parent.stepHeight
    this.endHeight = this.stepHeight + this.stepHeight * this.stepNum
    this.compType = COMP_TYPES.LANDING
    this.updateTreads()
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
      name: '休息平台参数',
      type:{
        name:'分割方案', 
        value:f(this.type, Landing.CUT_TYPE_MAP), 
        type:'select',
        options:options},

    }
  }

  writePB() {
    return new Types.Landing({
      uuid:this.uuid,
      type:this.type,
      treads: tool.writeItemArrayPB(this.treads)
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

  updateTreads() {
    let borders = []
    if (this.type === Types.LandingCutType.lct_first) {
      borders = this.createFirstBorders()
    } else if (this.type === Types.LandingCutType.lct_second) {
      borders = this.createSecondBorders()
    } else {
      borders = this.createInCutBorders()
    }
    for (let i = 0; i < borders.length; i++) {
      let paras = {vParent:this, vIsLast:false, vIndex:this.treadIndex + i + 1, vBorder:borders[i]}
      paras.vClock = this.lastEdgeIndex === this.corIndex
      let isCor = (this.type === Types.LandingCutType.lct_first)
                  || (borders.length === 3 && i === 1)
                  || (this.type === Types.LandingCutType.lct_third && i === 1)
                  || (this.type === Types.LandingCutType.lct_fourth && i === 0)
      if (isCor) {
        if (this.type === Types.LandingCutType.lct_first) {
          paras.vLastEdgeIndex = (this.nextEdgeIndex + 2)%4
          paras.vNextEdgeIndex = (this.lastEdgeIndex + 2)%4
        } else if (this.lastEdgeIndex === this.corIndex) {
          paras.vLastEdgeIndex = borders[i].inIndex[0]
          paras.vNextEdgeIndex = borders[i].inIndex[1]
        } else {
          paras.vLastEdgeIndex = borders[i].inIndex[1]
          paras.vNextEdgeIndex = borders[i].inIndex[0]
        }
      }
      if (this.treads[i]) {
        this.treads[i].rebuildByParent(paras)
      } else {
        if (isCor) {
          this.treads.push(new CorTread(paras))
        } else {
          this.treads.push(new SpecTread(paras))
        }
      }
    }
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

  createFirstBorders() {
    let outline = this.createOutlineByPois(this.pois, 1)
    let backOffset = this.parent.getTreadBackOffset()
    let backEdge = new Edge(this.edges[this.nextEdgeIndex]).offset(backOffset)
    let treadPois = [...this.pois]
    treadPois.splice(this.nextEdgeIndex, 2, backEdge.p1, backEdge.p2)
    let treadOutline = this.createOutlineByPois(treadPois, 1)
    let frontIndex = [this.lastEdgeIndex]
    let backIndex = [this.nextEdgeIndex]
    let inIndex = [], outIndex = []
    for (let i = 0; i < 4; i++) {
      if (i !== this.lastEdgeIndex && i !== this.nextEdgeIndex) {
        inIndex.push(i)
      }
    }
    let border = new Types.TreadBorder({
      stepOutline:outline,
      treadOutline:treadOutline,
      inIndex:inIndex,
      outIndex:outIndex,
      frontIndex:frontIndex,
      backIndex:backIndex
    })
    return  [border]
  }

  //创建二类分割踏步轮廓
  createSecondBorders(){
    let cor = this.pois[this.corIndex] //转角点
    let oppo = this.pois[(this.corIndex+2)%4] //对角点
    let outlines = []
    let backOffset = this.parent.getTreadBackOffset()
    let treadOutlines = []
    let borders = []
    let sideDisL = new Edge(this.edgeL).getLength() * Math.tan(Math.PI / 6) //上段楼梯侧边断点的偏移距离
    let sideDisN = new Edge(this.edgeN).getLength() * Math.tan(Math.PI / 6) //下段楼梯侧边断点的偏移距离
    if (this.lastEdgeIndex === this.corIndex) {
      this.bpl = new Edge(this.sideEdgeL).extendP1(-sideDisL).p1 //上段楼梯侧边断点
      this.bpN = new Edge(this.sideEdgeN).extendP2(-sideDisN).p2 //下段楼梯侧边断点
      let pL = this.edgeL.p2 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p1 //下段楼梯对应边的另个端点

      let pois1 = [this.bpl, cor, pL]
      outlines.push(this.createOutlineByPois(pois1, 1))
      treadOutlines.push(this.createTreadOutline(pois1, [this.lastVec,this.lastVec], backOffset, 1))

      let pois2 = [this.bpN, cor, this.bpl, oppo]
      outlines.push(this.createOutlineByPois(pois2, 2))
      treadOutlines.push(this.createTreadOutline(pois2, [this.nextVec,this.lastVec], backOffset, 2))

      let pois3 = [pN, cor, this.bpN]
      outlines.push(this.createOutlineByPois(pois3, 3))
      treadOutlines.push(this.createTreadOutline(pois3, [this.nextVec,this.nextVec], backOffset, 3))
    } else {
      this.bpl = new Edge(this.sideEdgeL).extendP2(-sideDisL).p2 //上段楼梯侧边断点
      this.bpN = new Edge(this.sideEdgeN).extendP1(-sideDisN).p1 //下段楼梯侧边断点
      let pL = this.edgeL.p1 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p2 //下段楼梯对应边的另个端点

      let pois1 = [cor, this.bpl, pL]
      outlines.push(this.createOutlineByPois(pois1, 1))
      treadOutlines.push(this.createTreadOutline(pois1, [this.lastVec,this.lastVec], backOffset, 1))

      let pois2 = [cor, this.bpN, oppo, this.bpl]
      outlines.push(this.createOutlineByPois(pois2, 2))
      treadOutlines.push(this.createTreadOutline(pois2, [this.lastVec,this.nextVec], backOffset, 2))

      let pois3 = [cor, pN, this.bpN]
      outlines.push(this.createOutlineByPois(pois3, 3))
      treadOutlines.push(this.createTreadOutline(pois3, [this.nextVec,this.nextVec], backOffset, 3))
    }
    for (let i = 0; i < 3; i++) {
      let border = new Types.TreadBorder({stepOutline:outlines[i],
                                          treadOutline:treadOutlines[i],
                                          backIndex:[0],
                                          frontIndex:this.lastEdgeIndex === this.corIndex ? [1]:[outlines[i].edges.length - 1]})
      if(i === 0 || i === 2) {
        border.inIndex = this.lastEdgeIndex === this.corIndex ? [2] : [1]
      } else {
        border.inIndex = this.lastEdgeIndex === this.corIndex ? [2, 3] : [1, 2]
      }
      borders.push(border)
    }
    return borders
  }

  //创建三四五类分割踏步轮廓
  createInCutBorders() {
    let outlines = []
    let backOffset = this.parent.getTreadBackOffset()
    let treadOutlines = []
    let frontIndexs = [], inIndexs = []
    let borders = []

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
        let pois1 = [this.bpL, cutP, cor, pL]
        outlines.push(this.createOutlineByPois(pois1, 1))
        treadOutlines.push(this.createTreadOutline(pois1, [this.lastVec,this.lastVec,this.lastVec], backOffset, 1))
        frontIndexs.push([2])
        inIndexs.push([3])

        let pois2 = [pN, cor, cutP, this.bpL, oppo]
        outlines.push(this.createOutlineByPois(pois2, 2))
        treadOutlines.push(this.createTreadOutline(pois2, [this.nextVec, this.nextVec], backOffset, 2))
        frontIndexs.push([1, 2])
        inIndexs.push([3, 4])

      } else if (this.type === Types.LandingCutType.lct_fourth) {
        let pois1 = [this.bpN, cutP, cor, pL, oppo]
        outlines.push(this.createOutlineByPois(pois1, 1))
        treadOutlines.push(this.createTreadOutline(pois1, [this.nextVec, this.nextVec, this.lastVec], backOffset, 1))
        frontIndexs.push([2])
        inIndexs.push([3, 4])

        let pois2 = [pN, cor, cutP, this.bpN]
        outlines.push(this.createOutlineByPois(pois2, 2))
        treadOutlines.push(this.createTreadOutline(pois2, [this.nextVec, this.nextVec], backOffset, 2))
        frontIndexs.push([1, 2])
        inIndexs.push([3])
      } else {
        let pois1 = [this.bpL, cutP, cor, pL]
        outlines.push(this.createOutlineByPois(pois1, 1))
        treadOutlines.push(this.createTreadOutline(pois1, [this.lastVec,this.lastVec,this.lastVec], backOffset, 1))
        frontIndexs.push([2])
        inIndexs.push([3])

        let pois2 = [this.bpN, cutP, this.bpL, oppo]
        outlines.push(this.createOutlineByPois(pois2, 2))
        //let t_pois2 = [this.bpN, cutP, cor, cutP, this.bpL, oppo]
        treadOutlines.push(this.createTreadOutline(pois2, [this.nextVec, this.nextVec, /*this.lastVec*/], backOffset, 2))
        frontIndexs.push([1])
        inIndexs.push([2, 3])

        let pois3 = [pN, cor, cutP, this.bpN]
        outlines.push(this.createOutlineByPois(pois3, 3))
        treadOutlines.push(this.createTreadOutline(pois3, [this.nextVec, this.nextVec], backOffset, 3))
        frontIndexs.push([2])
        inIndexs.push([3])
      }
    } else {
      this.bpL = new Edge(this.sideEdgeL).extendP2(-this.lastStepWidth).p2
      this.bpN = new Edge(this.sideEdgeN).extendP1(-this.nextStepWidth).p1
      let pL = this.edgeL.p1 //上段楼梯对应边的另个端点
      let pN = this.edgeN.p2 //下段楼梯对应边的另个端点
      let cutP = new Edge(inEdgeL).extendP2(-this.nextStepWidth).p2 //内部切割点
      if (this.type === Types.LandingCutType.lct_third) {
        let pois1 = [cor, cutP, this.bpL, pL]
        outlines.push(this.createOutlineByPois(pois1, 1))
        treadOutlines.push(this.createTreadOutline(pois1, [this.lastVec,this.lastVec,this.lastVec], backOffset, 1))
        frontIndexs.push([3])
        inIndexs.push([2])

        let pois2 = [cor, pN, oppo, this.bpL, cutP]
        outlines.push(this.createOutlineByPois(pois2, 2))
        treadOutlines.push(this.createTreadOutline(pois2, [this.nextVec, this.nextVec], backOffset, 2))
        frontIndexs.push([3, 4])
        inIndexs.push([1, 2])

      } else if (this.type === Types.LandingCutType.lct_fourth) {
        let pois1 = [cor, cutP, this.bpN, oppo, pL]
        outlines.push(this.createOutlineByPois(pois1, 1))
        treadOutlines.push(this.createTreadOutline(pois1, [this.lastVec, this.nextVec, this.nextVec], backOffset, 1))
        frontIndexs.push([4])
        inIndexs.push([2, 3])

        let pois2 = [cor, pN, this.bpN, cutP]
        outlines.push(this.createOutlineByPois(pois2, 2))
        treadOutlines.push(this.createTreadOutline(pois2, [this.nextVec, this.nextVec], backOffset, 2))
        frontIndexs.push([2, 3])
        inIndexs.push([1])
      } else {
        let pois1 = [cor, cutP, this.bpL, pL]
        outlines.push(this.createOutlineByPois(pois1, 1))
        treadOutlines.push(this.createTreadOutline(pois1, [this.lastVec,this.lastVec,this.lastVec], backOffset, 1))
        frontIndexs.push([3])
        inIndexs.push([2])

        let pois2 = [cutP, this.bpN, oppo, this.bpL]
        outlines.push(this.createOutlineByPois(pois2, 2))
        //let t_pois2 = [cor, cutP, this.bpN, oppo, this.bpL, cutP]
        treadOutlines.push(this.createTreadOutline(pois2, [/*this.lastVec,*/ this.nextVec, this.nextVec], backOffset, 2))
        frontIndexs.push([3])
        inIndexs.push([1,2])

        let pois3 = [cor, pN, this.bpN, cutP]
        outlines.push(this.createOutlineByPois(pois3, 3))
        treadOutlines.push(this.createTreadOutline(pois3, [this.nextVec, this.nextVec], backOffset, 3))
        frontIndexs.push([2])
        inIndexs.push([1])
      }
    }
    for (let i = 0; i < outlines.length; i++) {
      let border = new Types.TreadBorder({
        stepOutline: outlines[i],
        treadOutline: treadOutlines[i],
        backIndex:[0],
        frontIndex:frontIndexs[i],
        inIndex:inIndexs[i]
      })
      borders.push(border)
    }
    return borders
  }

  createTreadOutline (vPois, vVecs, vBackOffset, vIndex) {
    let i = 0
    let backPois = []
    for (; i < vVecs.length; i++) {
      backPois.push(new Edge().setByVec(vPois[i], vVecs[i], vBackOffset).p2)
    }
    vPois.splice(1, i-2)
    for (let k = 1; k <= backPois.length; k++) {
      vPois.splice(k, 0, backPois[k-1])
    }
    return this.createOutlineByPois(vPois, vIndex)
  }

  createOutlineByPois (vPois, vIndex) {
    let height = this.startHeight + this.stepHeight * vIndex
    let outline = tool.createOutlineByPois(vPois)
    outline.isClock = true
    outline = new Outline(outline).setZCoord(height)
    return outline
  }

  /**
   * 获取休台的终止高度
   * @param {Number} vStartHeight 起始高度 本函数会在rebuildByParent之前调用，类内部的起始高度可能还未更新
   * @returns 
   */
  getEndHeight (vStartHeight) {
    let height = vStartHeight || this.startHeight
    return height + this.stepNum * this.parent.stepHeight
  }

  /**
   * 
   * @param {Object} param0 
   * @param {string} param0.vOrder 当前休台所接楼梯的顺序，前接楼梯为'last',后接楼梯为'next'
   * @returns 
   */
  createGirderRoute ({vSide, vArgs, vOrder, vInLast, vOutLast}) {
    if (vSide === 'out') {
      return []
    }
    let borders = []
    let execute = vOrder === 'last' ? true : false 
    let inLast = vInLast, outLast = vOutLast
    for (let i = 0; i < this.treads.length; i++) {
      let t = this.treads[i]
      let border = null
      if (t.type === Types.TreadType.tCor) {
        t.setCurOrder(vOrder)
        border = t.getGirBorder(vSide, vArgs, vOrder === 'next', inLast, outLast)
        execute = vOrder === 'last' ? false : true
      }else if (execute) {
        border = t.getGirBorder(vSide, vArgs, false, inLast, outLast)
      }
      if (border) {
        inLast = {
          poi:border.inEdges[border.inEdges.length - 1].p2,
          topPoi:border.inTopEdges[border.inTopEdges.length - 1].p2
        }
        outLast = {
          poi:border.outEdges[border.outEdges.length - 1].p2,
          topPoi:border.outTopEdges[border.outTopEdges.length - 1].p2
        }
        borders.push(border)
      } 
    }
    return borders
  }

  createHandEdges({vSide, vArgs}) {
    if (vSide === 'out') {
      return []
    }
    let edges = []
    let lastUtilE = null
    for (const t of this.treads) {
      if (t.type === Types.TreadType.tCor) {
        edges.push(t.getHandEdge('last', vArgs))
        edges.push(t.getHandEdge('next', vArgs))
        lastUtilE = null
      } else {
        let edge = this.treads[i].getHandEdge(vSide, vArgs)
        if (lastUtilE && lastUtilE.isParallelTo(edge)) {
          edges[edges.length - 1] = lastUtilE.combineEdge(edge)
        } else {
          edges.push(edge)
          lastUtilE = new Edge(edge)
        }
      }
    }
    return edges
  }
}