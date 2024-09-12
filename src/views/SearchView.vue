
<script setup lang="ts">

import SearchOffers from '@/components/SearchBar.vue'

import type { Offer } from '@/types/Offer'

import format from '@/utils/Format'

import { useApiStore } from '@/stores/api.store'
import { computed } from 'vue';
const api = useApiStore()

const offers = computed<Offer[]>(() => {
	return (api.foundOffers.length > 0)
		? api.foundOffers
		: api.allOffers
})

</script>


<template>
	<SearchOffers></SearchOffers>

	<v-container fluid>
		<v-row>
			<v-col cols="8">
				<h1 class="font-weight-thin ma-0">Search Results ({{ api.foundOffers.length }})</h1>
				<h5 v-if="api.foundOffers.length == 0">No results found, list all Offers instead</h5>
			</v-col>
			<v-col cols="4">
				<v-select label="Order by" :items="[ 'Title', 'Owner', 'Creation Date', 'Salary' ]"></v-select>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-list v-if="offers.length > 0" lines="two">
					<v-list-item v-for="(offer, i) in offers" :key="offer.id" rounded link :href="`/offer/${ offer?.id }`">
						<v-list-item-title class="font-weight-black">{{ offer.job.title }}</v-list-item-title>
						
						<v-list-item-subtitle>{{ format.by(offer?.owner) }} @ {{ format.dateTime(offer?.job.created) }}</v-list-item-subtitle>

						<template v-slot:append>
							<div class="d-flex ga-2">
								<v-chip v-for="tag in offer?.job.tags" @click.prevent="api.searchTerm.clear(); api.searchTerm.tags = [ tag ]" variant="flat" size="x-small" link>{{ tag }}</v-chip>
							</div>
						</template>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-pagination :length="4" rounded></v-pagination>
			</v-col>
		</v-row>
	</v-container>
</template>


<style scoped>
</style>