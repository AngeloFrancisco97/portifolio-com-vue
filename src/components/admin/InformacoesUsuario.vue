<template>
    <v-container>
        <Tabela :cabecalho="headers" :titulos="titulos"
                :defaultItem="defaultItem" :dados="informacoes.informacoes"
                :id="informacoes.id"
                :salvar="salvar" :editar="editar" :deletar="deletar"
                :visualizar="visualizar"
                :titulo="{tituloTabela: 'Informações do usuario', nome: 'Informação'}"
                >
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
            salvar: 'adicionarInformacaoUsuario',
            editar: 'editarInformacaoUsuario',
            deletar: 'deletarInformacaoUsuario',
            visualizar: {rota: 'AdminInformacoesUsuario', existe: false, acao: 'visualizarInformacoes'},
            quantidadeProjetos: '&quantidadeProjetos',
            page: 'page='+this.$store.getters.currentPage,
            currentPage: this.$store.getters.currentPage,
            titulos: {
                id: {titulo: 'ID', tipo: 'text'},
                user_id: {titulo: 'Usuario ID', tipo: 'text', id: true},
                tipo: {titulo: 'Tipo', tipo: 'text'},
                descricao: {titulo: 'Descricao', tipo: 'text'},
                },
            defaultItem: {
                user_id: '',
                tipo: '',
                descricao: '',
            },
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                { text: 'ID Usuario', value: 'user_id' },
                { text: 'Tipo', value: 'tipo' },
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
        informacoes(){
            return this.$store.getters.informacoes
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
        close(){
            this.dialog = false
            this.$nextTick(() => {
            this.editedProjetos = Object.assign({}, this.defaultItem)
            this.editIndex = -1
            })
        },
    },
    mounted() {
    },
}
</script>

<style>

</style>