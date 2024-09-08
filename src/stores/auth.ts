import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

import type { Session } from '@/types/Session'
import type { User } from '@/types/User'
import api from '@/backend/Api'



export const useAuthStore = defineStore('auth', () => {

	const session = ref<Session>()
	
	const isLoggedIn = ref<boolean>(false)
	const currentUser = computed<User | undefined>(() => session.value?.user )



	async function getUserById(id:string):Promise<User | undefined>
	{
		return undefined
		//return backend.getUserById(id)
	}


	async function register(username:string, type:string, password:string)
	{
		/*try
		{
			session.value = backend.register(username, type, password)
		}
		catch (e)
		{
			console.error(e)

			session.value = undefined
		}*/
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

		console.log("AUTH STORE :: LOGIN", session, isLoggedIn)

		/*axios.post<Session>(API.AUTH_LOGIN, {
			username,
			password
		}).then((response) => {  
			session.value = response.data
			isLoggedIn.value = (session.value !== undefined && session.value.user !== undefined)
		}).catch((err => {
			console.error(err)

			session.value = undefined
			isLoggedIn.value = false
		}))*/
	}


	async function logout()
	{
		if (session.value)
		{
			await api.auth.logout(session.value)

			/*try
			{
				const response = await axios.post(API.AUTH_LOGOUT, session.value)

				console.log('AUTH LOGOUT: ', response)
			}
			catch (e)
			{
				console.error(e)
			}*/
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
