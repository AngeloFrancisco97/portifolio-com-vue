import Vue from 'vue'
import VueRouter from 'vue-router'
import Projetos from '../views/Projetos.vue'
import Inicio from '../views/Inicio.vue'
import InfoProjeto from '../views/InfoProjeto.vue'
import Contato from '../views/Contato.vue'
import Login from '../views/Login.vue'
import Admin from '../components/admin/Home.vue'
import AdminProjetos from '../components/admin/Projetos.vue'
import AdminUsuarios from '../components/admin/Usuarios.vue'
import AdminiConhecimentos from '../components/admin/Conhecimentos.vue'
import AdminTelasProjeto from '../components/admin/TelasProjeto.vue'
import AdminInformacoesUsuario from '../components/admin/InformacoesUsuario.vue'
import beforeEach from './beforeEach'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: Projetos
  },
  {
    path: '/projeto/:projeto',
    name: 'InfoProjeto',
    component: InfoProjeto
  },
  {
    path: '/contato',
    name: 'Contato',
    component: Contato
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [{
        path: 'projetos',
        name: 'AdminProjetos',
        component: AdminProjetos,
      },
      {
        path: 'usuarios',
        name: 'AdminUsuarios',
        component: AdminUsuarios,
      },
      {
        path: 'informacoes',
        name: 'AdminInformacoesUsuario',
        component: AdminInformacoesUsuario,
      },
      {
        path: 'conhecimentos',
        name: 'AdminConhecimentos',
        component: AdminiConhecimentos,
      },
      {
        path: 'telas_projeto',
        name: 'AdminTelasProjeto',
        component: AdminTelasProjeto,
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(beforeEach)

export default router
