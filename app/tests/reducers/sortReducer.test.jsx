import expect from "expect"
import df from "deep-freeze-strict"

import sortReducer from "../../reducers/sortReducer"

export default () => {
    describe("sortReducer", () => {
        it("Should SET_SORT_OPTION", () => {
            let action = {
                type: "SET_SORT_OPTION",
                option: "option"
            }
            expect(sortReducer(df(""), df(action))).toEqual("option")
        })
        it("Should return default state", () => {
            let action = {
                type: "default",
            }
            expect(sortReducer(df(""), df(action))).toEqual("")
        })
    })
}
