
import { useDate } from 'vuetify'

import { useAuthStore } from '@/stores/auth.store'

import type { User } from '@/types/User'



const format = {
	currency(amount:number | undefined, curr:string | undefined) 
	{
		if (!amount || !curr) return ''

		const formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: curr,
			maximumSignificantDigits: 3
		});

		return formatter.format(amount)
	},

	applicants(amount:number | undefined)
	{
		if (!amount) return ''

		return `${ amount } applicant${ (amount > 1) ? 's' : '' }`
	},

	by(user:User | undefined):string
	{
		if (!user) return ''

		const auth = useAuthStore()

		return (auth.isLoggedIn && user.id === auth.session?.user.id)
			? 'by you'
			: `by ${ user.username }`
	},

	dateTime(ts:number | undefined)
	{
		if (!ts) return ''

		const formatter = useDate()
		const d = new Date(ts * 1000)

		return formatter.format(d, 'fullDateTime24h')
	},

	date(ts:number | undefined)
	{
		if (!ts) return ''

		const formatter = useDate()
		const d = new Date(ts * 1000)
		
		return formatter.format(new Date(ts * 1000), 'fullDate')
	}
}



export default format