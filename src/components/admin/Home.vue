<template>
    <v-container>
        <v-btn to="/admin/projetos" class="mb-3 mr-3"
        color="grey darken-3"
        dark
        elevation="2"
        large
        >Projetos</v-btn>
        <v-btn to="/admin/usuarios" class="mb-3 mr-3" 
        color="grey darken-3"
        dark
        elevation="2"
        large
        >Usuarios</v-btn>
        <v-btn to="/admin/conhecimentos" class="mb-3" 
        color="grey darken-3"
        dark
        elevation="2"
        large
        >Conhecimentos</v-btn>
        <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </v-container>
</template>

<script>
export default {
}
</script>

<style>

</style>