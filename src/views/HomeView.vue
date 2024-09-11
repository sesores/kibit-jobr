<script setup lang="ts">

import SearchOffers from '@/components/SearchBar.vue'
import OfferCard from '@/components/OfferCard.vue'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

</script>


<template>
	<SearchOffers></SearchOffers>
	<v-container fluid>
		<v-row class="fill-height">
			<v-col>
				<v-sheet color="blue" class="hero fill-height min-height-screen pa-8" rounded="rounded" elevation="8">
						<h1 class="mb-4">Welcome to Jobr!</h1>
						<p>This example application demonstrates <br /> my capabilities as a VUE.JS developer.</p>

						<h2 class="mt-8 mb-4">Key Features</h2>
						<p>Feel free to expolre the features of the site:</p>
						<ul class="mt-8 pl-8">
							<li>One page application</li>
							<li>Persistent state</li>
							<li>
								Login as an Employer (<b>carol</b> / <b>john</b>), and
								<ul class="pl-8">
									<li>create,</li>
									<li>edit,</li>
									<li>or delete</li>
								</ul>
								Job Offers
							</li>
							<li>
								Or as an Applicant (<b>alice</b> / <b>bob</b>) to
								<ul class="pl-8">
									<li>apply,</li>
									<li>or cancel</li>
								</ul>
								Job Applications
							</li>
							<li>The password is <b>pwd</b> for each test user</li>
						</ul>
				</v-sheet>
			</v-col>
			
			<v-col cols="12" lg="3" md="4">
				<v-container class="pa-0 ma-0" fluid>
					<v-row>
						<v-col>
							<h1 class="font-weight-thin ma-0">Trending Jobs</h1>
						</v-col>
					</v-row>

					<v-row class="mt-0">
						<v-col cols="12" sm="6" md="12" v-for="(offer, i) in api.trendingOffers" :key="offer.id">
							<OfferCard v-model="api.trendingOffers[i]"></OfferCard>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
	
</template>


<style scoped>

.hero li
{
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
}

</style>