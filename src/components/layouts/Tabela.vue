<template>
    <v-data-table
            dark
            :page="currentPage"
            :headers="cabecalho"
            :items="dados"
            :items-per-page="5"
            class="elevation-20"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>{{titulo.tituloTabela}}</v-toolbar-title>
                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                    v-model="dialog"
                    max-width="800px"
                    dark
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                        Novo {{titulo.nome}}
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            sm="12"
                                            md="12"
                                            v-for="editedProjeto, chave in dadosFiltrados" :key="chave"
                                        >
                                            <v-file-input v-if="titulos[chave].tipo == 'img' && editIndex == -1"
                                            :label="titulos[chave].titulo"
                                            :rules="rules"
                                            @change="carregarImagem($event)"
                                            accept="image/png, image/jpeg, image/bmp"
                                            required
                                            ></v-file-input>
                                            <v-file-input v-else-if="titulos[chave].tipo == 'img' && editIndex != -1"
                                            :label="titulos[chave].titulo"
                                            @change="carregarImagem($event)"
                                            accept="image/png, image/jpeg, image/bmp"
                                            ></v-file-input>
                                            <v-text-field v-else-if="titulos[chave].id"
                                            disabled
                                            :value="camposProntos[chave] = id"
                                            :label="titulos[chave].titulo"
                                            :rules="rules"
                                            required
                                            ></v-text-field>
                                            <v-text-field v-else
                                            v-model="camposProntos[chave]"
                                            :label="titulos[chave].titulo"
                                            :rules="rules"
                                            required
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                :disabled="!valid"
                                @click="save"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" dark max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5" style="word-break: normal">Tem certeza que quer deletar o {{titulo.nome}} {{dadosEditado.id}}?</v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editProjeto(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        class="mr-2"
                        small
                        @click="deleteProjeto(item)"
                    >
                        mdi-delete
                    </v-icon>
                    <v-icon v-if="visualizar.existe" 
                        small
                        @click="visualizarDados(item)"
                    >
                        mdi-eye
                    </v-icon>
            </template>
            <template v-slot:no-data>
            <v-btn
                color="primary"
            >
                Reset
            </v-btn>
            
        </template>
        </v-data-table>
</template>

<script>
export default {
    props: ['id','cabecalho', 'visualizar', 'titulo', 'dados', 'defaultItem', 'titulos', 'editar', 'salvar', 'deletar'],
    // filters: {
    //     fomartarLabel: function (texto){
    //         let textoFormatado = texto.replace('_', ' ')
    //         return textoFormatado.toUpperCase()
    //     }
    // },
    data() {
        return {
            currentPage: this.$store.getters.currentPage,
            dialog: false,
            dialogDelete: false,
            valid: true,
            rules: [ v => !!v || 'O campo é Obrigatório',],
            editIndex: -1,
            dadosEditado: {},
            camposProntos: {},
            imagem: [],
            

        }
    },
    computed: {
        formTitle() {
            return this.editIndex === -1 ? 'Novo ' + this.titulo.nome : 'Editar ' + this.titulo.nome
        },
        dadosFiltrados() {
            if(this.editIndex != -1){
                let dadosFiltrados = {}
                let campos = Object.keys(this.titulos)
                this.dadosEditado.map((item) => {
                    let itemFiltrado = {}
                    campos.forEach(campo => {
                        itemFiltrado[campo] = item[campo]
                    })
                    dadosFiltrados = itemFiltrado
                    this.camposProntos = itemFiltrado
                })
                return dadosFiltrados
            }else {
                return Object.assign({}, this.defaultItem)
            }
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },  
    methods: {
        carregarImagem(e){
            this.imagem = e
        },
        close(){
            this.$refs.form.resetValidation()
            this.dialog = false
            this.dadosEditado = Object.assign({}, this.defaultItem)
            this.camposProntos = Object.assign({}, this.defaultItem)
            this.editIndex = -1
        },
        save(){
            if(this.$refs.form.validate()){
                if(this.editIndex == -1){
                    this.$store.dispatch(this.salvar,{dados: this.camposProntos, imagens: this.imagem})
                }else {
                    this.$store.dispatch(this.editar,{dados: this.camposProntos, imagens: this.imagem})
                }
            }
        },
        editProjeto(dados){
            this.editIndex = dados.id
            this.dialog = true
            this.dadosEditado = [Object.assign({}, dados)]
        },
        deleteProjeto(dados){
            this.editedIndex = dados.id
            this.dadosEditado = Object.assign({}, dados)
            this.dialogDelete = true
        },
        visualizarDados(dados){
            this.$store.dispatch(this.visualizar.acao, {dados: dados, rota: this.visualizar.rota})
        },
        closeDelete(){
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
        },
        deleteItemConfirm(){
            const promise = this.$store.dispatch(this.deletar, this.dadosEditado)
            promise.then(()=>{this.dialogDelete = false}, ()=>{console.log('deu errado')});
        }
    },
}
</script>

<style>

</style>