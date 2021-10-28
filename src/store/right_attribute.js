const state = {
  cur_type: 1,
  cur_args: {},
}

const getters = {}

const mutations = {
  setCurType(state, vType) {
    state.cur_type = vType
    console.log(state.cur_type)
  },

  setCurArgs(state, args) {
    state.cur_args = args
    console.log('cur_args:', state.cur_args)
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
