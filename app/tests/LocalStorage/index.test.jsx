import expect from "expect"
import * as LocalStorage from "LocalStorage"
import { user, polls} from "../base.js"


describe("LocalStorage", ()=> {
    beforeEach(()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("polls")
        localStorage.removeItem("votes")
    })

    it("Should store the logged in user", ()=> {
        LocalStorage.storeUser(user)
        expect(JSON.parse(localStorage.getItem("user"))).toEqual(user)
    })
    it("Should get the stored User ", ()=> {
        LocalStorage.storeUser(user)
        expect(LocalStorage.getCurrentUser()).toEqual(user)
    })
    it("Should remove tha current user ", ()=> {
        LocalStorage.storeUser(user)
        LocalStorage.removeCurrentUser()
        expect(LocalStorage.getCurrentUser()).toBe(undefined)
    })
    it("Should store polls properly", ()=> {
        LocalStorage.storePolls(polls)
        expect(JSON.parse(localStorage.getItem("polls"))).toEqual(polls)
    })
    it("Should set votes properly", ()=> {
        LocalStorage.setVotes(1234, 2)
        expect(JSON.parse(localStorage.getItem("votes"))).toEqual({
            [1234] : { [2]: true }
        })
    })
    it("Should get proper votes", ()=> {
        LocalStorage.setVotes(1234, 2)
        expect(LocalStorage.getVotes()).toEqual({
            [1234] : { [2]: true }
        })
    })
})