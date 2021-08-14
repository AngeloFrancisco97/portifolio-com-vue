<template>
  <v-container class="mt-5 mb-5">
      <sobre class="mb-5"></sobre>
      <v-divider dark></v-divider>
      <v-banner class="mt-5"
        dark
        elevation="20"
        color="grey darken-3"
        >
            <h2>Projetos Recentes</h2>
        </v-banner>
      <lista-projetos class="mt-1"></lista-projetos>
      <div class="w-100 d-flex justify-center mt-3">
        <v-btn dark elevation="20" @click="projetosUrl()" color="grey darken-3" light large right class="">
            Ver Projetos
        </v-btn>
      </div>
    </v-container>
</template>

<script>
import Sobre from '../components/inicio/Sobre.vue'
import ListaProjetos from '../components/projetos/ListaProjetos.vue'
export default {
    components: {Sobre, ListaProjetos},
    
    data() {
        return {
            urlPaginacao: 'page=1',
            quantidadeProjetos: '&quantidadeProjetos=3',
        }
    },
    methods: {
        carregarProjetos() {
            this.$store.dispatch('visualizarProjetos',{page:this.page, quantidadeProjetos: this.quantidadeProjetos,})
        },
        projetosUrl(){
            if(this.$router.currentRoute.name === "Projetos"){
                return 0
            }
            this.$store.dispatch('setPage', 'page=1')
            this.$store.dispatch('setCurrentPage', 1)
            return this.$router.push({ name: 'Projetos'})
        }
    },
    mounted() {
        this.carregarProjetos()
    }
    
}
</script>

<style>


    
    .container{
        max-width: 1200px!important;
    }
</style>