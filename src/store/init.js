import { Types } from '../types/stair_v2'

const state = {
  cur_hole_type: 'rect',
  hole_types: [
    {
      name: '矩形洞口',
      value: 'rect',
      imgPath: '../../images/home1.png',
    },
    { name: 'L形洞口', value: 'L', imgPath: '../../images/home1.png' },
    {
      name: '梯形洞口',
      value: 'trape',
      imgPath: '../../images/home1.png',
    },
    {
      name: '圆形洞口',
      value: 'circle',
      imgPath: '../../images/home1.png',
    },
  ],
  stair_types: {
    name: '楼梯类型',
    options: {
      0: { value: '1', label: '整体楼梯' },
      1: { value: '2', label: '水泥楼梯', disabled: true },
    },
    value: { value: '1', label: '整体楼梯' },
  },
  stair_against_wall_options: {
    name: '靠墙方式',
    options: {
      0: { value: Types.AgainstWallType.aw_left, label: '左靠墙' },
      1: { value: Types.AgainstWallType.aw_right, label: '右靠墙' },
      2: { value: Types.AgainstWallType.aw_no, label: '不靠墙' },
    },
    value: { value: Types.AgainstWallType.aw_left, label: '左靠墙' },
  },
  stair_shape_options: {
    name: '楼梯形状',
    options: {
      0: { value: Types.StairType.sstright, label: '直梯' },
    },
    value: { value: Types.StairType.sstright, label: '直梯' },
  },
  stair_dir_options: {
    name: '转向方式',
    options: {
      0: { value: '1', label: '左转' },
      1: { value: '2', label: '右转' },
      2: { value: '3', label: '不转' },
    },
    value: { value: '1', label: '不转' },
  },
}

const getters = {}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
