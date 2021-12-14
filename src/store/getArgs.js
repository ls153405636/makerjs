const state = {
  getArgs: '',
  isFocus: true,
}

const getters = {
  // getArgs(state) {
  //   return state.showImgUrl
  // }
}

const mutations = {
  getArgs(state, payload) {
    state.getArgs = payload.url
    // state.isShow = payload.value
  },
  getFocus(state, payload) {
    state.isFocus = payload.focus
    // state.isShow = payload.value
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
