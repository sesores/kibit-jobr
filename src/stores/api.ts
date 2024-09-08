import { ref, computed, watchEffect, watch } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'


import type { User } from '@/types/User'
import type { Offer } from '@/types/Offer'
import { useAuthStore } from './auth'
import type { Session } from '@/types/Session'



export const useApiStore = defineStore('api', () => {
	
	const auth = useAuthStore()
	
	watch(() => auth.isLoggedIn, (n) => {
		listOffersOfUser()
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



	function getOfferById(id:string):Offer | undefined
	{
		return undefined
		//return backend.getOfferById(id)
	}


	function listTrendingOffers()
	{
		//trendingOffers.value = backend.listTrendingOffers()
	}


	function listAllOffers()
	{
		//allOffers.value = backend.listAllOffers()
	}


	function listOffersOfUser()
	{
		//userOffers.value = (auth?.session?.user) ? backend.listOffersOfUser(auth.session.user) : []
	}


	function searchOffers()
	{
		//foundOffers.value = backend.searchOffers()
	}

	// LOAD DEFAULTS
	listAllOffers()
	listOffersOfUser()
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
