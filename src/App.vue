<script setup lang="ts">

import { ref, TransitionGroup } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import OfferEditor from '@/components/OfferEditor.vue'
import type { Offer } from './types/Offer'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()


const showEditor = ref<boolean>(false)

const dummyOffer = ref<Offer>({
	job: {
		title: '',
		description: '',
		tags: [],
		created: new Date().getTime(),
		salary: {
			amount: 0,
			currency: 'EUR'
		}
	},
	applicants: []
})

async function onOfferEditorSubmit()
{
	if (!auth.currentUser || !auth.isEmployer)
		return

	dummyOffer.value.owner = auth.currentUser

	await api.createOffer(dummyOffer.value)

	showEditor.value = false
}

</script>



<template>
	<v-app>	
		<v-app-bar color="black">
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

		<v-overlay v-if="auth.isEmployer" v-model="showEditor" class="align-center justify-center" scroll-strategy="block">
			<v-container style="min-width: 50vw;">
				<v-row>
					<v-col>
						<OfferEditor title-text="Create an Offer" submit-text="Create" :offer="dummyOffer" @submit="onOfferEditorSubmit"></OfferEditor>
					</v-col>
				</v-row>
			</v-container>
		</v-overlay>
	</v-app>
</template>



<style scoped>

</style>
