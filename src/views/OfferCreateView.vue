
<script setup lang="ts">

import { ref } from 'vue';
import router from '@/router';

import type { Offer } from '@/types/Offer';

import OfferEditor from '@/components/OfferEditor.vue'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()


const offer = ref<Offer>({
	job: {
		title: '',
		description: '',
		tags: [ ],
		created: 0,
		salary: {
			amount: 0,
			currency: 'EUR'
		}
	},
	applicants: []
})


async function submit()
{
	if (!auth.currentUser || !auth.isEmployer || !offer.value)
		return

	offer.value.owner = auth.currentUser
	
	const result = await api.createOffer(offer.value)

	if (result && result.id)
		router.push(`/offer/${ result.id }`)
}

</script>


<template>
	<v-container fluid>
		<v-row class="mt-0">
			<v-col>
				<OfferEditor :offer="offer" @submit="submit"></OfferEditor>
			</v-col>
		</v-row>
	</v-container>
</template>


<style scoped>
</style>
