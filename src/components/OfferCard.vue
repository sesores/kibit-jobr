
<script setup lang="ts">

import { computed, ref, watch } from 'vue'

import type { Offer } from '@/types/Offer'
import type { User } from '@/types/User'

import format from '@/utils/Format'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

const offer = defineModel<Offer>()

const isOwner = computed<boolean>(() => offer.value?.owner?.id === auth.session?.user.id)
const isApplied = computed<boolean>(() => offer.value?.applicants.some((u) => u.id === auth.session?.user.id) ?? false)


const emit = defineEmits([ 'applied', 'cancelled', 'removed' ])


async function apply()
{
	if (!auth.currentUser || !offer.value)
		return

	await api.applyToOffer(offer.value)

	emit('applied')
}


async function cancel()
{
	if (!auth.currentUser || !offer.value)
		return

	await api.cancelOffer(offer.value)

	emit('cancelled')
}


async function remove()
{
	if (!auth.currentUser || !offer.value || !offer.value.id)
		return

	await api.deleteOffer(offer.value.id)

	emit('removed')
}


</script>


<template>
	<v-card link :href="`/offer/${ offer?.id }`">
		<v-card-item class="bg-blue">
			<v-card-title>{{ offer?.job.title }}</v-card-title>
			<v-card-subtitle>{{ format.by(offer?.owner) }} @ {{ format.dateTime(offer?.job.created) }}</v-card-subtitle>
		</v-card-item>

		<v-card-text class="py-2">
			<div class="d-flex ga-2">
				<v-chip v-for="tag in offer?.job.tags" @click.prevent="api.searchTerm.clear(); api.searchTerm.tags = [ tag ]" variant="flat" size="x-small" link>{{ tag }}</v-chip>
			</div>
		</v-card-text>

		<v-divider></v-divider>

		<v-card-text>
			<p>{{ offer?.job.description }}</p>
		</v-card-text>

		<v-card-actions class="pa-4 bg-blue-lighten-4 ga-3">
			<h3>{{ format.currency(offer?.job.salary.amount, offer?.job.salary.currency) }}</h3>

			<p class="text-blue">{{ format.applicants(offer?.applicants.length) }}</p>
			
			<v-spacer></v-spacer>

			<template v-if="auth.isLoggedIn">
				<template v-if="auth.isEmployer && isOwner">
					<v-btn @click.prevent="$router.push(`/offer/${ offer?.id }/edit`)" variant="elevated" icon size="x-small">
						<v-icon icon="mdi-pencil"></v-icon>
						<v-tooltip activator="parent" location="start">Edit Offer</v-tooltip>
					</v-btn>
					<v-btn @click.prevent="remove()" variant="elevated" icon size="x-small" color="error">
						<v-icon icon="mdi-delete-outline"></v-icon>
						<v-tooltip activator="parent" location="start">Delete Offer</v-tooltip>
					</v-btn>
				</template>
				
				<template v-if="auth.isApplicant">
					<v-btn @click.prevent="apply()" v-if="!isApplied" variant="elevated" icon size="x-small" color="success">
						<v-icon icon="mdi-plus"></v-icon>
						<v-tooltip activator="parent" location="start">Apply to Job</v-tooltip>
					</v-btn>

					<v-btn @click.prevent="cancel()" v-if="isApplied" variant="elevated" icon size="x-small" color="error">
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