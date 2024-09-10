
<script setup lang="ts">

import { computed, ref, watch } from 'vue'

import type { Offer } from '@/types/Offer'
import type { User } from '@/types/User'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

const offer = defineModel<Offer>()

const isOwner = computed<boolean>(() => offer.value?.owner?.id === auth.session?.user.id)
const isApplied = computed<boolean>(() => offer.value?.applicants.some((u) => u.id === auth.session?.user.id) ?? false)


async function apply()
{
	if (!auth.currentUser || !offer.value)
		return

	await api.applyToOffer(offer.value)
}


async function cancel()
{
	if (!auth.currentUser || !offer.value)
		return

	await api.cancelOffer(offer.value)
}


</script>


<template>
	<v-card>
		<v-card-item class="bg-blue">
			<v-card-title>{{ offer?.job.title }}</v-card-title>
			<v-card-subtitle>{{ $filters.by(offer?.owner) }} @ {{ $filters.dateTime(offer?.job.created) }}</v-card-subtitle>
		</v-card-item>

		<v-card-text class="py-2">
			<div class="d-flex ga-2">
				<v-chip v-for="tag in offer?.job.tags" variant="flat" size="x-small" link>{{ tag }}</v-chip>
			</div>
		</v-card-text>

		<v-divider></v-divider>

		<v-card-text>
			<p>{{ offer?.job.description }}</p>
		</v-card-text>

		<v-card-actions class="pa-4 bg-blue-lighten-4 ga-3">
			<h3>{{ $filters.currency(offer?.job.salary.amount, offer?.job.salary.currency) }}</h3>

			<p class="text-blue">{{ $filters.applicants(offer?.applicants.length) }}</p>
			
			<v-spacer></v-spacer>

			<template v-if="auth.isLoggedIn">
				<template v-if="auth.isEmployer && isOwner">
					<v-btn variant="elevated" icon size="x-small">
						<v-icon icon="mdi-pencil"></v-icon>
						<v-tooltip activator="parent" location="start">Edit Offer</v-tooltip>
					</v-btn>
					<v-btn variant="elevated" icon size="x-small" color="error">
						<v-icon icon="mdi-delete-outline"></v-icon>
						<v-tooltip activator="parent" location="start">Delete Offer</v-tooltip>
					</v-btn>
				</template>
				
				<template v-if="auth.isApplicant">
					<v-btn @click="apply()" v-if="!isApplied" variant="elevated" icon size="x-small" color="success">
						<v-icon icon="mdi-plus"></v-icon>
						<v-tooltip activator="parent" location="start">Apply to Job</v-tooltip>
					</v-btn>

					<v-btn @click="cancel()" v-if="isApplied" variant="elevated" icon size="x-small" color="error">
						<v-icon icon="mdi-close"></v-icon>
						<v-tooltip activator="parent" location="start">Cancel application</v-tooltip>
					</v-btn>
				</template>
			</template>
		</v-card-actions>
	</v-card>
</template>


<style scoped>
</style>