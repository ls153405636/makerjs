const state = {
  cur_mode: '2d',
}

const getters = {}

const mutations = {
  setCurMode(state, vMode) {
    state.cur_mode = vMode
    console.log('cur_mode:', state.cur_mode)
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}