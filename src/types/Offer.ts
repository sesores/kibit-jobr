import type { Job } from "./Job"
import type { User } from "./User"

type Offer = {
    id:string
    job:Job
	owner:string
	applicants:string[]
}

export type { Offer }
