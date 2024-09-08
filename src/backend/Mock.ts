
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
		/*
		list: () => request.get<Offer[]>('/offer'),
		my: () => request.get<Offer[]>('/offer/my'),
		get: (id:string) => request.get<Offer>(`/offer/${ id }`),
		create: (offer:Offer) => request.post<Offer>('/offer', offer),
		update: (offer:Offer) => request.put<Offer>('/offer', offer),
		delete: (id:string) => request.delete<void>(`/offer/${ id }`),
		apply: (offer:Offer, user:User) => request.post<Offer>('/offer/apply', { offer, user })
		*/

		// LIST
		this.mock.onGet('/offer').reply((config) => {
			return [ 200, this.db.offers ]
		})


		// LIST BY USER
		this.mock.onGet(/\/offer\/user\/*/).reply((config) => {
			const userId = config.url?.split('/user/')[1]

			if (!userId)
				return [ 404 ]
			
			console.log('MOCK :: OFFER / USER / ', userId)

			const user = this.getUserById(userId)

			if (!user)
				return [ 404 ]

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

			return [ 200, candidates ]
		})


		// LIST TRENDING
		this.mock.onGet('/offer/trending').reply((config) => {
			return [ 200, [...this.db.offers].sort(() => Math.random() - 0.5) ]
		})
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
					id: '624b8800-9035-4b02-9580-fd9926cf88cf',
					username: 'carol',
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
						title: 'VUE 3 - Frontend Developer',
						description: 'Lorem ipsum dolor sit amet.',
						tags: [ 'frontend', 'vue' ],
						created: 12345678,
						salary: {
							amount: 5000,
							currency: 'EUR'
						}
					},
					owner: this.db.users[0].id,
					applicants: [
						this.db.users[2].id
					]
				},
				{
					id: '29d2c8d7-4287-4543-8efb-503627586314 ',
					job: {
						id: 'd8548cc0-bd02-4a58-835e-def9fe3efdcd ',
						title: 'NodeJS - Backend Developer',
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
						this.db.users[2].id, this.db.users[3].id
					]
				},
				{
					id: '5530ed47-1a6f-4ded-a9d0-dc6016177625 ',
					job: {
						id: '6ced7eed-1779-4af3-bb1e-c7bf3945d08f',
						title: 'React, Spring - Fullstack Developer',
						description: 'Lorem ipsum dolor sit amet.',
						tags: [ 'fullstack', 'frontend', 'backend', 'spring' ],
						created: 12345678,
						salary: {
							amount: 15000,
							currency: 'EUR'
						}
					},
					owner: this.db.users[1].id,
					applicants: [
						this.db.users[3].id
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

	

	// UTILS
	getUserById(id:string):User | undefined
	{
		const candidates = this.db.users.filter((user) => user.id === id)

		return (candidates.length == 1) ? candidates[0] : undefined
	}

	getOfferById(id:string):Offer | undefined
	{
		const candidates = this.db.offers.filter((offer) => offer.id === id)

		return (candidates.length == 1) ? candidates[0] : undefined
	}
}
