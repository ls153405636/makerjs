import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { ChildInfo } from "../child_info";
import { Default } from "../config";
import { SmallColumn } from "../small_column";
import tool from "../tool";


export class Tread extends ChildInfo {
  constructor({vParent, vIsLast}) {
    super(vParent)
    this.inheritH = true
    this.isLast = vIsLast
    this.parent = vParent
    this.type = Types.TreadType.tph
    this.stepLength = 0
    this.stepWidth = 0
    this.inheritW = false
    this.inheritL = false
    this.position = new Types.Vector3()
    this.clock = true
    /**@type {Types.TreadBorder} */
    this.border = null
  }

  rebuildByParent({vIndex}) {
    if (this.inheritH) {
      this.stepHeight = this.parent.stepHeight
    }
    this.index = vIndex
  }

  getArgs() {
    return {
      stepHeight : {
        name: '步高',
        value: {
          inheritH: { name: '继承楼梯段', value: this.inheritH, type: 'switch' },
          stepHeight: {
            name: '数值',
            value: this.stepHeight,
            type: 'input',
            disabled: this.inheritH,
          },
        },
        type: 'group',
      }
    }
  }

  getColPos() {}

  getDirection() {
    return new Types.Vector3({x:-this.wVec.x, y:-this.wVec.y})
  }

  updateItem (vValue, vKey, vSecondKey) {
    if (['inheritW', 'inheritH', 'inheritL', 'stepLength', 'stepHeight'].includes(vSecondKey)) {
      this[vSecondKey] = vValue
    }
    else {
      super.updateItem(vValue, vKey, vSecondKey)
    }
  }

  /**
   *获取生成大梁扶手大小柱时的对应工具边
   * @param {string} vSide
   * @returns {Edge}
   * @memberof Tread
   */
  getSideUtilE (vSide) {
    let edge = this.border.stepOutline.edges[this.border[vSide+'Index'][0]]
    let utilE = new Edge(edge)
    let gArgs = this.parent.parent.getGirderParas(vSide)
    let sideOffset = gArgs.type === Types.GirderType.gslab ? -this.parent.parent.sideOffset : this.parent.parent.sideOffset
    if (this.type === Types.TreadType.tSpec) {
      /**休台踏板轮廓一定是顺时针*/
      utilE.offset(sideOffset, false)
      if (!this.flodClock) {
        utilE.reserve()
      }
    } else {
      if (this.stepLength !== this.parent.stepLength && vSide === 'out') {
        utilE.offset(this.stepLength - this.parent.stepLength, !this.clock)
      }
      utilE.offset(sideOffset, !this.clock)
      if (vSide === 'out') {
        utilE.reserve()
      }
    }
    return utilE
  }

  /**
   * 得到踏板单位的大梁轮廓
   * @param {string} vSide 
   * @param {Types.GirderParameters} vArgs 
   * @param {boolean} vIsFirst 此踏板是否为当前大梁所包含的第一个踏板
   */
   getGirBorder (vSide, vArgs, vIsFirst, vInLast, vOutLast) {
    let utilE = this.getGirUtilE({vSide, vArgs})
    let depth = this.parent.parent.treadParameters.depth
    if (vArgs.type === Types.GirderType.gsaw) {
      utilE.setZCoord(this.position.z - depth)
    }
    let inUtilE = utilE.clone(), outUtilE = utilE.clone()
    inUtilE.offset(vArgs.depth/2, vSide !== 'in')
    outUtilE.offset(vArgs.depth/2, vSide === 'in')
    let inRst, outRst
    if (vArgs.type === Types.GirderType.gsaw) {
      inRst = this.createSideSawBorder({utilE:inUtilE, vIsFirst, vArgs, vLast:vInLast})
      outRst = this.createSideSawBorder({utilE:outUtilE, vIsFirst, vArgs, vLast:vOutLast})
    } else {
      inRst = this.createSideSlabBorder({utilE:inUtilE, vIsFirst, vArgs, vLast:vInLast})
      outRst = this.createSideSlabBorder({utilE:outUtilE, vIsFirst, vArgs, vLast:vOutLast})
    }
    return new Types.TreadGirBorder({
      inEdges: inRst.edges,
      inTopEdges: inRst.topEdges,
      outEdges: outRst.edges,
      outTopEdges: outRst.topEdges,
      dir:this.getDirection()
    })
  }

  /**
   * 得到踏板上方对应的扶手路径
   * @param {string} vSide 
   * @param {Types.HandrailParameters} vArgs 
   */
  getHandEdge(vSide, vArgs) {
    let bArgs = this.parent.parent.getBigColParas()
    let utilE = this.getSideUtilE(vSide)
    let edge = utilE.writePB()
    let nextT = this.getNextTread() || this
    if (this.index === 1) {
      if (bArgs.posType === Types.BigColumnPosType.bcp_second) {
        return null
      } else if (bArgs.posType === Types.BigColumnPosType.bcp_first) {
        edge = utilE.extendP1(-this.stepWidth/2)
        edge.p1.z = this.position.z + vArgs.height + nextT.stepHeight/2
        edge.p2.z = nextT.position.z + vArgs.height
      } else {
        let bigColSize = tool.parseSpecification(bArgs.specification)
        let offset = Default.BIG_COL_GAP + bigColSize.y / 2 
        edge = utilE.extendP1(offset)
        let offset_h = nextT.stepHeight * offset / this.stepWidth
        edge.p1.z = this.position.z + vArgs.height - offset_h
        edge.p2.z = nextT.position.z + vArgs.height
      }
    } else if (this.index === 2 && bArgs.posType === Types.BigColumnPosType.bcp_second) {
      edge = utilE.extendP1(-this.stepWidth/2)
      edge.p1.z = this.position.z + vArgs.height + nextT.stepHeight/2
      edge.p2.z = nextT.position.z + vArgs.height
    } else {
      edge.p1.z = this.position.z + vArgs.height
      edge.p2.z = (this.getNextTread()?.position.z || this.position.z + this.stepHeight) + vArgs.height
    }
    return edge
  }

  /**
   * 获取当前踏板上的小柱
   * @param {*} vSide
   * @param {Types.SmallColParameters} vArgs
   * @param {*} vLastNum
   * @memberof Tread
   */
  getSmallCols(vSide, vArgs, vIsFirst, vLastNum) {
    let num = this.getSmallColNum(vArgs, vIsFirst, vLastNum)
    if (num === 0) {
      return []
    }
    let rateArr = this.getSmallColRateArr(num, vArgs)
    let sCols = [], utilE = this.getSideUtilE(vSide), dir = this.getDirection()
    let length = utilE.getLength()
    let stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    /**@type {Types.HandrailParameters} */
    let hArgs = this.parent.parent.getHandParas(vSide)
    /**@type {Types.GirderParameters} */
    let gArgs = this.parent.parent.getGirderParas(vSide)
    for (const rate of rateArr) {
      let pos = new Edge().setByVec(utilE.getP1PB(), dir, length * rate).p2
      let size = tool.parseSpecification(vArgs.specification)
      if (gArgs.type === Types.GirderType.gslab) {
        size.z = hArgs.height - this.getUpGirVerHeight(gArgs)
        pos.z = this.position.z + this.getUpGirVerHeight(gArgs) + stepHeight * rate
      } else {
        size.z = stepHeight * rate + hArgs.height
        pos.z = this.position.z
      }
      let smallCol = new SmallColumn(this.parent.parent, pos, size)
      sCols.push(smallCol) 
    }
    return sCols
  }

  /**
   *计算当前踏步上的小柱数量
   * @param {Types.SmallColParameters} vArgs
   * @param {boolean} vIsFirst 本踏板是否为所属楼梯段的第一级踏板
   * @param {*} vLastNum
   * @memberof Tread
   */
  getSmallColNum(vArgs, vIsFirst, vLastNum) {
    /**@type {Types.BigColParameters} */
    let bArgs = this.parent.parent.getBigColParas()
    if (bArgs.posType === Types.BigColumnPosType.bcp_first && this.index === 1) {
      return 0
    }
    if (bArgs.posType === Types.BigColumnPosType.bcp_second && this.index <= 2) {
      return 0
    }
    if (vArgs.arrangeRule === Types.ArrangeRule.arrTwo) {
      return 1
    }
    if (vArgs.arrangeRule === Types.ArrangeRule.arrFour) {
      return 2
    }
    if (vIsFirst) {
      if (this.parent.index === 0 && this.parent.parent.startFlight) {
        return 2
      } else {
        return 1
      }
    } else {
      if (vLastNum === 2) {
        return 1
      } else {
        return 2
      }
    }
  }

  /**
   * 根据当前踏步小步数量和参数得出小柱在步宽方向上的位置比例数组
   * @param {Number} vNum 
   * @param {Types.SmallColParameters} vArgs 
   */  
  getSmallColRateArr (vNum, vArgs) {
    if (vNum === 1) {
      return [1/2]
    } 
    if (vArgs.arrangeRule === Types.ArrangeRule.arrThree) {
      let size = tool.parseSpecification(vArgs.specification)
      if (size.x / this.stepWidth > 1/12) {
        return [1/6, 5/6]
      } else {
        return [size.x/2/this.stepWidth, 1 - size.x/2/this.stepWidth]
      }
    } else {
      return [1/4, 3/4]
    }
  }

  /**
   *获取生成大梁的工具边
   * @param {string} vSide
   * @param {Types.GirderParameters} vArgs
   * @returns
   * @memberof Tread
   */
  getGirUtilE({vSide, vArgs}) {
    let utilE = this.getSideUtilE(vSide)
    let backOffset = this.parent.parent.getTreadBackOffset()
    if (vArgs.type === Types.GirderType.gsaw) {
      utilE.extendP1(-backOffset)
      if (this.index !== this.parent.parent.realStepNum) {
        utilE.extendP2(backOffset)
      }
    }
    return utilE
  }

  adaptGirLastPois(topPois, botPois, vLast) {
    if (vLast?.poi && (!tool.isVec3Equal(vLast.poi, botPois[0]))) {
      //botPois.splice(0, 0, vLast.poi)
      if (vLast.poi.z === 0) {
        botPois.splice(0,0,vLast.poi)
      } else {
        botPois[0] = vLast.poi
      }
    } 
    if (vLast?.topPoi && (!tool.isVec3Equal(vLast.topPoi, topPois[0]))) {
      //topPois.splice(0, 0, vLast.topPoi)
      topPois[0] = vLast.topPoi
    }
  }

  /**
   * 生成锯齿型大梁轮廓
   * @param {*} utilE
   * @param {*} vIsFirst
   * @param {*} vArgs
   * @param {*} vLast
   * @returns
   * @memberof Tread
   */
  createSideSawBorder ({utilE, vIsFirst, vArgs, vLast}) {
    let botPois = [], topPois = []
    topPois[0] = utilE.getP1PB()
    topPois[1] = utilE.getP1PB()
    topPois[2] = utilE.getP2PB()
    botPois[0] = utilE.getP1PB()
    botPois[1] = utilE.getP2PB()
    let verHeight = this.getGirVerHeight(vArgs)
    if (vIsFirst && this.parent.index === 0 && this.parent.startHeight >= verHeight) {
      botPois[0].z = 0
      botPois[1].z = 0
    } else {
      let angle = Math.atan(this.stepHeight / this.stepWidth)
      botPois[0].z = Math.max(botPois[0].z - this.stepHeight - verHeight, 0)
      if (this.index === this.parent.parent.realStepNum) {
        botPois[1].z = botPois[1].z - verHeight - this.parent.parent.getTreadBackOffset() * Math.tan(angle)
      } else {
        botPois[1].z = Math.max(botPois[1].z -verHeight, 0)
      }
      if (botPois[0].z === 0 && botPois[1].z > 0) {
        let p = utilE.clone().extendP2(-botPois[1].z / Math.tan(angle)).p2
        p.z = botPois[0].z
        if (!tool.isVec3Equal(botPois[0], p)) {
          botPois.splice(1, 0, p)
        }
      }
    }
    if (this.type === Types.TreadType.tCor) {
      if (this.curOrder === 'last') {
        let lastT = this.getLastTread()
        let heightDiff = lastT.getGirVerHeight(vArgs) + this.stepHeight - verHeight
        let widthDiff = heightDiff / (Math.atan(lastT.stepHeight / lastT.stepWidth))
        if (widthDiff > utilE.getLength()) {
          widthDiff = utilE.getLength() / 2
        }
        botPois[0] = utilE.clone().extendP1(- widthDiff).p1
      }
      botPois[0].z = botPois[1].z
      if (this.curOrder === 'last' && vLast) {
        botPois.splice(0, 0, vLast.poi)
      }
    }
    if (vIsFirst) {
      topPois[0].z = botPois[0].z
    } else {
      topPois[0].z -= this.stepHeight
    }
    this.adaptGirLastPois(topPois, botPois, vLast)
    let edges = tool.createOutlineByPois(botPois, false).edges
    let topEdges = tool.createOutlineByPois(topPois, false).edges
    return {edges, topEdges}
  }

  /**
   * 生成平板型大梁轮廓
   * @param {Edge} utilE 
   * @param {*} vIsFirst 
   * @param {Types.GirderParameters} vArgs 
   * @param {*} vLast 
   */
  createSideSlabBorder ({utilE, vIsFirst, vArgs, vLast}) {
    let botPois = [], topPois = []
    topPois[0] = utilE.getP1PB()
    topPois[1] = utilE.getP2PB()
    botPois[0] = utilE.getP1PB()
    botPois[1] = utilE.getP2PB()
    let verHeight = this.getGirVerHeight(vArgs)
    let stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    let angle = Math.atan(stepHeight / this.stepWidth)
    let upVerHeight = this.getUpGirVerHeight(vArgs)
    botPois[0].z -= verHeight
    botPois[1].z -= (verHeight - stepHeight)
    topPois[0].z += upVerHeight
    topPois[1].z += (upVerHeight + stepHeight)
    if (vIsFirst && this.parent.index === 0 && this.parent.startHeight >= (verHeight - this.stepHeight)) {
      botPois[0].z = 0
      botPois[1].z = 0
    } else {
      botPois[0].z = botPois[0].z - (this.parent.index === 0 ? vArgs.bSuppotHeight : 0) > 0 ? botPois[0].z : 0
      botPois[1].z = botPois[1].z - (this.parent.index === 0 ? vArgs.bSuppotHeight : 0) > 0 ? botPois[1].z : 0
      if (botPois[0].z === 0 && botPois[1].z > 0) {
        let p2Dis = botPois[1].z  / Math.tan(angle)
        let supportDis = vArgs.bSuppotHeight / Math.tan(angle)
        let p = utilE.clone().extendP2(-p2Dis + supportDis).p2
        p.z = 0
        if (!tool.isVec3Equal(p, botPois[0])) {
          botPois.splice(1, 0, p)
        }
        if (vArgs.bSuppotHeight) {
          let p1 = new Types.Vector3({x:p.x, y:p.y, z:vArgs.bSuppotHeight})
          botPois.splice(botPois.length - 1, 0, p1)
        }
      }
      if (this.index === 1) {
        let tP = utilE.clone().extendP1(vArgs.fOffsetStep).p1
        tP.z += (upVerHeight - vArgs.fOffsetStep * Math.tan(angle))
        topPois[0] = tP
        let bP = utilE.clone().extendP1(vArgs.fOffsetStep).p1
        bP.z = botPois[0].z
        botPois[0] = bP
      }
    }
    this.adaptGirLastPois(topPois, botPois, vLast)
    let edges = tool.createOutlineByPois(botPois, false).edges
    let topEdges = tool.createOutlineByPois(topPois, false).edges
    return {edges, topEdges}
  }

  /**
   *获取大梁上方距上顶点的垂直高度
   * @param {*} vArgs
   * @returns
   * @memberof Tread
   */
  getUpGirVerHeight (vArgs) {
    let stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    let angle = Math.atan(stepHeight / this.stepWidth)
    let upVerHeight = (50 + vArgs.aboveHeight) / Math.cos(angle)
    return upVerHeight
  }

  /**
   *获取大梁下方距顶点的垂直高度
   *锯齿型为距下顶点，平板型为距上顶点
   * @param {*} vArgs
   * @returns
   * @memberof Tread
   */
  getGirVerHeight (vArgs) {
    let stepHeight = this.stepHeight
    if (vArgs.type === Types.GirderType.gslab) {
      stepHeight = this.getNextTread()?.stepHeight || this.stepHeight
    }
    let angle = Math.atan(stepHeight / this.stepWidth)
    return vArgs.height / Math.cos(angle)
  }

  getLastTread() {
    let lastT = this.parent.treads[this.index - this.parent.treadIndex - 2]
    if (!lastT) {
      let lastF = this.parent.parent.segments[this.parent.index - 1]
      lastT = lastF?.treads[lastF.treads.length - 1]
    }
    return lastT
  }

  getNextTread() {
    let nextT = this.parent.treads[this.index - this.parent.treadIndex]
    if (!nextT) {
      let nextF = this.parent.parent.segments[this.parent.index + 1]
      nextT = nextF?.treads[0]
    }
    return nextT
  }

  /**
   *休台踏板，根据内工具边获取外工具边
   *
   * @param {Edge} vInSideUtilE
   * @memberof Tread
   */
  getOutSideUtilE(vInSideUtilE) {
    let outUtilE = vInSideUtilE.clone()
    let inGArgs = this.parent.parent.getGirderParas('in')
    let outGArgs = this.parent.parent.getGirderParas('out')
    let offsetDis
    if (this.type === Types.TreadType.tCor) {
      let offsetEdgeIndex = this.curOrder === 'last' ? this.nextEdgeIndex : this.lastEdgeIndex
      offsetDis = new Edge(this.border.stepOutline.edges[offsetEdgeIndex]).getLength()
    } else if (this.index === this.parent.treadIndex + 1) {
      offsetDis = this.getLastTread().stepLength
    } else {
      offsetDis = this.getNextTread().stepLength
    }
    if (inGArgs.type === Types.GirderType.gslab) {
      offsetDis += inGArgs.depth / 2
    } else {
      offsetDis -= this.parent.parent.sideOffset
    }
    if (outGArgs.type === Types.GirderType.gslab) {
      offsetDis += outGArgs.depth /2
    } else {
      offsetDis -= this.parent.parent.sideOffset
    }
    if (this.flodClock) {
      outUtilE.offset(offsetDis, false)
    } else {
      outUtilE.offset(offsetDis, true)
    }
    return outUtilE
  }


  writePB() {
    return new Types.Tread({
      uuid:this.uuid,
      index:this.index,
      isLast:this.isLast,
      border:this.border,
      stepHeight:this.stepHeight,
      stepWidth:this.stepWidth,
      stepLength:this.stepLength,
      inheritH:this.inheritH,
      inheritW:this.inheritW,
      inheritL:this.inheritL,
      type:this.type
    })
  }

}