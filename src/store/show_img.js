const state = {
  showImgUrl: '',
  isShow: false
}

const getters = {
  getUrl(state) {
    return state.showImgUrl
  }
}

const mutations = {
  getImgUrl(state, payload) {
    state.showImgUrl = payload.url
    state.isShow = payload.value
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
