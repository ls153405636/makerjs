const state = {
  showImgUrl: '',
  isShow: false,
  needMask: true
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
  needMask(state, payload) {
    state.needMask = payload.mask
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
