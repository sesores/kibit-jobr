import type { User } from "./User"

type SearchTerm = {
    phrase:string
    tags:string[]
	owner?:User
    salary:number[]
}

export type { SearchTerm }
