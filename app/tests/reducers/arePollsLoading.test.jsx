import expect from "expect"
import df from "deep-freeze-strict"

import arePollsLoading from "../../reducers/arePollsLoading"

export default () => {
    describe("arePollsLoading", () => {
        it("Should TOGGLE_ARE_POLLS_LOADING", () => {
            let action = {
                type: "TOGGLE_ARE_POLLS_LOADING",
            }
            expect(arePollsLoading(df(false), df(action))).toEqual(true)
        })
        it("Should return default state", () => {
            let action = {
                type: "default",
            }
            expect(arePollsLoading(df(false), df(action))).toEqual(false)
        })
    })
}
