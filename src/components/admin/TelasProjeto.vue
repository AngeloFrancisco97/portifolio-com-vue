<template>
    <v-container>
        <Tabela :cabecalho="headers" :titulos="titulos"
                :defaultItem="defaultItem" :dados="telasProjeto.imagens_projeto"
                :salvar="salvar" :editar="editar" :deletar="deletar"
                :id="telasProjeto.id"
                :visualizar="visualizar"
                :titulo="{tituloTabela: $store.getters.projeto.nome , nome: 'Tela'}">
                </Tabela>
    </v-container>
</template>

<script>
import Tabela from "../layouts/Tabela.vue"
export default {
    components: {Tabela},
    filters: {
        fomartarLabel: function (texto){
            let textoFormatado = texto.replace('_', ' ')
            return textoFormatado.toUpperCase()
        }
    },
    data() {
        return {
            deletar: 'deletarTelaProjeto',
            salvar: 'adicionarTelaProjeto',
            editar: 'editarTelaProjeto',
            visualizar: {link: '/admin/telas_projeto', existe: false},
            page: 'page='+this.$store.getters.currentPage,
            currentPage: this.$store.getters.currentPage,
            titulos: {
                id: {titulo: 'ID', tipo: 'text'},
                projeto_id: {titulo: 'Id do projeto', tipo: 'text', id: true},
                titulo: {titulo: 'Titulo', tipo: 'text'},
                imagens_projeto: {titulo: 'Imagem da tela', tipo: 'img'},
                descricao: {titulo: 'Descricao', tipo: 'text'},
                },
            defaultItem: {
                projeto_id: '',
                titulo: '',
                imagens_projeto: '',
                descricao: '',
                },
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Titulo', value: 'titulo' },
                { text: 'Ação', value: 'actions' },
            ]
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
    computed: {
        token() {
            return this.$store.getters.token
        },
        telasProjeto(){
            console.log(this.$store.getters.projeto)
            return this.$store.getters.projeto
        },
        // projetosTable(){
        //     // let projetosTable = []
        //     // const array = this.projetos.data
        //     // array.forEach(element => {
        //     //     projetosTable += {id: element.id, nome: element.nome}
        //     // });
        //     // console.log(projetosTable)
        //     // return 0
        // }
    },
    methods: {
        carregarImagem(e){
            this.capaProjeto = e
        },
        close(){
            this.dialog = false
            this.$nextTick(() => {
            this.editedProjetos = Object.assign({}, this.defaultItem)
            this.editIndex = -1
            })
        },
    },
    created() {
    },
}
</script>

<style>

</style>