
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import api from '@/backend/Api'

import type { Session } from '@/types/Session'
import type { Offer } from '@/types/Offer'
import type { User } from '@/types/User'



type DataBase = {
	users:User[]
	offers:Offer[]
}



export class Mock
{
	mock = new MockAdapter(axios)

	db:DataBase = {
		users: [], 
		offers: [] 
	}



	constructor(reset:boolean)
	{
		this.load(reset)
		
		this.auth()
		this.offer()

		/*this.mock.onAny().reply((config) => {
			console.log('MOCK', config)
		
			return [ 200, {} ]
		})*/
	}



	// AUTH
	auth():void
	{
		// REGISTER
		this.mock.onPost('/auth/register').reply((config) => {
			const user = JSON.parse(config.data) as User

			console.log('REGISTER', config, user)

			this.db.users.push(user)
			this.commit()

			return [ 201, user ]
		})

		// LOGIN
		this.mock.onPost('/auth/login').reply((config) => {
			const body = JSON.parse(config.data)

			console.log('LOGIN', config, body)

			if (body.password !== 'pwd')
				return [ 401 ]

			const candidates = this.db.users.filter((user) => user.username === body.username)

			if (candidates.length !== 1)
				return [ 401 ]

			return [ 200, {
				user: candidates[0],
				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
			}]
		})

		// LOGOUT
		this.mock.onPost('/auth/logout').reply(200)
	}


	
	// OFFER
	offer():void
	{
	}


	
	// STORAGE
	load(reset:boolean):void
	{
		const storage = localStorage.getItem("db")

		if (reset || !storage)
		{
			console.log("BE::CREATE DEFAULTS")

			this.db.users = [
				{
					id: '1c32969d-27d4-4068-b6f5-855f81b2385b',
					username: 'john',
					type: 'employer'
				},
				{
					id: '89711283-d3e4-4822-a763-0789de2ca03a',
					username: 'bob',
					type: 'applicant'
				},
				{
					id: '5baf42f3-81f1-4e3d-8af7-cf6dbe7028f1',
					username: 'alice',
					type: 'applicant'
				}
			]

			this.db.offers = [
				{
					id: '98651caf-d6a0-433f-ad2d-5f52bd678e76',
					job: {
						id: '8fdfcfdb-78ac-448a-9088-bf3bcda7e1fe',
						title: 'VUE.JS 3 - Frontend Developer',
						description: 'Lorem ipsum dolor sit amet.',
						tags: [ 'frontend', 'vue' ],
						created: 12345678,
						salary: {
							amount: 6000,
							currency: 'EUR'
						}
					},
					owner: this.db.users[0].id,
					applicants: [
						this.db.users[2].id
					]
				},
				{
					id: '98651caf-d6a0-433f-ad2d-5f52bd678e76',
					job: {
						id: '8fdfcfdb-78ac-448a-9088-bf3bcda7e1fe',
						title: 'NODE.JS - Backend Developer',
						description: 'Lorem ipsum dolor sit amet.',
						tags: [ 'backend', 'node' ],
						created: 12345678,
						salary: {
							amount: 10000,
							currency: 'EUR'
						}
					},
					owner: this.db.users[0].id,
					applicants: [
						this.db.users[1].id
					]
				}
			]

			this.commit()
		}
		else
		{
			console.log("BE::LOAD DEFAULTS")

			this.db = JSON.parse(storage) as DataBase
		}
	}



	commit():void
	{
		localStorage.setItem("db", JSON.stringify(this.db))
	}
}


	// AUTH
	/*getUserById(id:string):User | undefined
	{
		const candidates = this.db.users.filter((user) => user.id === id)

		return (candidates.length == 1) ? candidates[0] : undefined
	}

	register(username:string, type:string, password:string):Session | undefined
	{
		console.log(`BE::REGISTER: ${ username } @ ${ password }`)

		return undefined
	}


	login(username:string, password:string):Session | undefined
	{
		console.log(`BE::LOGIN: ${ username } @ ${ password }`)
		
		if (password !== 'pwd')
			throw new Error('Invalid password!')

		const candidates = this.db.users.filter((user) => user.username === username)

		if (candidates.length !== 1)
			throw new Error('Invalid username!')

		return {
			user: candidates[0],
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}
	}


	logout(session:Session):void
	{
	}
	


	// OFFERS
	getOfferById(id:string):Offer | undefined
	{
		const candidates = this.db.offers.filter((offer) => offer.id === id)

		return (candidates.length == 1) ? candidates[0] : undefined
	}


	listTrendingOffers():Offer[]
	{
		console.log(`BE::LIST TRENDING OFFERS`)

		return []
	}


	listAllOffers():Offer[]
	{
		console.log(`BE::LIST ALL OFFERS`)
		
		return this.db.offers
	}


	listOffersOfUser(user:User):Offer[]
	{
		console.log(`BE::LIST OFFERS OF USER: ${ user.username }`)
		
		let candidates:Offer[] = []

		switch (user.type)
		{
			case 'applicant':
				candidates = this.db.offers.filter((offer) => offer.applicants.includes(user.id))
				break
			
			case 'employer':
				candidates = this.db.offers.filter((offer) => offer.owner === user.id)
				break
		}

		return candidates
	}


	searchOffers():Offer[]
	{
		console.log(`BE::SEARCH OFFERS`)
		
		return []
	}
}*/
