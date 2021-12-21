const state = {
  getArgs: '',
  isFocus: true,
  toStart: 0,
  toEnd: 0,
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
  getDis(state, payload) {
    state.toStart = payload.start
    state.toEnd = payload.end
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
