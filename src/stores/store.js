import Vue from 'vue'
import Vuex from 'vuex'
import managements from '@/stores/managements'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    managements
  }
})