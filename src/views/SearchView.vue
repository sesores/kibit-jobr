
<script setup lang="ts">

import SearchOffers from '@/components/SearchBar.vue'

import format from '@/utils/Format'

import { useApiStore } from '@/stores/api.store'
const api = useApiStore()

</script>


<template>
	<SearchOffers></SearchOffers>

	<v-container fluid>
		<v-row>
			<v-col>
				<h1 class="font-weight-thin ma-0">Search Results ({{ api.foundOffers.length }})</h1>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-list v-if="api.foundOffers.length > 0" lines="two">
					<v-list-item v-for="(offer, i) in api.foundOffers" :key="offer.id" rounded link :href="`/offer/${ offer?.id }`">
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
	</v-container>
</template>


<style scoped>
</style>