<template>
    <v-card-text>
        <v-btn target="_blank"
        v-for="(icon, chave) in icons"
        :key="chave"
        class="mx-4"
        icon
        :href="icon.link"
        >
        <v-icon :size="tamanho">
            {{ icon.icon }}
        </v-icon>
        </v-btn>
    </v-card-text>
</template>

<script>
export default {
    props: ['tamanho'],
    data() {
        return {
            icons: [
                {'icon':'fab fa-github', 'link': 'https://github.com/AngeloFrancisco97/'},
                {'icon':'fab fa-linkedin', 'link': 'https://www.linkedin.com/in/angelo-francisco-04954b184/'},
                {'icon':'fab fa-instagram', 'link': 'https://www.instagram.com/angelo_franciisco/'},
            ],
        }
    },
}
</script>

<style>

</style>