import { ref, computed, watchEffect, watch, reactive } from 'vue'
import { defineStore } from 'pinia'

import api from '@/backend/Api'
import { useAuthStore } from './auth.store'

import type { User } from '@/types/User'
import type { Offer } from '@/types/Offer'
import type { Session } from '@/types/Session'
import type { SearchTerm } from '@/types/SearchTerm'



export const useApiStore = defineStore('api', () => {
	
	const auth = useAuthStore()
	
	watch(() => auth.isLoggedIn, (n) => {
		listMyOffers()
	})

	// OFFERS
	const allOffers = ref<Offer[]>([])

	watch(allOffers, (n) => { listTags() })

	const trendingOffers = ref<Offer[]>([])
	const userOffers = ref<Offer[]>([])
	
	// SEARCH
	const foundOffers = ref<Offer[]>([])
	
	const searchTerm = reactive<SearchTerm>({
		phrase: '',
		tags: [],
		salary: [ 0, 100000 ]
	})

	let searchTimeout = -1;

	watch(searchTerm, (n) => {
		clearTimeout(searchTimeout)
		
		searchTimeout = setTimeout(() => {
			console.log("SEARCH", searchTerm)
		}, 500)
	})

	// META
	const tags = ref<string[]>([])



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
			userOffers.value = (auth.currentUser)
				? await listOffersOfUser(auth.currentUser)
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


	async function searchOffers(term:SearchTerm)
	{
		//foundOffers.value = backend.searchOffers()
	}


	async function createOffer(offer:Offer) 
	{
		if (!auth.currentUser || !auth.isEmployer)	
			return

		try
		{
			const result = await api.offer.create(offer)

			await listMyOffers()
			await listTrendingOffers()

			return result
		}
		catch (err)
		{
			console.error(err)
		}
	}


	async function updateOffer(offer:Offer) 
	{
		if (!auth.currentUser || !auth.isEmployer)	
			return

		try
		{
			const result = await api.offer.update(offer)

			await listMyOffers()
			await listTrendingOffers()

			return result
		}
		catch (err)
		{
			console.error(err)
		}
	}


	async function deleteOffer(id:string) 
	{
		if (!auth.currentUser || !auth.isEmployer)	
			return

		try
		{
			const result = await api.offer.delete(id)

			await listMyOffers()
			await listTrendingOffers()

			return result
		}
		catch (err)
		{
			console.error(err)
		}
	}


	async function applyToOffer(offer:Offer)
	{
		if (!auth.currentUser)
			return

		try
		{
			const result = await api.offer.apply(offer, auth.currentUser)
			
			await listMyOffers()
			await listTrendingOffers()

			return result
		}
		catch (err)
		{
			console.error(err)
		}
	}


	async function cancelOffer(offer:Offer)
	{
		if (!auth.currentUser)
			return

		try
		{
			const result = await api.offer.cancel(offer, auth.currentUser)
			
			await listMyOffers()
			await listTrendingOffers()

			return result
		}
		catch (err)
		{
			console.error(err)
		}
	}


	async function listTags()
	{
		tags.value = await api.offer.tags()
	}


	// LOAD DEFAULTS
	listTrendingOffers()
	listTags()
	

	return {
		allOffers,
		trendingOffers,
		userOffers,
		searchTerm,
		foundOffers,
		tags,

		getOfferById,
		listTrendingOffers, 
		listAllOffers, 
		listMyOffers,
		listOffersOfUser, 
		searchOffers,

		createOffer,
		updateOffer,
		deleteOffer,

		applyToOffer,
		cancelOffer,

		listTags
	}
})
