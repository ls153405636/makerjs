import tool from "../../structure/tool";
import { Types } from "../../types/stair_v2";
import { Edge } from "../../utils/edge";
import { ChildModel } from "../d3_child_model";
import { D3Config, D3Default, RENDER_ORDER } from "../d3_config";
import d3_tool from "../d3_tool";
import earCut from 'earcut'
import { COMP_TYPES } from "../../common/common_config";


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
      for (let k1 = 0; k1 < inEdges.length; k1++) {
        let inE = inEdges[k1], outE = outEdges[k1]
        positionSet = positionSet.concat(this.createHorFace(inE, outE))
        inFrame.add(this.createEdgeLine(inE))
        outFrame.add(this.createEdgeLine(outE))
        if (this.paras.type === Types.GirderType.gslab && i === 0 && k1 === 0) {
          let sInEdge = new Types.Edge({p1:inE.p1, p2:inTEdges[0].p1})
          let sOutEdge = new Types.Edge({p1:outE.p1, p2:outTEdges[0].p1})
          positionSet = positionSet.concat(this.createHorFace(sInEdge, sOutEdge))
          inFrame.add(this.createEdgeLine(sInEdge))
          outFrame.add(this.createEdgeLine(sOutEdge))
        }
        if (i === this.borders.length - 1 && k1 === inEdges.length-1) {
          let eInEdge = new Types.Edge({p1:inE.p2, p2:inTEdges[inTEdges.length-1].p2})
          let eOutEdge = new Types.Edge({p1:outE.p2, p2:outTEdges[outTEdges.length-1].p2})
          positionSet = positionSet.concat(this.createHorFace(eInEdge, eOutEdge))
          inFrame.add(this.createEdgeLine(eInEdge))
          outFrame.add(this.createEdgeLine(eOutEdge))
        }
      }
      for (let k2 = 0; k2 < inTEdges.length; k2++) {
        positionSet = positionSet.concat(this.createHorFace(inTEdges[k2], outTEdges[k2]))
        inFrame.add(this.createEdgeLine(inTEdges[k2]))
        outFrame.add(this.createEdgeLine(outTEdges[k2]))
      }
      positionSet = positionSet.concat(this.createVerFace(inEdges, inTEdges, this.borders[i].dir))
      positionSet = positionSet.concat(this.createVerFace(outEdges, outTEdges, this.borders[i].dir))
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
    let p1 = d3_tool.translateCoord(vEdge.p1)
    let p2 = d3_tool.translateCoord(vEdge.p2)
    let geo = new THREE.BufferGeometry().setFromPoints([p1, p2])
    let line = new THREE.Line(geo, D3Config.FRAME_MAT)
    line.renderOrder = RENDER_ORDER.FRAME
    return line
  }

  /**
   * 
   * @param {Array<Types.Edge>} vBaseEdge 
   * @param {Array<Types.Edge>} vAdaptEdges 
   * @param {Types.Vector3} vDir
   */
  createVerFace(vBotEdges, vTopEdges, vDir) {
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
    pois.forEach(p => {
      if (Math.abs(vDir.y) < 0.1 ) {
        cutFacePois.push(p.x, p.z)
      } else if (Math.abs(vDir.x) < 0.1) {
        cutFacePois.push(p.y, p.z)
      }
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

  createHorFace(vEdge1, vEdge2) {
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