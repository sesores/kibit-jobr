import { ref, computed, watchEffect, watch } from 'vue'
import { defineStore } from 'pinia'

import api from '@/backend/Api'

import type { User } from '@/types/User'
import type { Offer } from '@/types/Offer'
import { useAuthStore } from './auth.store'
import type { Session } from '@/types/Session'



export const useApiStore = defineStore('api', () => {
	
	const auth = useAuthStore()
	
	watch(() => auth.isLoggedIn, (n) => {
		listMyOffers()
	})

	//watchEffect(effect)

	// auth.$subscribe((mutation, state) => {
	// 	console.log("[ AUTH CHANGED ]")
	// 	console.log("AUTH MUTATION", mutation)
	// 	console.log("AUTH STATE", state)

	// 	if (state.session === auth.session)
	// 	{
	// 		listOffersOfUser()
	// 	}
	// })

	const allOffers = ref<Offer[]>()
	const trendingOffers = ref<Offer[]>()
	const userOffers = ref<Offer[]>()
	const foundOffers = ref<Offer[]>()



	async function getOfferById(id:string):Promise<Offer | undefined>
	{
		return await api.offer.get(id)
	}


	async function listAllOffers()
	{
		allOffers.value = await api.offer.list()
	}


	async function listTrendingOffers()
	{
		trendingOffers.value = await api.offer.trending()
	}


	async function listMyOffers()
	{
		try
		{
			userOffers.value = (auth.session?.user?.id)
				? await listOffersOfUser(auth.session.user)
				: []
		}
		catch (err)
		{
			userOffers.value = []
		}
	}


	async function listOffersOfUser(user:User):Promise<Offer[]>
	{
		try
		{
			return api.offer.user(user.id)
		}
		catch (err)
		{
			return []
		}
	}


	async function searchOffers()
	{
		//foundOffers.value = backend.searchOffers()
	}

	
	// LOAD DEFAULTS
	listTrendingOffers()
	

	return {
		allOffers,
		trendingOffers,
		userOffers,
		foundOffers,

		getOfferById,
		listTrendingOffers, 
		listAllOffers, 
		listOffersOfUser, 
		searchOffers 
	}
})
