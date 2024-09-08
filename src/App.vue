<script setup lang="ts">

import { ref, TransitionGroup } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

import HelloWorld from '@/components/HelloWorld.vue'

const auth = useAuthStore()
const api = useApiStore()

</script>



<template>
	<v-app>
		<v-toolbar title="Login">
			<Transition name="user">
				<v-toolbar-title v-if="auth.isLoggedIn">{{ auth.session?.user.username }} ({{ auth.session?.user.type }})</v-toolbar-title>
			</Transition>

			<v-toolbar-items>
				<v-btn @click="auth.login('john', 'wrong')">Wrong Login</v-btn>
				<v-btn @click="auth.login('john', 'pwd')">Login</v-btn>
				<v-btn @click="auth.logout()">Logout</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<div v-for="offer in api.trendingOffers">
			{{ offer.job.title }}
		</div>

		<v-divider></v-divider>

		<TransitionGroup tag="ul" name="list">
			<li v-for="(offer, index) in api.userOffers" :key="offer.id" :data-index="index">
				{{ offer.job.title }}
			</li>
		</TransitionGroup>

		<!-- <div class="wrapper">
			<HelloWorld msg="You did it!" />

			<nav>
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>
		</div> -->
	</v-app>

	<!-- <RouterView /> -->
</template>



<style scoped>

.user-enter-active,
.user-leave-active
{
	transition: all 0.5s ease-in-out;
}

.user-enter-from,
.user-leave-to
{
	opacity: 0;
	transform: translateY(1rem);
}



.list-enter-active,
.list-leave-active
{
	transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to
{
	opacity: 0;
	transform: translateX(30px);
}

</style>
