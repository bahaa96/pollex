import expect from "expect"
import df from "deep-freeze-strict"

import authReducer from "../../reducers/authReducer"

export default () => {
    describe("SearchText", () => {
        it("Should SET_CURRENT_USER", () => {
            let action = {
                type: "SET_CURRENT_USER",
                user: { displayName: "geekbahaa" }
            }
            expect(authReducer(df(""), df(action))).toEqual(action.user)
        })
        it("Should return false when LOGOUT", () => {
            let action = {
                type: "LOGOUT"
            }
            expect(authReducer(df(""), df(action))).toEqual(false)
        })
        it("Should return default state", () => {
            let action = {
                type: "default",
            }
            expect(authReducer(df(""), df(action))).toEqual("")
        })
    })
}
