<script setup lang="ts">

import { ref, TransitionGroup } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import OfferEditor from '@/components/OfferEditor.vue'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

const showEditor = ref<boolean>(false)

</script>



<template>
	<v-app>	
		<v-app-bar>
			<v-app-bar-title class="font-weight-black">Jobbr</v-app-bar-title>

			<v-toolbar-title v-if="auth.isLoggedIn">
				<Transition name="user">
					<h5>{{ auth.session?.user.username }} ({{ auth.session?.user.type }})</h5>
				</Transition>
			</v-toolbar-title>
			
			<v-toolbar-items>
				<v-btn @click="$router.push('/')">Home</v-btn>
				<v-btn @click="$router.push('/dashboard')" v-if="auth.isLoggedIn">Dashboard</v-btn>
				<v-btn @click="auth.isLoggedIn ? auth.logout() : $router.push('login')" variant="tonal" color="primary">{{ auth.isLoggedIn ? 'Logout' : 'Login' }}</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		
		<v-fab-transition>
			<v-btn v-show="auth.isEmployer" @click="showEditor = !showEditor" position="fixed" location="bottom right" icon size="large" color="success" elevation="8" class="mr-8 mb-8" style="z-index: 1004;">
				<v-icon icon="mdi-plus"></v-icon>
				<v-tooltip activator="parent" location="start">Create an Offer</v-tooltip>
			</v-btn>
		</v-fab-transition>

		<v-main class="fill-height">
			<RouterView />
		</v-main>

		<!-- <v-overlay v-model="showEditor" activator="parent"></v-overlay> -->
		<v-overlay v-if="auth.isEmployer" v-model="showEditor" class="align-center justify-center" scroll-strategy="block">
			<v-container width="500">
				<v-row>
					<v-col>
						<OfferEditor></OfferEditor>
					</v-col>
				</v-row>
			</v-container>
		</v-overlay>
	</v-app>
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
