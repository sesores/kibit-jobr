
<script setup lang="ts">

import { ref } from 'vue'

import { useApiStore } from '@/stores/api.store'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
const api = useApiStore()

const showFilters = ref(false)

</script>



<template>
	<v-container fluid class="bg-blue-lighten-4">
		<v-row>
			<v-col>
				<v-text-field v-model="api.searchTerm.phrase" @update:focused="showFilters = true" class="inline" prepend-inner-icon="mdi-magnify" label="Search jobs..." variant="solo" clearable hide-details single-line rounded="pill">
					<template v-slot:append>
						<v-btn class="inline" icon="mdi-tune" @click="showFilters = !showFilters"></v-btn>
					</template>
				</v-text-field>
			</v-col>
		</v-row>

		<v-expand-transition>
			<v-row v-show="showFilters" class="align-center">
				<v-col cols="12" md="6">
					<v-range-slider label="Salary" v-model="api.searchTerm.salary" min="0" max="100000" class="ma-0" hide-details>
						<template v-slot:prepend>
							<v-text-field v-model="api.searchTerm.salary[0]" style="width: 100px" type="number" variant="solo" hide-details single-line></v-text-field>
						</template>
						<template v-slot:append>
							<v-text-field v-model="api.searchTerm.salary[1]" style="width: 100px" type="number" variant="solo" hide-details single-line></v-text-field>
						</template>
					</v-range-slider>
				</v-col>

				<v-col cols="12" md="6" class="justify-center">
					<v-autocomplete label="Tags" v-model="api.searchTerm.tags" :items="api.tags" clearable chips multiple variant="solo" hide-details></v-autocomplete>
				</v-col>
			</v-row>
		</v-expand-transition>
	</v-container>
</template>



<style scoped>

.v-enter-active,
.v-leave-active
{
	transition: all 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to
{
	height: 0px;
}

</style>