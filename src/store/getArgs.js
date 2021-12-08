const state = {
  getArgs: '',
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
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
