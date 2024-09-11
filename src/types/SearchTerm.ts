import type { User } from "./User"



export default class SearchTerm {
    phrase?:string
    tags:string[] = []
	owner?:User
    salary:number[] = [ 0, 0 ]


    isValid():boolean 
    {
        if (this.phrase && this.phrase.length >= 3)
            return true

        if (this.tags.length > 0)
            return true

        if (this.owner)
            return true

        if (this.salary[0] != this.salary[1] && this.salary[1] > 0)
            return true

        return false
    }


    clear()
    {
        this.phrase = ''
        this.tags = []
        this.owner = undefined
        this.salary = [ 0, 0 ]
    }
}
