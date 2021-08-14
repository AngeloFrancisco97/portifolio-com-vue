<template>
  <v-card elevation="0" color="#263238" min-height="500px">
        <v-row dense>
          <v-col class="mb-3" style="heigth:100%"
            v-for="projeto in projetos.data"
            :key="projeto.id"
            md="4"
            sm="12"
            lg="4"          
          >
            <v-card elevation="20" class="card" color="grey darken-3" style="color:white!important" height="100%" >
              <div>
                <v-img
                  :src="'https://angelofrancisco.site/storage/'+projeto.capa_projeto"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
                  width="100%"
                >
                  <v-card-title v-text="projeto.nome"></v-card-title>
                </v-img>
              </div>
              <div class="card-body mt-2" >
              <v-card-text style="font-size: 18px" class="pb-1" v-text="projeto.descricao"></v-card-text>
              <v-card-subtitle style="font-size: 18px" class="pb-1"><strong>Ferramentas Utilizadas:</strong></v-card-subtitle>
              <v-card-text style="font-size: 15px" v-text="projeto.ferramentas"></v-card-text>
              <v-card-text style="font-size: 15px; text-decoration:none " class="link" v-html="projeto.repositorio"></v-card-text>
              </div>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="primary" @click="visualizarProjeto(projeto)" >
                  visualizar
                  <v-icon class="ml-1" style="font-size: 18px">fas fa-eye</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
  </v-card>
</template>

<script>
export default {
  props:['dados'],
  data() {
    return {
    }
  },
  computed: {
    projetos(){
      return this.$store.getters.projetos
    }
  },
  methods: {
    visualizarProjeto(projeto){
      this.$store.dispatch('visualizarProjeto', {dados: projeto, rota: 'InfoProjeto'})
    }
  },
}
</script>

<style>
  .card-body{
    flex: 1 1 auto;
  }
  .card{
    height: 100%;
    color: white !important;
    display: flex;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
  }
  .card .v-card__text{
    line-height: 1.8rem;
  }
</style>