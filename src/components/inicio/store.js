const axios = require('axios').default;
import router from '../../router'
export default({
  state: {
    user: [],
    users: [],
    conhecimentos: [],
    informacoes:[],
    urlUsuario: 'https://angelofrancisco.site/api/user',
    urlInformacao: 'https://angelofrancisco.site/api/informacao',
    urlConhecimento: 'https://angelofrancisco.site/api/conhecimento',
  },
  mutations: {
      setUser(state, user){
          state.user = user
      },
      setUsers(state, users){
          state.users = users
      },
      setConhecimentos(state, conhecimentos){
          state.conhecimentos = conhecimentos
      },
      setInformacoes(state, informacoes){
          state.informacoes = informacoes
      }
  },
  actions: {
    // Actions Usuarios
    carregarUsuario({commit, state}) {
        axios.get(state.urlUsuario+'/1')
            .then(response => {
                const user = response.data
                commit('setUser', user)
            })
            .catch(errors => {
                console.log(errors)
            })
    },
    carregarUsuarios({commit, state}) {
        axios.get(state.urlUsuario)
            .then(response => {
                const users = response.data
                commit('setUsers', users)
            })
            .catch(errors => {
                console.log(errors)
            })
    },
    editarUsuario({dispatch, getters, state}, {dados}){
        let formData = new FormData()
        console.log(dados)
            formData.append('name', dados.name)
            formData.append('email', dados.email)
            formData.append('idade', dados.idade)
            formData.append('descricao_perfil', dados.descricao_perfil)
            // if(foto_perfil[0]){
            //     formData.append('foto_perfil', foto_perfil[0])
            // }
            // if(foto_descricao[0]) {
            //     formData.append('foto_descricao', foto_descricao[0])
            // }  
            // if(curriculo[0]){
            //     formData.append('curriculo', curriculo[0])
            // }
            formData.append('celular', dados.celular)
            formData.append('endereco', dados.endereco)
            formData.append('profissao', dados.profissao)
            formData.append('_method', 'patch')
            let config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ getters.token
                }
            }
            
                axios.post(state.urlUsuario+'/'+dados.id, formData, config)
                    .then(response => {
                        console.log(response)
                        dispatch('carregarUsuarios')
                    })
                    .catch(errors => {
                        console.log(errors)
                        //errors.response.data.message
                    })
    },
    //Fim Actions Usuarios

    //Actions Conhecimentos
    visualizarInformacoes({commit, state}, {dados, rota}) {
        axios.get(state.urlInformacoes+ '/' + dados.id)
                  .then(response => {
                    const informacao = response.data
                    commit('setInformacoes', informacao)
                    if(rota){
                        return router.push({ name: rota })
                    }
                  })
                  .catch(errors => {
                      console.log(errors)
                  })
    },
    adicionarInformacaoUsuario({dispatch, getters, state}, {dados}){
        let formData = new FormData()
        console.log(dados)
            formData.append('tipo', dados.tipo)
            formData.append('descricao', dados.descricao)
            formData.append('user_id', dados.user_id)

            let config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ getters.token
                }
            }
            
                axios.post(state.urlInformacao, formData, config)
                    .then(response => {
                        console.log(response.data)
                        dispatch('visualizarInformacoes', {dados: {id: dados.user_id}})
                    })
                    .catch(errors => {
                        console.log(errors.response)
                        //errors.response.data.message
                    })
    },
    editarInformacaoUsuario({dispatch, getters, state}, {dados}){
        let formData = new FormData()
            formData.append('tipo', dados.tipo)
            formData.append('descricao', dados.descricao)
            formData.append('user_id', dados.user_id)
            formData.append('_method', 'patch')
            let config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ getters.token
                }
            }
                axios.post(state.urlInformacao+'/'+dados.id, formData, config)
                    .then(response => {
                        console.log(response.data)
                        dispatch('visualizarInformacoes', {dados: {id: dados.user_id}})
                    })
                    .catch(errors => {
                        console.log(errors.data)
                        //errors.response.data.message
                    })
    },
    deletarInformacaoUsuario({dispatch, getters, state},dados){
        let config = {
          headers: {
            'Content-type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ getters.token
          }
        }
        axios.delete(state.urlInformacao + '/' + dados.id, config)
            .then(response => {
              console.log(response.data)
              dispatch('visualizarInformacoes', {dados: {id: dados.user_id}})
            })
            .catch(errors => {
                console.log(errors.response)
                //errors.response.data.message
            })
      },
    //fim Actions Conhecimentos

    //Actions Conhecimentos
    carregarConhecimentos({commit, state}) {
        axios.get(state.urlConhecimento)
            .then(response => {
                const conhecimentos = response.data
                commit('setConhecimentos', conhecimentos)
            })
            .catch(errors => {
                console.log(errors)
            })
    },
    adicionarConhecimento({dispatch, getters, state}, {dados}){
        let formData = new FormData()
        console.log(dados)
            formData.append('habilidade', dados.habilidade)

            let config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ getters.token
                }
            }
            
                axios.post(state.urlConhecimento, formData, config)
                    .then(response => {
                        console.log(response)
                        dispatch('carregarConhecimentos')
                    })
                    .catch(errors => {
                        console.log(errors)
                        //errors.response.data.message
                    })
    },
    editarConhecimento({dispatch, getters, state}, {dados}){
        let formData = new FormData()
        console.log(dados)
            formData.append('habilidade', dados.habilidade)
            formData.append('_method', 'patch')
            let config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ getters.token
                }
            }
                axios.post(state.urlConhecimento+'/'+dados.id, formData, config)
                    .then(response => {
                        console.log(response)
                        dispatch('carregarConhecimentos')
                    })
                    .catch(errors => {
                        console.log(errors)
                        //errors.response.data.message
                    })
    },
    deletarConhecimento({dispatch, getters, state},dados){
        let config = {
          headers: {
            'Content-type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ getters.token
          }
        }
        axios.delete(state.urlconhecimento + '/' + dados.id, config)
            .then(response => {
              console.log(response)
              dispatch('carregarConhecimentos')
            })
            .catch(errors => {
                console.log(errors.response)
                //errors.response.data.message
            })
      },
    //fim Actions Conhecimentos
  },
  getters: {
    user(state){
        return state.user
    },
    users(state){
        return state.users
    },
    conhecimentos(state){
        return state.conhecimentos
    },
    informacoes(state){
        return state.informacoes
    }
  },
  modules: {
  }
})
