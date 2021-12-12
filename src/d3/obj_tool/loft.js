import { Types } from '../../types/stair_v2'
import { Edge3 } from '../../utils/edge3'
import d3_tool from '../d3_tool'
import earCut from 'earcut'
import { D3Config, Default } from '../d3_config'

export class Loft {
  /**
   * 
   * @param {import('./loft_outline').LoftOutline} vOutline 
   * @param {Types.Outline} vRoute 
   */
  constructor(vOutline, vRoute) {
    this.outline = vOutline
    /**@type {Array<Array<Types.Vector3>>} */
    this.cutFacePoisSet = []
    this.isClock = vRoute.isClock
    this.isClose = vRoute.isClose
    /**@type {Array<Edge3>}  全部为直线边，为实际放样所需的路径边*/
    this.brokenEdges = []
    /**@type {Array<Edge3>}  未进行拆分的工具边，主要用于后续生成线框*/
    this.wholeUtilEs = []
    this.createRoute(vRoute)
    this.obj = new THREE.Group()
    this.lineFrame = new THREE.Group()
    this.mesh = null
    this.createObj()
  }

  /**
   * 生成放样路径边
   * @param {Types.Outline} vRoute 
   */
  createRoute(vRoute) {
    let pois = []
    for (let i = 0; i < vRoute.edges.length; i++) { 
      let utilE = new Edge3(vRoute.edges[i])
      let e_pois = utilE.getPois()
      //this.wholeUtilEs.push(utilE)
      if (this.isClose || i !== vRoute.edges.length - 1) {
        e_pois.pop()
      }
      pois = pois.concat(e_pois)
    }
    for (let i = 0; i < pois.length; i++) {
      let nextIndex = i+1
      if (i === pois.length - 1) {
        if (this.isClose) {
          nextIndex = 0
        } else {
          break
        }
      }
      let p1 = pois[i]
      let p2 = pois[nextIndex] 
      let edge = new Types.Edge({
        p1: p1, 
        p2: p2,
        type: Types.EdgeType.estraight
      })
      this.brokenEdges.push(new Edge3(edge))
    }
  }

  createObj() {
    for (let i = 0; i < this.brokenEdges.length; i++) {
      let e = this.brokenEdges[i], n_e = this.brokenEdges[i+1]
      if (i === 0) {
        let axis0 = this.createAxis(e, null)
        this.cutFacePoisSet.push(this.createFacePois(e.p1d3, axis0))
      }
      let axis = this.createAxis(e, n_e)
      this.cutFacePoisSet.push(this.createFacePois(e.p2d3, axis))
    }
    let positionAttr = this.createPosAttr()
    let geo = new THREE.BufferGeometry()
    geo.setAttribute('position', positionAttr)
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color:Default.PANEL_COLOR, side:THREE.DoubleSide}))
    this.obj.add(this.mesh)
    this.obj.add(this.lineFrame)
  }

  /**
   * 获取当前截面的坐标轴
   * @param {Edge3} vUtilE 
   * @param {Edge3} vNextUtilE 
   */
  createAxis(vUtilE, vNextUtilE) {
    let x_axis, y_axis, width_rate = 1, height_rate = 1
    let z_axis = vUtilE.getD3Vec()
    let z_axis2 = vNextUtilE ? vNextUtilE.getD3Vec() : null
    let nor2D = vUtilE.getNormal()
    if (!vNextUtilE) {
      y_axis = new THREE.Vector3(0, 1, 0)
      let ref = new THREE.Vector3(0, z_axis.y, z_axis.z)
      height_rate = Math.cos(y_axis.angleTo(ref) / 2)
    } else {
      let axis = new THREE.Vector3().crossVectors(z_axis, z_axis2).normalize()
      let vec2 = new THREE.Vector2(axis.x, axis.z)
      if (vec2.length() > 0.001 && vUtilE.isVerticalToVec2(vec2)) {
        x_axis = axis
        if (this.isClock && (nor2D.distanceTo(vec2) < 0.001 || vUtilE.getLength() < 0.01)) {
          x_axis.negate()
        } else if((!this.isClock) && (nor2D.distanceTo(vec2) > 0.001 && vUtilE.getLength() > 0.01)){
          x_axis.negate()
        }
      } else {
        y_axis = axis
        if (this.isClock) {
          y_axis.negate()
        }
      }
    } 

    if (x_axis) {
      y_axis = this.isClock ? new THREE.Vector3().crossVectors(x_axis, z_axis).normalize() : new THREE.Vector3().crossVectors(z_axis, x_axis).normalize()
      if (z_axis2) {
        let y_axis2 = this.isClock ? new THREE.Vector3().crossVectors(x_axis, z_axis2).normalize() : new THREE.Vector3().crossVectors(z_axis2, x_axis).normalize()
        height_rate = Math.cos(y_axis.angleTo(y_axis2) / 2)
        y_axis = new THREE.Vector3().addVectors(y_axis, y_axis2).normalize()
      }
    } else if (y_axis) {
      x_axis = this.isClock ? new THREE.Vector3().crossVectors(z_axis, y_axis).normalize() : new THREE.Vector3().crossVectors(y_axis, z_axis).normalize()
      if (z_axis2) {
        let x_axis2 = this.isClock ? new THREE.Vector3().crossVectors(z_axis2, y_axis).normalize() : new THREE.Vector3().crossVectors(y_axis, z_axis2).normalize()
        width_rate = Math.cos(x_axis.angleTo(x_axis2) / 2)
        x_axis = new THREE.Vector3().addVectors(x_axis, x_axis2).normalize()
      }
    }

    return {
      x_axis: x_axis,
      y_axis: y_axis,
      width_rate: width_rate,
      height_rate: height_rate
    }
  }

  /**
   * 获取每段截面的点集
   * @param {*} vOri 
   * @param {*} vAxis 
   * @returns 
   */
  createFacePois (vOri, vAxis) {
    let ori = vOri
    let pois = []
    let {x_axis, y_axis, width_rate, height_rate} = vAxis
    this.outline.points.forEach(p => {
      let width = this.outline.getWidth() / width_rate
      //三维放样中路径为中轴线，因此需偏移一半宽度
      let x_length = p.x / width_rate - width / 2 
      let y_length = p.y / height_rate
      let poi = new THREE.Vector3(
        ori.x + x_length * x_axis.x + y_length * y_axis.x,
        ori.y + x_length * x_axis.y + y_length * y_axis.y,
        ori.z + x_length * x_axis.z + y_length * y_axis.z
      )
      
      pois.push(poi)
    })
    return pois
  }

  /**
   * 获取位置属性
   * @returns 
   */
  createPosAttr() {
    let positionArr = []
    let earCutPois = []
    for (const p of this.outline.getPoints()) {
      earCutPois.push(p.x, p.y)
    }
    let cutFaces = earCut(earCutPois)
    for (let i = 0; i < this.cutFacePoisSet.length - 1; i++) {
      let p1_pois = this.cutFacePoisSet[i]
      let p2_pois = this.cutFacePoisSet[i+1]
      //处理侧面
      for (let k = 0; k < p1_pois.length; k++) {
        let curP1 = p1_pois[k], curP2 = p2_pois[k]
        let nextIndex = k === p1_pois.length - 1 ? 0 : k + 1
        let nextP1 = p1_pois[nextIndex], nextP2 = p2_pois[nextIndex]
        positionArr.push(
          curP1.x, curP1.y, curP1.z,
          nextP1.x, nextP1.y, nextP1.z,
          curP2.x, curP2.y, curP2.z,
  
          curP2.x, curP2.y, curP2.z,
          nextP1.x, nextP1.y, nextP1.z,
          nextP2.x, nextP2.y, nextP2.z
        )
        this.lineFrame.add(d3_tool.createFrameByPois([curP1, curP2]))
      }
    }
    //处理截面
    if (!this.isClose) {
      let s_pois = this.cutFacePoisSet[0], e_pois = this.cutFacePoisSet[this.cutFacePoisSet.length - 1]
      for (let k = 0; k < cutFaces.length; k = k + 3) {
        let s_p1 = s_pois[cutFaces[k]],
          s_p2 = s_pois[cutFaces[k + 1]],
          s_p3 = s_pois[cutFaces[k + 2]]
        let e_p1 = e_pois[cutFaces[k]],
          e_p2 = e_pois[cutFaces[k + 1]],
          e_p3 = e_pois[cutFaces[k + 2]]
        positionArr.push(
          s_p1.x, s_p1.y, s_p1.z,
          s_p2.x, s_p2.y, s_p2.z,
          s_p3.x, s_p3.y, s_p3.z,
  
          e_p1.x, e_p1.y, e_p1.z,
          e_p2.x, e_p2.y, e_p2.z,
          e_p3.x, e_p3.y, e_p3.z
        )
      }
      this.lineFrame.add(d3_tool.createFrameByPois(s_pois.concat([s_pois[0]])))
      this.lineFrame.add(d3_tool.createFrameByPois(e_pois.concat([e_pois[0]])))
    }

    return new THREE.Float32BufferAttribute(positionArr, 3)
  }

  getObj () {
    return this.obj
  }
}