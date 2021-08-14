<template>
  <v-app style="background-color: #263238;">
    <Header></Header>

    <v-main>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </v-main>
	<Footer></Footer>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    components: {Header, Footer}
}
</script>

<style>
.v-application {
    /* font-family: nunito; */
    font-family: "Nunito", sans-serif;
}

@keyframes slide-in {
		from { transform: translateX(-50px); opacity: 0;}
		to { transform: translateX(0px); opacity: 1;}
	}

	@keyframes slide-out {
		from { transform: translateX(0px); opacity: 1;}
		to { transform: translateX(-50px); opacity: 0;}
	}

	.slide-enter-active {
		animation: slide-in 1s ease;
	}
	.slide-leaver-active {
		animation: slide-out 1s ease;
	}
</style>