
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Offer } from '@/types/Offer';

import OfferCard from '@/components/OfferCard.vue'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()
const route = useRoute()

const offer = ref<Offer | undefined>()


onMounted(reload)


async function reload()
{
	const id = route.params.id as string
	offer.value = await api.getOfferById(id)
}


</script>


<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<h1 class="font-weight-thin ma-0">Offer Details</h1>
			</v-col>
		</v-row>

		<v-row class="mt-0">
			<v-col>
				<OfferCard v-if="offer" v-model="offer" @applied="reload()" @cancelled="reload()" @removed="$router.push({ name: 'dashboard' })"></OfferCard>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
</style>