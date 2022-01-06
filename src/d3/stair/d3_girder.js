import tool from "../../structure/tool";
import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { ChildModel } from "../d3_child_model";
import { D3Config, D3Default, RENDER_ORDER } from "../d3_config";
import d3_tool from "../d3_tool";
import earCut from 'earcut'
import { COMP_TYPES } from "../../common/common_config";
import { Edge3 } from "../../utils/edge3";


export class Girder extends ChildModel {
  /**
   * 
   * @param {} vParent 
   * @param {Types.Girder} vPB 
   * @param {Types.GirderParameters} vParas 
   */
  constructor(vParent, vPB, vParas) {
    super(vParent, vPB.uuid)
    this.init(vPB, vParas)
  }

  /**
   * 
   * @param {Types.Girder} vPB 
   * @param {Types.GirderParameters} vParas 
   */
  init(vPB, vParas) {
    this.paras = vParas
    this.borders = vPB.borders
    this.createObj()
  }

  createObj() {
    let positionSet = []
    this.lineFrame = new THREE.Group()
    let inFrame = new THREE.Group(), outFrame = new THREE.Group()
    for (let i = 0; i < this.borders.length; i++) {
      let inEdges = [...this.borders[i].inEdges]
      let inTEdges = [...this.borders[i].inTopEdges]
      let outEdges = [...this.borders[i].outEdges]
      let outTEdges = [...this.borders[i].outTopEdges]
      let lastTE = inTEdges[inTEdges.length - 1]
      let div = 0
      if (lastTE.type === Types.EdgeType.earc) {
        let angleDiff = Math.abs(lastTE.endAngle - lastTE.startAngle)
        angleDiff = angleDiff > Math.PI ? Math.PI * 2 - angleDiff : angleDiff
        div = angleDiff / Math.PI * 12
        div = Math.max(Number(div.toFixed(0)), 2)
      }

      //添加起始面和终止面
      if (this.paras.type === Types.GirderType.gslab && i === 0) {
        let inE = inEdges[0], outE = outEdges[0]
        let sInEdge = new Types.Edge({p1:inE.p1, p2:inTEdges[0].p1, type:Types.EdgeType.estraight})
        let sOutEdge = new Types.Edge({p1:outE.p1, p2:outTEdges[0].p1, type:Types.EdgeType.estraight})
        positionSet = positionSet.concat(this.createFaceByDoubleEdges(sInEdge, sOutEdge))
        inFrame.add(this.createEdgeLine(sInEdge))
        outFrame.add(this.createEdgeLine(sOutEdge))
      }
      if (i === this.borders.length - 1) {
        let inE = inEdges[inEdges.length-1], outE = outEdges[inEdges.length-1]
        let eInEdge = new Types.Edge({p1:inE.p2, p2:inTEdges[inTEdges.length-1].p2, type:Types.EdgeType.estraight})
        let eOutEdge = new Types.Edge({p1:outE.p2, p2:outTEdges[outTEdges.length-1].p2, type:Types.EdgeType.estraight})
        positionSet = positionSet.concat(this.createFaceByDoubleEdges(eInEdge, eOutEdge))
        inFrame.add(this.createEdgeLine(eInEdge))
        outFrame.add(this.createEdgeLine(eOutEdge))
      }

      //添加底面
      for (let k1 = 0; k1 < inEdges.length; k1++) {
        let inE = inEdges[k1], outE = outEdges[k1]
        positionSet = inE.type === Types.EdgeType.earc ? 
                      positionSet.concat(this.createArcFaceByDoubleEdges(inE, outE, div))
                      : positionSet.concat(this.createFaceByDoubleEdges(inE, outE))
        inFrame.add(this.createEdgeLine(inE))
        outFrame.add(this.createEdgeLine(outE))
      }

      //添加顶面
      for (let k2 = 0; k2 < inTEdges.length; k2++) {
        positionSet = inTEdges[k2].type === Types.EdgeType.earc?
                      positionSet.concat(this.createArcFaceByDoubleEdges(inTEdges[k2], outTEdges[k2], div)) 
                      : positionSet.concat(this.createFaceByDoubleEdges(inTEdges[k2], outTEdges[k2]))
        inFrame.add(this.createEdgeLine(inTEdges[k2]))
        outFrame.add(this.createEdgeLine(outTEdges[k2]))
      }

      //添加侧面
      if (div > 0) {
        positionSet = positionSet.concat(this.createArcVerFace(inEdges, inTEdges, div))
        positionSet = positionSet.concat(this.createArcVerFace(outEdges, outTEdges, div))
      } else {
        positionSet = positionSet.concat(this.createVerFace(inEdges, inTEdges, this.borders[i].dir))
        positionSet = positionSet.concat(this.createVerFace(outEdges, outTEdges, this.borders[i].dir))
      }
    }
    let positionAttr = new THREE.Float32BufferAttribute(positionSet, 3)
    let geo = new THREE.BufferGeometry()
    geo.setAttribute('position', positionAttr)
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:D3Default.PANEL_COLOR, side:THREE.DoubleSide}))
    d3_tool.loadMaterial(this.paras.material.path, this.mesh)
    this.mesh.userData.uuid = this.uuid
    this.mesh.userData.d3Type = 'obj'
    this.lineFrame.add(inFrame, outFrame)
    this.obj = new THREE.Group()
    this.obj.add(this.mesh, this.lineFrame)
  }

  createEdgeLine(vEdge) {
    // let p1 = d3_tool.translateCoord(vEdge.p1)
    // let p2 = d3_tool.translateCoord(vEdge.p2)
    let pois = new Edge3(vEdge).getPois()
    let d3pois = []
    pois.forEach(p => {
      d3pois.push(d3_tool.translateCoord(p))
    })
    let geo = new THREE.BufferGeometry().setFromPoints(d3pois)
    let line = new THREE.Line(geo, D3Config.FRAME_MAT)
    line.renderOrder = RENDER_ORDER.FRAME
    return line
  }

  /**
   * 生成垂直面信息
   * @param {Array<Types.Edge>} vBotEdges 
   * @param {Array<Types.Edge>} vTopEdges 
   * @param {Types.Vector3} vDir
   */
  createVerFace(vBotEdges, vTopEdges) {
    let pois = []
    let edges = [...vBotEdges]
    for (let i = vTopEdges.length - 1; i > -1; i--) {
      let e = vTopEdges[i]
      let newEdge = new Edge(e).reserve()
      newEdge.p2.z = e.p1.z
      newEdge.p1.z = e.p2.z
      edges.push(newEdge)
    }
    for (let i = 0; i < edges.length; i++) {
      if ((!pois[pois.length-1]) || (!tool.isVec3Equal(pois[pois.length-1], edges[i].p1))) {
        pois.push(edges[i].p1)
      }
      if (!tool.isVec3Equal(pois[pois.length-1], edges[i].p2)) {
        pois.push(edges[i].p2)
      }
    }
    let cutFacePois = []
    let utilO = new THREE.Vector2(vBotEdges[0].p1.x, vBotEdges[0].p1.y) 
    pois.forEach(p => {
      let utilP = new THREE.Vector2(p.x, p.y)
      let x = new THREE.Vector2().subVectors(utilP, utilO).length()
      cutFacePois.push(x, p.z)
    })
    let poiIndexs = earCut(cutFacePois)
    let positionSet = []
    for (let i = 0; i < poiIndexs.length; i = i+3) {
      let a = poiIndexs[i], b = poiIndexs[i+1], c = poiIndexs[i+2]
      let p1 = d3_tool.translateCoord(pois[a]) , p2 = d3_tool.translateCoord(pois[b]), p3 = d3_tool.translateCoord(pois[c])
      positionSet.push(
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z
      )
    }
    return positionSet
  }

  /**
   *生成弧形垂直面
   *
   * @param {Array<Types.Edge>} vBotEdges 
   * @param {Array<Types.Edge>} vTopEdges 
   * @param {Types.Vector3} vDir
   * @memberof Girder
   */
  createArcVerFace(vBotEdges, vTopEdges, vDiv) {
    let positionSet = []
    let tE = vTopEdges[vTopEdges.length - 1]
    for (let i = 0; i < vBotEdges.length; i++) {
      if (vBotEdges[i].type !== Types.EdgeType.earc) {
        vBotEdges.splice(i,1)
      }
    }
    let e1 = vBotEdges[0], e2 = vBotEdges[1]
    if (e2) {
      let angle1 = e1.startAngle, angle2 = e1.endAngle, angle3 = e2.endAngle
      let height = tE.p2.z - tE.p1.z
      let tE1 = new Edge(tE).rotateP2(-Math.abs(angle3 - angle2))
      tE1.p2.z = tE.p1.z + height * Math.abs((angle2-angle1)/(angle3-angle1))
      let tE2 = new Edge(tE).rotateP1(-Math.abs(angle2 - angle1))
      tE2.p1.z = tE1.p2.z
      let div1 = vDiv * Math.abs((angle2-angle1)/(angle3-angle1))
      div1 = Math.max(Number(div1.toFixed(0)), 2) 
      let div2 = vDiv - div1
      div2 = Math.max(div2, 2)
      positionSet = positionSet.concat(this.createArcFaceByDoubleEdges(tE1, e1, div1))
      positionSet = positionSet.concat(this.createArcFaceByDoubleEdges(tE2, e2, div2))
    } else {
      positionSet = positionSet.concat(this.createArcFaceByDoubleEdges(tE, e1, vDiv))
    }
    return positionSet
  }

  /**
   *生成两条边围成的面
   *
   * @param {*} vEdge1
   * @param {*} vEdge2
   * @returns
   * @memberof Girder
   */
  createFaceByDoubleEdges(vEdge1, vEdge2) {
    let e1P1 = d3_tool.translateCoord(vEdge1.p1)
    let e1P2 = d3_tool.translateCoord(vEdge1.p2)
    let e2P1 = d3_tool.translateCoord(vEdge2.p1)
    let e2P2 = d3_tool.translateCoord(vEdge2.p2)
    return [
      e1P1.x, e1P1.y, e1P1.z,
      e2P1.x, e2P1.y, e2P1.z,
      e2P2.x, e2P2.y, e2P2.z,

      e1P1.x, e1P1.y, e1P1.z,
      e1P2.x, e1P2.y, e1P2.z,
      e2P2.x, e2P2.y, e2P2.z
    ]
  }

  /**
   *生成两条边围成的弧形面
   *
   * @param {Types.Edge} vEdge1
   * @param {Types.Edge} vEdge2
   * @memberof Girder
   */
  createArcFaceByDoubleEdges(vEdge1, vEdge2, vDiv) {
    let utilE1 = new Edge3(vEdge1)
    let utilE2 = new Edge3(vEdge2)
    let pois1 = utilE1.getPois(vDiv)
    let pois2 = utilE2.getPois(vDiv)
    let positionSet = []
    for (let i = 0; i < pois1.length - 1; i++) {
      let e1P1 = d3_tool.translateCoord(pois1[i])
      let e1P2 = d3_tool.translateCoord(pois1[i+1])
      let e2P1 = d3_tool.translateCoord(pois2[i])
      let e2P2 = d3_tool.translateCoord(pois2[i+1])
      positionSet.push(
        e1P1.x, e1P1.y, e1P1.z,
        e2P1.x, e2P1.y, e2P1.z,
        e2P2.x, e2P2.y, e2P2.z,

        e1P1.x, e1P1.y, e1P1.z,
        e1P2.x, e1P2.y, e1P2.z,
        e2P2.x, e2P2.y, e2P2.z
      )
    }
    return positionSet
  }

  setHover(vIsHover) {
    let mat = vIsHover ? D3Config.HOVER_FRAME_MAT : D3Config.FRAME_MAT
    this.setLineMaterial(mat)
  }

  setSelected(vIsSelected) {
    let mat = vIsSelected ? D3Config.SELECT_FRAME_MAT : D3Config.FRAME_MAT
    this.setLineMaterial(mat)
  }

  setLineMaterial(vMaterila) {
    this.lineFrame.traverse(c => {
      if (c.material) {
        c.material = vMaterila
      }
    })
  }

  getCompType() {
    return COMP_TYPES.GIRDER
  }
}

export class ArcGirder extends Girder {
  constructor(vParent, vPB, vParas) {
    super(vParent, vPB, vParas)
  }
}