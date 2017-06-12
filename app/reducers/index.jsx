import { combineReducers } from "redux"
import polls from "./polls.jsx"
import searchText from "./searchText.jsx"
import areTodosLoading from "./areTodosLoading.jsx"

export default combineReducers({
    polls,
    searchText,
    areTodosLoading
})