
type Job = {
    id?:string
    title:string
    description:string
    tags:string[]
    created:number
    salary: 
	{
        amount:number
        currency:string
	}
}

export type { Job }
