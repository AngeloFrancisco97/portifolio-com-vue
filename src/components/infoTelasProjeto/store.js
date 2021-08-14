import router from '../../router'
const axios = require('axios').default;
export default ({
  state: {
    projeto: [],
    urlProjeto: 'https://angelofrancisco.site/api/projeto',
    urlImagensProjeto: 'https://angelofrancisco.site/api/projeto_imagem'
  },
  mutations: {
    setProjeto(state, projeto) {
      state.projeto = projeto
    }
  },
  actions: {
    visualizarProjeto({
      commit,state
    }, {
      dados,
      rota
    }) {
      axios.get(state.urlProjeto + '/' + dados.id)
        .then(response => {
          const projeto = response.data
          commit('setProjeto', projeto)
          if(rota){
            return router.push({
              name: rota
            })
          }
        })
        .catch(errors => {
          console.log(errors.data)
        })
    },
    adicionarTelaProjeto({
      dispatch,
      getters,
      state
    }, {
      dados,
      imagens
    }) {
      console.log(dispatch, imagens)
      let formData = new FormData()
      formData.append('projeto_id', dados.projeto_id)
      formData.append('titulo', dados.titulo)
      formData.append('descricao', dados.descricao)
      formData.append('imagens_projeto', imagens)

      let config = {
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getters.token
        }
      }

      axios.post(state.urlImagensProjeto, formData, config)
        .then(response => {
          console.log(response.data)
          dispatch('visualizarProjeto', {
            dados: {id: dados.projeto_id}
          })
        })
        .catch(errors => {
          console.log(errors.response)
        })
    },
    editarTelaProjeto({
      dispatch,
      getters,
      state
    }, {
      dados,
      imagens
    }) {
      console.log(dispatch, imagens)
      let formData = new FormData()
      formData.append('projeto_id', dados.projeto_id)
      formData.append('titulo', dados.titulo)
      formData.append('descricao', dados.descricao)
      if(imagens != ''){
        formData.append('imagens_projeto', imagens)
      }
      formData.append('_method', 'patch')
        
      let config = {
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getters.token
        }
      }

      axios.post(state.urlImagensProjeto + '/' + dados.id, formData, config)
        .then(response => {
          console.log(response.data)
          dispatch('visualizarProjeto', {
            dados: {id: dados.projeto_id}
          })
        })
        .catch(errors => {
          console.log(errors.response)
        })
    },
    deletarTelaProjeto({dispatch, getters, state},dados){
      let config = {
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ getters.token
        }
      }

      axios.delete(state.urlImagensProjeto + '/' + dados.id, config)
          .then(response => {
            console.log(response)
            dispatch('visualizarProjeto', {
              dados: {id: dados.projeto_id}
            })          })
          .catch(errors => {
              console.log(errors.response)
              //errors.response.data.message
          })
    },
  },
  getters: {
    projeto(state) {
      return state.projeto
    }
  },
  modules: {}
})