

// STYLES
import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'


// VUE
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)


// MOCKING
import { Mock } from '@/backend/Mock'
const mock = new Mock(true)


// PINIA
import { createPinia } from 'pinia'
import { useApiStore } from './stores/api.store'
import { useAuthStore } from './stores/auth.store'

app.use(createPinia())

const auth = useAuthStore()
const api = useApiStore()


// VUETIFY
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives
})

app.use(vuetify)


// GLOBAL FILTERS
import { useDate } from 'vuetify'

import type { User } from '@/types/User'

app.config.globalProperties.$filters = {
	currency(amount:number, curr:string) 
	{
		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: curr,
			maximumSignificantDigits: 3
		});

		return formatter.format(amount)
	},

	applicants(amount:number)
	{
		return `${ amount } applicant${ (amount > 1) ? 's' : '' }`
	},

	by(user:User):string
	{
		return (auth.isLoggedIn && user.id === auth.session?.user.id)
			? 'by you'
			: `by ${ user.username }`
	},

	dateTime(ts:number)
	{  
		const formatter = useDate()
		const d = new Date(ts * 1000)

		return formatter.format(d, 'fullDateTime24h')
	},

	date(ts:number)
	{
		const formatter = useDate()
		const d = new Date(ts * 1000)
		
		return formatter.format(new Date(ts * 1000), 'fullDate')
	}
}


// MOUNT
app.mount('#app')
