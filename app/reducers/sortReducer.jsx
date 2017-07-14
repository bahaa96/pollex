export default (state="", action) => {
    switch (action.type) {
        case "SET_SORT_OPTION":
            return action.option
        default:
            return state
    }
}