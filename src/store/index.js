import Vue from 'vue'
import Vuex from 'vuex'

import login from '../components/login/store.js'
import telasProjeto from '../components/infoTelasProjeto/store.js'
import projetos from '../components/projetos/store.js'
import inicio from '../components/inicio/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    telasProjeto,
    projetos,
    inicio
  }
})
