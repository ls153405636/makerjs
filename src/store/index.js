// import Vue from 'vue'
// import Vuex from 'vuex'
import { createStore } from 'vuex'

import right_attribute from './right_attribute'
import init from './init'
import change_zoom from './change_zoom'
import show_img from './show_img'
import canvas from './canvas'

//Vue.use(Vuex)

export default createStore({
  modules: {
    right_attribute,
    init,
    change_zoom,
    show_img,
    canvas,
  },
})
