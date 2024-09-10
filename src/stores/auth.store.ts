import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/backend/Api'

import type { Session } from '@/types/Session'
import type { User } from '@/types/User'

import router from '@/router/index'



export const useAuthStore = defineStore('auth', () => {

	const session = ref<Session>()
	
	const isLoggedIn = computed<boolean>(() => !!session.value?.user)
	const isEmployer = computed<boolean>(() => session.value?.user.type == 'employer' ?? false)
	const isApplicant = computed<boolean>(() => session.value?.user.type == 'applicant' ?? false)

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
		
		router.push(isLoggedIn ? '/dashboard' : '/')
	}


	async function logout()
	{
		if (session.value)
		{
			await api.auth.logout(session.value)
		}
		
		session.value = undefined
		
		router.push('/')
	}
	

	return { 
		isLoggedIn,
		isEmployer,
		isApplicant,
		session, 
		currentUser,
		
		getUserById,
		register, 
		login, 
		logout 
	}
})
