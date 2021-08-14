<template>
  <div>
    <v-card elevation="10" dark color="">
        <v-toolbar
            class="testandoUmBagui"
            dark
            color=""
            elevation="20"
            >
            <v-container class="" style="padding: 0px!important">
                <v-toolbar class="testandoUmBagui flex-column d-flex"
                    dark
                    color=""
                    elevation="0"
                    >
                    <v-toolbar-items>
                    <router-link height="100%" to="/">
                        <v-img contain class="" src="https://angelofrancisco.site/storage/imagens/AngeloFranciscoClaro.png">
                        </v-img>
                    </router-link>
                    </v-toolbar-items>
                    <v-spacer></v-spacer>
                    <v-toolbar-items class="align-center">
                        <Icons tamanho="35px"></Icons>
                    </v-toolbar-items>
                </v-toolbar>
            </v-container>
        </v-toolbar>
        <v-img
            class="white--text align-end imgFixed"
            height="500px"
            src="http://127.0.0.1:8000/storage/imagens/backgroundProgramador.jpg"
            dark
            >
            <v-card-title class="d-flex flex-column justify-center" style="padding-bottom:100px" >
                <v-avatar class="mb-3"
                size="150"
                >
                    <img v-if="user.foto_perfil"
                      :src="'https://angelofrancisco.site/storage/'+user.foto_perfil"
                      alt="Angelo"
                    >

                </v-avatar>
                <span style="font-size: 40px!important">{{user.name}}</span>
                <span class="mt-3">{{user.profissao}}</span>
            </v-card-title>
            <v-container>
                <v-toolbar
                dark
                color="transparent"
                elevation="0"
                >
                <v-toolbar-items>
                    <v-btn color="rgba(255,0,0,0.0)" elevation="0" to="/">Inicio</v-btn>
                    <v-btn color="rgba(255,0,0,0.0)" elevation="0" @click="projetos()">Projetos</v-btn>
                    <v-btn color="rgba(255,0,0,0.0)" elevation="0" to="/contato">Contato</v-btn>
                    <v-btn v-if="$store.getters.token" color="rgba(255,0,0,0.0)" elevation="0" to="/admin">Admin</v-btn>
                    <v-btn v-if="$store.getters.token" color="rgba(255,0,0,0.0)" elevation="0" @click="logout">Logout</v-btn>
                </v-toolbar-items>
                <!-- <v-btn icon>
                    <v-icon>mdi-export</v-icon>
                </v-btn> -->
                </v-toolbar>
            </v-container>
        </v-img>
        
    </v-card>
    
  </div>
</template>

<script>
import Icons from '../components/Icons.vue'
export default {
    components:{Icons},
    data() {
        return {
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
            return this.$router.push({ name: 'Login' })
        },
        projetos(){
            if(this.$router.currentRoute.name === "Projetos"){
                return 0
            }
            this.$store.dispatch('setPage', 'page=1')
            this.$store.dispatch('setCurrentPage', 1)
            return this.$router.push({ name: 'Projetos', params: { projetos: 'projetos' } })
        },
        carregarAngelo() {
            this.$store.dispatch('carregarUsuario')
        },
        
    },
    mounted() {
        this.carregarAngelo()
    },
}
</script>

<style>
 .imgFixed .v-image__image--cover{
     background-attachment: fixed;
     opacity: 0.2;
 }
 .testandoUmBagui .v-image{
  height: 100%!important;
 }
 @media only screen and (max-width: 600px) {
 .testandoUmBagui, .testandoUmBagui .v-toolbar__content{
  height: 100%!important;
  flex-direction: column!important;
 }
 .testandoUmBagui .v-image{
  height: 80px!important;
 }
 .testandoUmBagui .v-toolbar__content .v-toolbar__items .v-card__text .v-btn .v-btn__content .v-icon {
     font-size: 25px!important
 }
 .testandoUmBagui .v-toolbar__content .v-toolbar__items .v-card__text{
     padding:0px
 }
 .testandoUmBagui .v-toolbar__content{
     padding-top: 0px;
 }
     
 }
</style>