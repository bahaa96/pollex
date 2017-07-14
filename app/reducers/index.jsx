import { combineReducers } from "redux"

import polls from "./polls.jsx"
import searchText from "./searchText.jsx"
import arePollsLoading from "./arePollsLoading.jsx"
import sortReducer from "./sortReducer.jsx"
import authReducer from "./authReducer.jsx"


export default combineReducers({
    polls,
    searchText,
    arePollsLoading,
    sortOption: sortReducer,
    auth: authReducer
})