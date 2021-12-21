export const D3Config = {
  /**@type {Map<string, import('./d3_base_model').BaseModel>} */
  MODELS:new Map(),
  /**@type {import('./d3_base_model').BaseModel} */
  HOVER: null,
  /**@type {import('./d3_base_model').BaseModel} */
  SELECTED:null,
  /**@type {Array<THREE.Object3D>} */
  OBJS:[],
  FRAME_MAT: new THREE.LineBasicMaterial({color:0x0000, 
        linewidth:1, 
        /*resolution:new THREE.Vector2(window.innerWidth, window.innerHeight)*/}),
  HOVER_FRAME_MAT: new THREE.LineBasicMaterial({color: 0x2a68c9,
        depthTest: false,
        linewidth: 2,
        /*resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)*/
      }),
  SELECT_FRAME_MAT: new THREE.LineBasicMaterial({color: 0x033480,
        depthTest: false,
        linewidth: 2,
        /*resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)*/
      }),
  LOADED_MAT: new Map(),
  LOADED_GLTF: new Map()
}

export const RENDER_ORDER = {
  FRAME: 10
}

export const D3Default = {
  PANEL_COLOR: 0xffffff,
  lINE_COLOR: 0x000000,
  FLOOR_COLOR: 0xbcac96,
  WALL_COLOR: 0xe5e5e5
}