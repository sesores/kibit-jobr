<script setup lang="ts">

import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

const showNavigation = ref<boolean>(false)

</script>



<template>
	<v-app>
		<v-app-bar color="black">
			<template v-slot:prepend>
				<v-app-bar-nav-icon @click="showNavigation = !showNavigation"></v-app-bar-nav-icon>
			</template>
			
			<v-app-bar-title @click="$router.push({ name: 'home' })" class="cursor-pointer font-weight-black">
				Jobbr
			</v-app-bar-title>

			<v-toolbar-title v-if="auth.isLoggedIn">
				<Transition name="user">
					<h5>{{ auth.session?.user.username }}</h5>
				</Transition>
			</v-toolbar-title>
			
			<v-toolbar-items>
				<v-btn @click="auth.isLoggedIn ? auth.logout() : $router.push({ name: 'login' })" variant="tonal" color="primary">{{ auth.isLoggedIn ? 'Logout' : 'Login' }}</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		
		<v-navigation-drawer v-model="showNavigation">
			<v-list nav>
				<v-list-item prepend-icon="mdi-home-outline" title="Home" @click="$router.push({ name: 'home' })"></v-list-item>
				<v-list-item prepend-icon="mdi-magnify" title="Search" @click="$router.push({ name: 'search' })"></v-list-item>
				
				<v-divider></v-divider>

				<template v-if="auth.isLoggedIn">
					<v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" @click="$router.push({ name: 'dashboard' })"></v-list-item>

					<template v-if="auth.isEmployer">
						<v-list-item prepend-icon="mdi-plus" title="Create Offer" @click="$router.push({ name: 'offer-create' })"></v-list-item>
					</template>
				</template>
			</v-list>
		</v-navigation-drawer>

		<v-fab-transition>
			<v-btn v-show="auth.isEmployer" @click="$router.push({ name: 'offer-create' })" position="fixed" location="bottom right" icon size="large" color="success" elevation="8" class="mr-8 mb-8" style="z-index: 1004;">
				<v-icon icon="mdi-plus"></v-icon>
				<v-tooltip activator="parent" location="start">Create an Offer</v-tooltip>
			</v-btn>
		</v-fab-transition>

		<v-main class="fill-height">
			<RouterView />
		</v-main>

		<v-snackbar v-model="api.message.show" :color="api.message.type" timeout="5000" variant="elevated" elevation="8">
			<p class="font-weight-black">{{ api.message.title }}</p>
			<p v-if="api.message.text.length > 0">{{ api.message.text }}</p>
			<template v-slot:actions>
				<v-btn icon="mdi-close" size="x-small" variant="text" @click="api.message.show = false"></v-btn>
			</template>
		</v-snackbar>
	</v-app>
</template>



<style scoped>

</style>
