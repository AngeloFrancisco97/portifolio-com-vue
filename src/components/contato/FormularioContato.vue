<template>
  <v-container>
      <v-banner class="mt-5"
        dark
        elevation="20"
        color="grey darken-3"
        >
            <h2>Entre em Contato!!</h2>
            <p style="font-size: 17px">Envie uma mensagem, seja para alguma proposta, sugestão ou informação!! </p>
        </v-banner>
      <v-card elevation="20" class="mt-2" color="grey darken-3">
        <v-form class="pa-4"
          dark
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row class="m-0">
            <v-col cols="12" lg="6" md="6" sm="12">
              <v-text-field
                dark
                v-model="nome"
                :rules="nameRules"
                label="Nome"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12">
              <v-text-field
                dark
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12">
              <v-textarea
                dark
                v-model="mensagem"
                :rules="mensagemRules"
                label="Mensagem"
                required
                :counter="300"
              ></v-textarea>
            </v-col>
          </v-row>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="enviarEmail"
        >
          Enviar
        </v-btn>
      </v-form>
      <div class="w-100 d-flex justify-center pb-3">
      <v-progress-circular v-if="progresso"  :width="5" :size="70" color="green" indeterminate></v-progress-circular>
      <v-alert v-if="emailEnviado" elevation="20" class="mt-2" type="success">Mensagem enviada com sucesso!</v-alert>
      </div>
    </v-card>
  </v-container>
</template>

<script>

  export default {
    data: () => ({
      urlContato: 'https://angelofrancisco.site/api/novo-contato',
      valid: true,
      nome: '',
      nameRules: [
        v => !!v || 'O nome é obrigatório',
        v => (v && v.length <= 50) || 'O Nome tem que ter menos que 50 caracteres',
      ],
      email: '',
      emailRules: [
        v => !!v || 'O mmail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'O Email tem que ser válido',
      ],
      mensagemRules: [
        v => !!v || 'A Mensagem é obrigatoria',
        v => (v && v.length <= 300) || 'O Email tem que ter menos que 300 caracteres',
      ],
      mensagem: '',
      select: null,
      emailEnviado: false,
      progresso: false,
    }),

    methods: {
      enviarEmail () {
        if(this.$refs.form.validate()){
          const axios = require('axios').default;
          this.emailEnviado = false
          this.progresso = true
          let parametros = []
          parametros = {'nome': this.nome, 'email': this.email, 'mensagem': this.mensagem}
            let config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }
            axios.get(this.urlContato, {params: parametros}, config)
                .then(response => {
                    //this.projetoDetalhes = response.data
                    //this.idProjeto = id
                    this.progresso = false
                    this.emailEnviado = true
                    this.$refs.form.reset()
                    console.log(response.data)
                })
                .catch(errors => {
                  this.progresso = false
                  console.log(errors.response)
                })
        }else{
          console.log('mensagem nao enviada')
        }
      },
    },
  }
</script>

<style>

</style>