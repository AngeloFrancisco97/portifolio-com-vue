const axios = require('axios').default;
import router from '../../router'
export default {
    state: {
        token: ''
      },
      mutations: {
        setToken(state, token){
            state.token = token
        }
      },
      actions: {
        logout({ commit }){
            localStorage.setItem('token', '')
            commit('setToken', '')
        },
        login({ commit }, {email, senha}){
                const urlLogin = 'https://angelofrancisco.site/api/login'
                let formData = new FormData()
                formData.append('email', email)
                formData.append('password', senha)

                let config = {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Accept': 'application/json'
                    }
                }
                    axios.post(urlLogin, formData, config)
                        .then(response => {
                            const token = response.data.token
                            localStorage.setItem('token', token)
                            commit('setToken', token)
                            return router.push({ name: 'Admin' })
                        })
                        .catch(errors => {
                            console.log(errors.response)
                            //errors.response.data.message
                        })
        },
        actionCheckToken({ commit , state}){
            if (state.token){
                return Promise.resolve(state.token)
            }

            const token = localStorage.getItem('token')

            if (!token) {
                return Promise.reject(new Error('Token Inválido'))
            }

            commit('setToken', token)
        }
      },
      getters: {
          token(state) {
              return state.token
          }
      },
      modules: {

      }
}