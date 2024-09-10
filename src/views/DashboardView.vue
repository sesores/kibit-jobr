
<script setup lang="ts">

import SearchOffers from '@/components/SearchBar.vue'
import OfferCard from '@/components/OfferCard.vue'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

</script>


<template>
	
	<v-container fluid>
		<v-row>
			<v-col>
				<h1 class="font-weight-thin ma-0">Dashboard</h1>
			</v-col>
		</v-row>

		<v-row class="mt-0">
			<v-col cols="12" sm="6" lg="4" xl="3" v-for="(offer, i) in api.userOffers" :key="offer.id">
				<OfferCard v-model="api.userOffers[i]"></OfferCard>
			</v-col>
		</v-row>
	</v-container>
</template>


<style scoped>
</style>