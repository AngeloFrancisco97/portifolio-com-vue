import store from '../store'

export default async (to, from, next) => {
    if ((to.name != 'Login') && !store.getters['token']) {
        try {
            await store.dispatch('actionCheckToken')
            next({ name: to.name})
        } catch (err) {
            if(to.name == 'Login' || to.name == 'Inicio' || to.name == 'Projetos' || to.name == 'Contato' || to.name == 'InfoProjeto'){
                next ()
            }else{
                next ({ name: 'Login'})
            }
        }
    }else {
        if(to.name == 'Login'){
            try{
                await store.dispatch('actionCheckToken')
                if(store.getters['token']){
                    next({ name: 'Admin'})
                }else{
                    next()
                }
            } catch (err){
                next()
            }
        }else {
            next()
        }
    }
}