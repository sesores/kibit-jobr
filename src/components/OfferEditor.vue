<script setup lang="ts">

import { computed, reactive, ref, watch } from 'vue'

import type { Offer } from '@/types/Offer'
import type { User } from '@/types/User'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

const offer = ref<Offer>({
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

const loading = ref<boolean>(false)


function submit ()
{
	loading.value = true
}

</script>


<template>
	<v-form fast-fail @submit.prevent="submit">
		<v-card elevation="8" :disabled="loading" :loading="loading">
			<template v-slot:loader="{ isActive }">
				<v-progress-linear :active="isActive" color="primary" height="4" indeterminate></v-progress-linear>
			</template>

			<v-card-item class="bg-blue">
				<v-card-title>Create a Job</v-card-title>
			</v-card-item>
			
			<v-container fluid>
				<v-row>
					<v-col>
						<v-text-field v-model="offer.job.title" label="Job Title" class="mb-4" single-line></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<v-textarea v-model="offer.job.description" label="Job Description" class="mb-4" single-line></v-textarea>
					</v-col>
				</v-row>

				<v-row align="center">
					<v-col cols="12" md="6">
						<v-slider label="Salary" v-model="offer.job.salary.amount" min="0" max="100000" hide-details>
							<template v-slot:prepend>
								<v-text-field v-model="offer.job.salary.amount" density="compact" style="width: 100px" type="number" variant="solo" hide-details single-line></v-text-field>
							</template>
						</v-slider>
					</v-col>

					<v-col cols="12" md="6" class="justify-center">
						<v-autocomplete label="Tags" v-model="offer.job.tags" :items="api.tags" clearable chips multiple variant="solo" hide-details></v-autocomplete>
					</v-col>
				</v-row>
			</v-container>

			<v-card-actions class="pa-4 bg-blue-grey-lighten-5">
				<v-btn type="submit" variant="elevated" color="primary" block>CREATE</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>


<style scoped>
</style>

