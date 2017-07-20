import expect from "expect"
import df from "deep-freeze-strict"

import searchText from "../../reducers/searchText"

export default () => {
    describe("SearchText", () => {
        it("Should SET_SEARCH_TEXT", () => {
            let action = {
                type: "SET_SEARCH_TEXT",
                text: "text"
            }
            expect(searchText(df(""), df(action))).toEqual("text")
        })
        it("Should return default state", () => {
            let action = {
                type: "default",
            }
            expect(searchText(df(""), df(action))).toEqual("")
        })
    })
}
