<template>
<v-container >

    <div class="d-flex flex-column justify-center align-center" style="margin: 100px auto">
        <v-banner class="mt-5"
        dark
        elevation="20"
        color="grey darken-3"
        width="60%"
        >
            <h2>Login</h2>
        </v-banner>
        <v-card elevation="20" class="mt-2" max-width="800px" width="60%" color="grey darken-3">
            <v-form class="pa-4"
            dark
            ref="form"
            v-model="valid"
            lazy-validation
            >
                <v-row class="m-0">
                    <v-col cols="12">
                    <v-text-field
                        dark
                        type="email"
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                    <v-text-field
                        dark
                        v-model="senha"
                        :rules="senhaRules"
                        label="Senha"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="login"
                >
                Enviar
                </v-btn>
            </v-form>
            <div class="w-100 d-flex justify-center pb-3">
            <v-alert v-if="informacoesInvalidas" elevation="20" class="mt-2" type="success">Mensagem enviada com sucesso!</v-alert>
            </div>
        </v-card>
    </div>
</v-container>
</template>

<script>
    export default {
        data() {
            return {
                urlLogin: 'https://angelofrancisco.site/api/login',
                show1: false,
                email: '',
                senha: '',
                informacoesInvalidas: '',
                emailRules: [
                    v => !!v || 'O Email é obrigatório',
                    v => /.+@.+\..+/.test(v) || 'O Email tem que ser válido',
                ],
                senhaRules: [
                    v => !!v || 'A senha é obrigatório',
                ],
                valid: false,
                token: '',
                
            }
        },
        methods: {
                login(){
                    this.$store.dispatch('login', { email:this.email, senha: this.senha})
                    
            }
        },
    }
</script>
<style>
    
</style>