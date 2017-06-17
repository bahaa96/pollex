export default (state = "", action) =>{
    switch (action.type) {
        case "SET_SEARCH_TEXT":
            return action.text
        default:
            return state
    }
}