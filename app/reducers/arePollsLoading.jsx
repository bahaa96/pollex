export default (state = false, action) =>{
    switch (action.type){
        case "TOGGLE_ARE_POLLS_LOADING":
            return !state
        default:
            return state
    }
}
