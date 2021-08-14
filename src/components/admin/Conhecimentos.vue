<template>
    <v-container>
        <Tabela 
            :cabecalho="headers" :titulos="titulos"
            :editedProjetos="editedProjetos" 
            :defaultItem="defaultItem" :dados="conhecimentos"
            :salvar="salvar" :editar="editar" :deletar="deletar"
            :visualizar="visualizar"
            :titulo="{tituloTabela: 'Conhecimentos', nome: 'Conhecimento'}">
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
            salvar: 'adicionarConhecimento',
            editar: 'editarConhecimento',
            deletar: 'deletarConhecimento',
            visualizar: {existe: false},
            page: 'page='+this.$store.getters.currentPage,
            currentPage: this.$store.getters.currentPage,
            titulos: {
                id: {titulo: 'ID', tipo: 'text'},
                habilidade: {titulo: 'Habilidade', tipo: 'text'},
                },
            editedProjetos: {
                habilidade: '',
                },
            defaultItem: {
                habilidade: '',
            },
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Nome', value: 'habilidade' },
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
        conhecimentos(){
            console.log(this.$store.getters.conhecimentos)
            return this.$store.getters.conhecimentos
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
        getConhecimentos(){
            this.$store.dispatch('carregarConhecimentos')
        },
    },
    created() {
        this.getConhecimentos()
    },
}
</script>

<style>

</style>