<template>
  <v-row dense>
        <v-col cols="12">
          <v-card elevation="20" color="grey darken-3" dark>
            <v-row dense>
                <v-col lg="4" md="4" sm="4">
                <v-avatar class="ma-3 d-flex flex-column" size="auto" tile>
                    <v-img v-if="user.foto_descricao" :src="'http://angelofrancisco.site/storage/'+user.foto_descricao"></v-img>
                    <v-card-actions>
                        <v-btn class="ml-2 mt-3" target="_blank" :href="'http://angelofrancisco.site/storage/'+user.curriculo">
                        Curriculo
                        </v-btn>

                    </v-card-actions>
                </v-avatar>
                </v-col>
                

              <v-col lg="8" md="8" sm="8">
                <v-card-title class="text-h5">Sobre mim</v-card-title>
                <v-card-subtitle style="font-size: 15px" v-html="user.descricao_perfil"></v-card-subtitle>
                <v-divider ></v-divider>
                <v-card-title class="">Informações</v-card-title>
                <v-card-text>
                <v-row dense class="informacoes py-3">
                    <v-col lg="6" md="6" sm="6" cols="12">
                        <p class="mb-2 "><strong>Nome: </strong>{{user.name}}</p>
                    </v-col>
                    <v-col lg="6" md="6" sm="6" cols="12">
                        <p class="mb-2"><strong>Celular: </strong>{{user.celular}}</p>
                    </v-col>
                    <v-col lg="6" md="6" sm="6" cols="12">
                        <p class="mb-2"><strong>Email: </strong>{{user.email}}</p>
                    </v-col>
                    <v-col lg="6" md="6" sm="6" cols="12">
                        <p class="mb-2"><strong>Idade: </strong>{{user.idade}}</p>
                    </v-col>
                    <v-col lg="6" md="6" sm="6" cols="12">
                        <p class="mb-2"><strong>Profissão: </strong>{{user.profissao}}</p>
                    </v-col>
                    <v-col lg="6" md="6" sm="6" cols="12">
                        <p class="mb-2"><strong>Endereco: </strong>{{user.endereco}}</p>
                    </v-col>
                    <v-col lg="6" md="6" sm="6" cols="12" v-for="informacao, chave in user.informacoes" :key="chave">
                        <p class="mb-2"><strong v-html="informacao.tipo+': '"></strong> <span class="link" v-html="informacao.descricao"></span> </p>

                    </v-col>
                </v-row>
                </v-card-text>
              </v-col>
            </v-row>
                <v-divider ></v-divider>
            <div class="d-flex flex-column justify-center">
                <v-card-title class="justify-center text-h5 pb-1">Habilidades</v-card-title>
                <v-card-text class="justify-center">
                    <ListaInformacoes class=""></ListaInformacoes>
                </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
</template>

<script>
import ListaInformacoes from './ListaInformacoes.vue'
//import ListaProjetos from '../components/projetos/ListaProjetos.vue'
export default {
    components: {ListaInformacoes},
    data() {
        return {
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
    },
    methods: {
       carregarConhecimentos() {
            this.$store.dispatch('carregarConhecimentos')
        }
    },
    mounted() {
        this.carregarConhecimentos()
    }
}
</script>

<style>
.link a {
    color:#00E5FF!important;
    text-decoration: none;
}
.informacoes .col-12{
    padding-left: 20px;
}
.informacoes .v-card__text{
        padding: 5px!important;
}
.informacoes{
    border-radius: 10px;
    border: 1px solid white;
}
</style>