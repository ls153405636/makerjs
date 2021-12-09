export const D3Config = {
  MODELS:new Map(),
  SELECTED:null,
  OBJS:[],
  FRAME_MAT_LINE: new THREE.LineBasicMaterial({color:0x0000, 
        linewidth:1, 
        /*resolution:new THREE.Vector2(window.innerWidth, window.innerHeight)*/}),
  HOVER_FRAME_MAT_LINE: new THREE.LineBasicMaterial({color: 0xFF9E57,
        depthTest: false,
        linewidth: 2,
        /*resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)*/
      }),
  SELECT_FRAME_MAT_LINE: new THREE.LineBasicMaterial({color: 0xC15200,
        depthTest: false,
        linewidth: 2,
        /*resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)*/
      }),
}

export const Default = {
  PANEL_COLOR: 0xce4e25,
  lINE_COLOR: 0x000000
}