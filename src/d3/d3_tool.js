import { Types } from "../types/stair_v2"
import { D3Config, RENDER_ORDER } from "./d3_config"
import { D3Scene } from "./d3_scene"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

/**
 * 
 * @param {Types.Vector3} vPBCoord 
 */
function translateCoord (vPBCoord) {
  let y = vPBCoord.z
  let z = vPBCoord.y
  return new THREE.Vector3(vPBCoord.x, y, z)
}

/**
 *
 *
 * @param {Array<THREE.Vector3>} vPois
 * @returns
 */
function createFrameByPois(vPois, vMat = D3Config.FRAME_MAT) {
  let geo = new THREE.BufferGeometry().setFromPoints(vPois)
  let line = new THREE.Line(geo, vMat)
  line.renderOrder = RENDER_ORDER.FRAME
  return line
}

function createFrameByGeo(vGeo, vMat = D3Config.FRAME_MAT) {
  let lineGeo = new THREE.EdgesGeometry(vGeo)
  let lineFrame = new THREE.LineSegments(lineGeo, vMat)
  lineFrame.renderOrder = RENDER_ORDER.FRAME
  return lineFrame
}

/**
 *计算几何体的uv坐标
 *
 * @param {THREE.BufferGeometry} vGeo
 * @param {*} vImgWidth
 * @param {*} vImgHeight
 */
function computeGeoUV(vGeo, vImgWidth, vImgHeight) {
  vGeo.computeVertexNormals()
  let uvArr = []
  let posArr = vGeo.attributes.position.array
  let norArr = vGeo.attributes.normal.array
  for (let i = 0; i < posArr.length; ) {
    let pos = { x: posArr[i], y: posArr[i + 1], z: posArr[i + 2] }
    let nor = { x: norArr[i], y: norArr[i + 1], z: norArr[i + 2] }
    if (Math.abs(nor.z) < Math.abs(nor.y)) {
      if (Math.abs(nor.y) > Math.abs(nor.x)) {
        uvArr.push(pos.x / vImgWidth, pos.z / vImgHeight)
      } else {
        uvArr.push(pos.z / vImgWidth, pos.y / vImgHeight)
      }
    } else {
      if (Math.abs(nor.z) < Math.abs(nor.x)) {
        uvArr.push(pos.z / vImgWidth, pos.y / vImgHeight)
      } else {
        uvArr.push(pos.x / vImgWidth, pos.y / vImgHeight)
      }
    }
    i = i + 3
  }
  vGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvArr, 2))
}

let _LOAD_NUM = 0
let _LOADED_NUM = 0

/**
 *为模型加载材质
 *
 * @param {string} vPath
 * @param {THREE.Mesh} vMesh
 */
function loadMaterial(vPath, vMesh) {
  if (D3Config.LOADED_MAT.get(vPath)) {
    let mat = D3Config.LOADED_MAT.get(vPath).clone()
    computeGeoUV(vMesh.geometry, mat.map.image.width, mat.map.image.height)
    vMesh.material = mat
  } else {
    _LOAD_NUM ++
    new THREE.TextureLoader().load(vPath, function (texture) {
      computeGeoUV(vMesh.geometry, texture.image.width, texture.image.height)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      let material = new THREE.MeshLambertMaterial({map:texture, side:THREE.DoubleSide})
      vMesh.material = material
      _LOADED_NUM ++
      if (_LOADED_NUM === _LOAD_NUM) {
        new D3Scene().render()
        _LOAD_NUM = 0
        _LOADED_NUM = 0
      }
      D3Config.LOADED_MAT.set(vPath, material)
    })
  }
}

let _GLTF_LOAD_NUM = 0
let _GLTF_LOADED_NUM = 0

function loadGltf(vPath, onSuccess) {
  if (D3Config.LOADED_GLTF.get(vPath)) {
    let gltf = D3Config.LOADED_GLTF.get(vPath).clone()
    onSuccess(gltf)
  } else {
    _GLTF_LOAD_NUM++
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    new GLTFLoader().setDRACOLoader(dracoLoader).load(vPath, (object) => {
      onSuccess(object.scene.children[0].clone())
      _GLTF_LOADED_NUM++
      if (_GLTF_LOADED_NUM === _GLTF_LOAD_NUM) {
        new D3Scene().render()
        _GLTF_LOAD_NUM = 0
        _GLTF_LOADED_NUM = 0
      }
      D3Config.LOADED_GLTF.set(vPath, object.scene.children[0])
    })
  }
}

export default {
  translateCoord,
  createFrameByPois,
  createFrameByGeo,
  computeGeoUV,
  loadMaterial,
  loadGltf
}