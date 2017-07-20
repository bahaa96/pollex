import polls from "./polls.test"
import searchText from "./searchText.test"
import sortReducer from "./sortReducer.test"
import authReducer from "./authReducer.test"
import arePollsLoading from "./arePollsLoading.test"

describe("Reducers", () => {
    polls()
    searchText()
    sortReducer()
    authReducer()
    arePollsLoading()
})

