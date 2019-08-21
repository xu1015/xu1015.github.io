import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user.js'
import app from './module/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
