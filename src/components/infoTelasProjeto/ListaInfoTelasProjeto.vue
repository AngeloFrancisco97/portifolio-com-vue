<template>
  <v-card elevation="0" color="#263238" min-height="500px">
        <v-row dense>
          <v-col class="mb-3" style="heigth:100%"
            v-for="projeto in telasProjeto.imagens_projeto"
            :key="projeto.id"
            md="4"
            sm="12"
            lg="4"          
          >
            <v-card elevation="20" class="card" color="grey darken-3" style="color:white!important" height="100%" >
              <div>
                <v-img
                  :src="'https://angelofrancisco.site/storage/'+projeto.imagens_projeto"
                  class="white--text align-end"
                  width="100%"
                >
                </v-img>
              </div>
              <div class="card-body mt-2" >
              <v-card-text style="font-size: 20px" class="pb-1" v-text="projeto.titulo"></v-card-text>
              <v-card-text style="font-size: 17px" class="pb-5" v-text="projeto.descricao"></v-card-text>
              </div>
              <v-divider></v-divider>
              <!-- <v-card-actions>
                <v-btn color="primary" @click="visualizarProjeto(projeto)" small >
                  visualizar
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-col>
        </v-row>
  </v-card>
</template>

<script>
export default {
  
  data() {
    return {
    }
  },
  computed: {
    telasProjeto(){
      return this.$store.getters.projeto
    }
  },
  methods: {
    visualizarProjeto(projeto){
      this.$store.state.projeto = projeto
      return this.$router.push({ name: 'InfoProjeto', params: { projeto: this.$store.state.projeto.nome } })
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