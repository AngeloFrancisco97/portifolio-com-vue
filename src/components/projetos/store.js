
const axios = require('axios').default;
//import router from '../../router'
export default({
  state: {
    projetos: [],
    page: '',
    nomeProjeto: '',
    currentPage: 1,
    urlProjeto: 'https://angelofrancisco.site/api/projeto',
  },
  mutations: {
      setProjetos(state, projetos){
          state.projetos = projetos
      },
      setPage(state, page){
        state.page = page
      },
      setCurrentPage(state, currentPage){
        state.currentPage = currentPage
      }
  },
  actions: {
    setProjetos({commit}, projetos){
      commit('setProjetos', projetos)
    },
    setPage({commit}, page){
      commit('setPage', page)
    },
    setCurrentPage({commit},currentPage){
      commit('setCurrentPage', currentPage)
    },
    visualizarProjetos({dispatch, state}, {page, quantidadeProjetos, currentPage}){
      axios.get(state.urlProjeto + '?'+ page + quantidadeProjetos)
                .then(response => {
                  const projetos = response.data
                  dispatch('setProjetos', projetos)
                  dispatch('setPage', page)
                  dispatch('setCurrentPage', currentPage)
                })
                .catch(errors => {
                    console.log(errors.response)
                })
    },
    adicionarProjeto({dispatch, getters, state}, {dados, imagens}){
      let formData = new FormData()
      formData.append('nome', dados.nome)
      formData.append('capa_projeto', imagens)
      formData.append('descricao', dados.descricao)
      formData.append('descricao_completa', dados.descricao_completa)
      formData.append('ferramentas', dados.ferramentas)
      formData.append('repositorio', dados.repositorio)

      let config = {
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ getters.token
        }
      }
      axios.post(state.urlProjeto, formData, config)
                .then(response => {
                  console.log(response.data)
                  dispatch('visualizarProjetos',{page: getters.page, quantidadeProjetos: '&quantidadeProjetos', currentPage: getters.currentPage})
                })
                .catch(errors => {
                    console.log(errors.response)
                })
    },
    editarProjeto({dispatch, getters, state}, {dados, imagens}){
      let formData = new FormData()
      formData.append('nome', dados.nome)
      if(imagens != ''){
        formData.append('capa_projeto', imagens)
      }
      formData.append('descricao', dados.descricao)
      formData.append('descricao_completa', dados.descricao_completa)
      formData.append('ferramentas', dados.ferramentas)
      formData.append('repositorio', dados.repositorio)
      formData.append('_method', 'patch')

      let config = {
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ getters.token
        }
      }
      axios.post(state.urlProjeto + '/' + dados.id, formData, config)
                .then(response => {
                  console.log(response.data)
                  dispatch('visualizarProjetos',{page: getters.page, quantidadeProjetos: '&quantidadeProjetos', currentPage: getters.currentPage})
                })
                .catch(errors => {
                    console.log(errors.response)
                })
    },
    deletarProjeto({dispatch, getters, state},dados){
      let config = {
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+ getters.token
        }
      }
      axios.delete(state.urlProjeto + '/' + dados.id, config)
          .then(response => {
            console.log(response)
            dispatch('visualizarProjetos',{page: getters.page, quantidadeProjetos: '&quantidadeProjetos', currentPage: getters.currentPage})
          })
          .catch(errors => {
              console.log(errors.response)
              //errors.response.data.message
          })
    },

  },
  getters: {
    projetos(state){
        return state.projetos
    },
    page(state){
        return state.page
    },
    currentPage(state){
        return state.currentPage
    }
  },
  modules: {
  }
})
