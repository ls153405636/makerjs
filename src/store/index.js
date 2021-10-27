// import Vue from 'vue'
// import Vuex from 'vuex'
import {createStore} from 'vuex'


import hole from './hole'
import right_attribute from './right_attribute'

//Vue.use(Vuex)

export default createStore({
  modules: {
    hole,
    right_attribute
  }
})