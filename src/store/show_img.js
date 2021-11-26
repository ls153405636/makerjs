const state = {
  showImgUrl: '',
}

const getters = {
  getUrl(state) {
    return state.showImgUrl
  }
}

const mutations = {
  getImgUrl(state, payload) {
    state.showImgUrl = payload.url
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
