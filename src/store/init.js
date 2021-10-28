import { Types } from "../types/stair_v2"


const state = {
  cur_hole_type: 'rect',
  hole_types:[
    {name:'矩形洞口', value:'rect', imgPath:''},
    {name:'L形洞口', value:'L', imgPath:''},
    {name:'梯形洞口', value:'trape', imgPath:''},
    {name:'圆形洞口', value:'circle', imgPath:''},
  ],
  stair_types:[
    {value:'', label:'整体楼梯'}
  ],
  stair_against_wall_options:[
    {value:Types.AgainstWallType.aw_left, label:'左靠墙'},
    {value:Types.AgainstWallType.aw_right, label:'右靠墙'},
    {value:Types.AgainstWallType.aw_no, label:'不靠墙'},
  ],
  stair_shape_options:[
    {value:Types.StairType.sstright, label:'直梯'}
  ],
  stair_dir_options:[]
}

const getters = {

}

const mutations = {
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
