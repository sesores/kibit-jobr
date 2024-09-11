
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SearchView from '@/views/SearchView.vue'
import OfferDetailsView from '@/views/OfferDetailsView.vue'

import { useAuthStore } from '@/stores/auth.store'
import { useApiStore } from '@/stores/api.store'




const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/search',
			name: 'search',
			component: SearchView
		},
		{
			path: '/offer/:id([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})',
			name: 'offer-details',
			component: OfferDetailsView
		},

		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('@/views/DashboardView.vue')
		},
		{
			path: '/offer/create',
			name: 'offer-create',
			component: () => import('@/views/OfferCreateView.vue')
		},
		{
			path: '/offer/:id([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/edit',
			name: 'offer-edit',
			component: () => import('@/views/OfferEditView.vue')
		}
	]
})



router.beforeEach((to, from) => {
	const name = to.name as string

	// FROM
	if ('search' === from.name)
	{
		const api = useApiStore()
		api.searchTerm.clear()
	}

	// TO
	if ([ 'home', 'login', 'search', 'offer-details' ].includes(name))
	{
		return true
	}
	else
	{
		const auth = useAuthStore()

		if ('dashboard' === name)
		{
			return (auth.isLoggedIn) ? true : { name: 'home' }
		}
		else if ([ 'offer-create', 'offer-edit' ].includes(name))
		{
			return (auth.isEmployer) ? true : { name: 'home' }
		}
	}

	console.error('ROUTER :: UNHANDLED', to)
})



export default router
