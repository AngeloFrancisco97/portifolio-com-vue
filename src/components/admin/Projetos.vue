<template>
    <v-container>
        <Tabela :cabecalho="headers" :titulos="titulos"
                :defaultItem="defaultItem" :dados="projetos"
                :salvar="salvar" :editar="editar" :deletar="deletar"
                :visualizar="visualizar"
                :titulo="{tituloTabela: 'Projetos', nome: 'Projeto'}">
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
            deletar: 'deletarProjeto',
            salvar: 'adicionarProjeto',
            editar: 'editarProjeto',
            visualizar: {rota: 'AdminTelasProjeto', existe: true, acao: 'visualizarProjeto'},
            quantidadeProjetos: '&quantidadeProjetos',
            page: 'page='+this.$store.getters.currentPage,
            currentPage: this.$store.getters.currentPage,
            titulos: {
                id: {titulo: 'ID', tipo: 'text'},
                nome: {titulo: 'Nome', tipo: 'text'},
                capa_projeto: {titulo: 'Capa Projeto', tipo: 'img'},
                descricao: {titulo: 'Descricao', tipo: 'text'},
                descricao_completa: {titulo: 'Descricao Completa', tipo: 'text'},
                ferramentas: {titulo: 'Ferramentas', tipo: 'text'},
                repositorio: {titulo: 'Repositorio', tipo: 'text'},
                },
            editedProjetos: {
                nome: '',
                capa_projeto: '',
                descricao: '',
                descricao_completa: '',
                ferramentas: '',
                repositorio: '',
                },
            defaultItem: {
                nome: '',
                capa_projeto: '',
                descricao: '',
                descricao_completa: '',
                ferramentas: '',
                repositorio: '',
            },
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Nome', value: 'nome' },
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
        projetos(){
            return this.$store.getters.projetos.data
        },
    },
    methods: {
        carregarImagem(e){
            this.capaProjeto = e
        },
        getProjetos(){
            this.$store.dispatch('visualizarProjetos',{page: this.page, quantidadeProjetos: this.quantidadeProjetos, currentPage: this.currentPage})
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
        this.getProjetos()
    },
}
</script>

<style>

</style>