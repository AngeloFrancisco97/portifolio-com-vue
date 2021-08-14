<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="dados.last_page"
      :current-page-aria-label="'page2'"
      :page-aria-label='"page=2"'
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      value="2"
      @input="novaPagina"
    ></v-pagination>
  </div>
</template>
<script>
export default {
    data () {
        return {
          page: this.$store.getters.currentPage,
          quantidadeProjetos: '&quantidadeProjetos=3'
      }
    },
    computed: {
      dados(){
        return this.$store.getters.projetos
      },
    },
    methods: {
        novaPagina(){
            this.$store.dispatch('visualizarProjetos',{page: 'page='+this.page, quantidadeProjetos: this.quantidadeProjetos, currentPage: this.page})
        }
    },
}
</script>

<style>

</style>