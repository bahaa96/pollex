import expect from "expect"
import df from "deep-freeze-strict"

import pollsReducer from "../../reducers/polls"
import { polls } from "../base"

export default () => {
    describe("Polls", () => {
        it("Should ADD_POLLS", () => {
            let action = {
                type: "ADD_POLLS",
                polls
            }
            expect(pollsReducer(df([]), df(action))).toEqual(action.polls)
        })
        it("Should ADD_POLL", () => {
            let action = {
                type: "ADD_POLL",
                poll: polls[0]
            }
            expect(pollsReducer(df([]), df(action))).toEqual([action.poll])
        })
        it("Should UPDATE_POLL", () => {
            let action = {
                type: "UPDATE_POLL",
                id: 1,
                updates: {title: "Red"}
            }
            expect(pollsReducer(df(polls), df(action))[0].title).toBe("Red")
        })
        it("Should REMOVE_POLL", () => {
            let action = {
                type: "REMOVE_POLL",
                id: 1
            }
            expect(pollsReducer(df(polls), df(action))).toEqual([polls[1]])
        })
        it("Should return default state", () => {
            let action = {
                type: "default",
            }
            expect(pollsReducer(df([]), df(action))).toEqual([])
        })
    })

}