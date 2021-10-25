import Vue from 'vue'
import Vuex from 'vuex'

import hole from './hole'
import right_attribute from './right_attribute'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    hole,
    right_attribute
  }
})