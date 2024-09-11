import { ref, computed, watchEffect, watch, reactive } from 'vue'
import { defineStore } from 'pinia'

import router from '@/router'

import api from '@/backend/Api'
import { useAuthStore } from './auth.store'

import type { User } from '@/types/User'
import type { Offer } from '@/types/Offer'
import type { Session } from '@/types/Session'

import SearchTerm from '@/types/SearchTerm'
import type { AxiosError } from 'axios'



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
	
	const searchTerm = reactive<SearchTerm>(new SearchTerm())

	let searchTimeout = -1;

	watch(searchTerm, (n) => {
		clearTimeout(searchTimeout)
		
		if (!searchTerm.isValid())
			return

		searchTimeout = setTimeout(() => {
			console.log("SEARCH", searchTerm)

			searchOffers(searchTerm)
		}, 500)
	})

	// META
	const tags = ref<string[]>([])

	const message = ref({
		type: 'success',
		title: '',
		text: '',
		show: false,

		display(_type:string, _title:string, _text:string = '') 
		{
			this.type = _type
			this.title = _title
			this.text = _text
			this.show = true
		}
	})



	async function getOfferById(id:string):Promise<Offer | undefined>
	{
		try {
			const offer = await api.offer.get(id)
			return offer
		} 
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())

			return undefined
		}

		/*if (offer)
		{
			[ allOffers, userOffers, trendingOffers ].forEach((list) => {
				const index = list.value.findIndex((o) => o.id === offer.id)

				if (index > -1)
				{
					list.value[index] = offer
				}
			})
		}*/

	}


	async function listAllOffers()
	{
		try
		{
			allOffers.value = await api.offer.list()
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())

			allOffers.value = []
		}
	}


	async function listTrendingOffers()
	{
		try
		{
			trendingOffers.value = await api.offer.trending()
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())

			trendingOffers.value = []
		}
	}


	async function listMyOffers()
	{
		try
		{
			userOffers.value = (auth.currentUser)
				? await listOffersOfUser(auth.currentUser)
				: []
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())

			userOffers.value = []
		}
	}


	async function listOffersOfUser(user:User):Promise<Offer[]>
	{
		try
		{
			return api.offer.user(user.id)
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())

			return []
		}
	}


	async function searchOffers(term:SearchTerm)
	{
		if (!term.isValid())
			return

		try
		{
			foundOffers.value = await api.offer.search(term)
	
			console.log('SEARCH RESULT', foundOffers.value.length)
	
			router.push('/search')
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())
		}
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
			await listTags()

			message.value.display('success', 'Your Offer has been created successfully.')

			return result
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())
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
			await listTags()

			message.value.display('success', 'Your Offer has been updated successfully.')

			return result
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())
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
			await listTags()

			message.value.display('success', 'Your Offer has been deleted successfully.')

			return result
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())
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

			message.value.display('success', 'You\'ve applied to this Offer successfully.')

			return result
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())
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

			message.value.display('success', 'You\'ve cancelled this Offer successfully.')

			return result
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())
		}
	}


	async function listTags()
	{
		try
		{
			tags.value = await api.offer.tags()
		}
		catch (err:any)
		{
			console.error(err)
			message.value.display('error', 'Something went wrong.', err.toString())
		}
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
		message,

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
}, 
{
	persist: {
		omit: [ 'searchTerm', 'foundOffers', 'message' ]
	}
})
