import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/backend/Api'

import type { Session } from '@/types/Session'
import type { User } from '@/types/User'



export const useAuthStore = defineStore('auth', () => {

	const session = ref<Session>()
	
	const isLoggedIn = ref<boolean>(false)
	const currentUser = computed<User | undefined>(() => session.value?.user )



	async function getUserById(id:string):Promise<User | undefined>
	{
		return await api.user.get(id)
	}


	async function register(user:User)
	{
		return await api.auth.register(user)
	}

	
	async function login(username:string, password:string)
	{
		try
		{
			session.value = await api.auth.login(username, password)
		}
		catch (err)
		{
			session.value = undefined
		}
		
		isLoggedIn.value = (session.value !== undefined && session.value.user !== undefined)
	}


	async function logout()
	{
		if (session.value)
		{
			await api.auth.logout(session.value)
		}
		
		session.value = undefined
		isLoggedIn.value = false
	}
	

	return { 
		isLoggedIn,
		session, 
		currentUser,
		
		register, 
		login, 
		logout 
	}
})
