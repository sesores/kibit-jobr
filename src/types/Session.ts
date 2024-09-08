
import type { User } from "./User"

type Session = {
	user:User
	token:string
}

export type { Session }