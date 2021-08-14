<template>
  <v-chip-group
            column
            class="d-flex justify-center habilidades"
          >
            <v-chip
            color="cyan darken-4"
            style="cursor: default; font-size: 15px"
              v-for="conhecimento, chave in conhecimentos"
              :key="chave"
            >
              {{ conhecimento.habilidade }}
            </v-chip>
          </v-chip-group>
</template>

<script>
export default {
  computed: {
    conhecimentos(){
        return this.$store.getters.conhecimentos
    }
  }   
}
</script>

<style>
 .habilidades .v-slide-group__content {
   justify-content: center;
 }
</style>