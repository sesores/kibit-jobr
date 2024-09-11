
<script setup lang="ts">
	import { ref } from 'vue'

	import { useAuthStore } from '@/stores/auth.store'
	const auth = useAuthStore()

	const username = ref('')
	const password = ref('')
	
	async function login() {
		await auth.login(username.value, password.value)
		
		console.log("LOGIN VIEW", auth?.session?.user)
	}
</script>



<template>
	<v-container fluid class="fill-height bg-blue-lighten-4">
		<v-row justify="center">
			<v-col cols="12" sm="8" md="6" lg="4" xl="3" xxl="2">
				<v-form fast-fail @submit.prevent="login">
					<v-card title="Login" append-icon="mdi-account-outline" elevation="16" rounded>
						<v-divider></v-divider>

						<v-card-text class="pt-4 pb-0">
							<v-text-field v-model="username" label="User Name" type="text" autocorrect="off" autocapitalize="none" class="mb-4" hide-details single-line></v-text-field>
							<v-text-field v-model="password" label="Password" type="password" autocorrect="off" autocapitalize="none" hide-details single-line></v-text-field>
							<v-checkbox label="Keep me signed in" color="primary" hide-details></v-checkbox>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions class="pa-4 bg-blue-grey-lighten-5">
							<v-btn type="submit" variant="elevated" color="primary" block>Sign in</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>



<style scoped>
</style>