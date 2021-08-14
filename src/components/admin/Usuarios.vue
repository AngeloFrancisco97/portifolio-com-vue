<template>
    <v-container>
        <Tabela :cabecalho="headers" :titulos="titulos"
                :defaultItem="defaultItem" :dados="users"
                :salvar="salvar" :editar="editar"
                :visualizar="visualizar"
                :titulo="{tituloTabela: 'Usuarios', nome: 'Usuario'}"
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
            salvar: 'adicionarUsuario',
            editar: 'editarUsuario',
            visualizar: {rota: 'AdminInformacoesUsuario', existe: true, acao: 'visualizarInformacoes'},
            quantidadeProjetos: '&quantidadeProjetos',
            page: 'page='+this.$store.getters.currentPage,
            currentPage: this.$store.getters.currentPage,
            titulos: {
                id: {titulo: 'ID', tipo: 'text'},
                name: {titulo: 'Nome', tipo: 'text'},
                email: {titulo: 'Email', tipo: 'text'},
                idade: {titulo: 'Idade', tipo: 'text'},
                foto_perfil: {titulo: 'Foto do Perfil', tipo: 'img'},
                foto_descricao: {titulo: 'Foto da descricao', tipo: 'img'},
                curriculo: {titulo: 'Curriculo', tipo: 'img'},
                descricao_perfil: {titulo: 'Descricao', tipo: 'text'},
                endereco: {titulo: 'Endereco', tipo: 'text'},
                profissao: {titulo: 'Profissao', tipo: 'text'},
                },
            defaultItem: {
                name: '',
                email: '',
                idade: '',
                foto_perfil: '',
                foto_descricao: '',
                curriculo: '',
                descricao_perfil: '',
                endereco: '',
                profissao: '',
            },
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Nome', value: 'name' },
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
        users(){
            return this.$store.getters.users
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
        getUsuarios(){
            this.$store.dispatch('carregarUsuarios')
        },
        close(){
            this.dialog = false
            this.$nextTick(() => {
            this.editedProjetos = Object.assign({}, this.defaultItem)
            this.editIndex = -1
            })
        },
    },
    mounted() {
        this.getUsuarios()
    },
}
</script>

<style>

</style>