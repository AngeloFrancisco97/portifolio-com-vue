<template>
  <v-container class="mt-5 mb-5">
      <v-banner
        dark
        elevation="20"
        color="grey darken-3"
        >
            <h2>Projetos Realizados</h2>
        </v-banner>
        <lista-projetos class="mt-2"></lista-projetos>
      <paginacao @novaPaginaTeste="novaPagina"></paginacao>
    </v-container>
</template>

<script>
import ListaProjetos from '../components/projetos/ListaProjetos.vue'
import Paginacao from '../components/projetos/Paginacao.vue'
export default {
    components: {ListaProjetos, Paginacao},
    
    data() {
        return {
            quantidadeProjetos: '&quantidadeProjetos=3',
            page: 'page='+this.$store.getters.currentPage,
            currentPage: this.$store.getters.currentPage
        }
    },
    methods: {
        carregarProjetos() {
            this.$store.dispatch('visualizarProjetos',{page: this.page, quantidadeProjetos: this.quantidadeProjetos, currentPage: this.currentPage})
         },
         novaPagina() {
            this.carregarProjetos()
         }
    },
    created() {
        
        this.carregarProjetos()
    }
    
}
</script>

<style>


    
    .container{
        max-width: 1200px!important;
    }
</style>