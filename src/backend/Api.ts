
import axios, { type AxiosResponse, AxiosError } from 'axios'

import type { Session } from '@/types/Session'
import type { Offer } from '@/types/Offer'
import type { User } from '@/types/User'

import SearchTerm from '@/types/SearchTerm'

import { useAuthStore } from '@/stores/auth.store'



axios.defaults.baseURL = ''



axios.interceptors.request.use((config) => {
	const authStore = useAuthStore()

	if (authStore.isLoggedIn) 
	{
		config.headers.Authorization = `Bearer ${ authStore.session?.token }`
	}

	return config
})



axios.interceptors.response.use(
	(response) => response,
	(error:AxiosError) => {
		const { data, status, config } = error.response!

		console.error("API ERROR: ", error)

		switch (status)
		{
			case 400:
				console.error(data)
				break
			
			case 401:
				console.error('Unauthorized')
				break
			
			case 404:
				console.error('Not found')
				break
			
			case 500:
				console.error('Server error')
				break
		}
		
		return Promise.reject(error)
	}
)



const body = <T>(response:AxiosResponse<T>) => response.data

const request = {
	get: <T>(url:string) => axios.get<T>(url).then(body),
	post: <T>(url:string, data: {}) => axios.post<T>(url, data).then(body),
	put: <T>(url:string, data: {}) => axios.put<T>(url, data).then(body),
	delete: <T>(url:string) => axios.delete(url)
}


const auth = {
	register: (user:User) => request.post<Session>('/auth/regiter', user),
	login: (username:string, password:string) => request.post<Session>('/auth/login', { username, password }),
	logout: (session:Session) => request.post<void>('/auth/logout', session)
}


const user = {
	get: (id:String) => request.get<User>(`/user/${ id }`)
}


const offer = {
	list: () => request.get<Offer[]>('/offer'),
	user: (id:string) => request.get<Offer[]>(`/offer/user/${ id }`),
	trending: () => request.get<Offer[]>(`/offer/trending`),
	get: (id:string) => request.get<Offer>(`/offer/${ id }`),
	search: (term:SearchTerm) => request.post<Offer[]>('/offer/search', term),
	
	create: (offer:Offer) => request.post<Offer>('/offer', offer),
	update: (offer:Offer) => request.put<Offer>('/offer', offer),
	delete: (id:string) => request.delete<void>(`/offer/${ id }`),
	
	apply: (offer:Offer, user:User) => request.post<Offer>('/offer/apply', { offer, user }),
	cancel: (offer:Offer, user:User) => request.post<Offer>('/offer/cancel', { offer, user }),
	
	tags: () => request.get<string[]>('/offer/tags')
}


const api = {
	auth,
	user,
	offer
}


export default api