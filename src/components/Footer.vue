<template>
    <v-footer
    elevation="20"
        dark
      v-bind="localAttrs"
      :padless="padless"
    >
      <v-card elevation="0" style="text-align:center"
        flat
        tile
        width="100%"
        color="transparent"
      >
        <Icons tamanho="35px"></Icons>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          Copyright @2021 | Desenvolvido por Angelo Francisco
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
import Icons from '../components/Icons.vue'
export default {
    components: {Icons},
    data: () => ({
      items: [
        'default',
        'absolute',
        'fixed',
      ],
      padless: false,
      variant: 'default',
    }),
    computed: {
      localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
  }
</script>

<style>

</style>