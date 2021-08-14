<template>
<div>
  <v-container class="mt-5 mb-5">
      <v-banner
        dark
        elevation="20"
        color="grey darken-3"
        >
          <v-btn color="primary" class="mb-5" @click="$router.back()">
            Voltar
            <v-icon class="ml-3">fas fa-chevron-circle-left</v-icon>
          </v-btn>
          <h2>{{telasProjeto.nome}}</h2>
          <p class="mt-3" style="font-size: 18px">{{telasProjeto.descricao_completa}}</p>
        </v-banner>
      <ListaInfoProjeto></ListaInfoProjeto>
    </v-container>
</div>
</template>

<script>
import ListaInfoProjeto from '../components/infoTelasProjeto/ListaInfoTelasProjeto.vue'
export default {
    components: {ListaInfoProjeto},
    computed: {
    telasProjeto(){
      return this.$store.getters.projeto
    }
  },
}
</script>

<style>

</style>