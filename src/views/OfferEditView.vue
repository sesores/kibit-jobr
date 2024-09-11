
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

import type { Offer } from '@/types/Offer';

import OfferEditor from '@/components/OfferEditor.vue'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()
const route = useRoute()

const offer = ref<Offer | undefined>()


onMounted(async () => {
	const id = route.params.id as string

	offer.value = await api.getOfferById(id)
})


async function submit()
{
	if (!auth.currentUser || !auth.isEmployer || !offer.value)
		return

	const result = await api.updateOffer(offer.value)

	if (result && result.id)
		router.push(`/offer/${ result.id }`)
}

</script>


<template>
	<v-container fluid>
		<v-row class="mt-0">
			<v-col>
				<OfferEditor v-if="offer" :offer="offer" @submit="submit"></OfferEditor>
			</v-col>
		</v-row>
	</v-container>
</template>


<style scoped>
</style>
