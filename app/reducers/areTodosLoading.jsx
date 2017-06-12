export default (state=false, action) =>{
    switch (action.type){
        case "TOGGLE_ARE_TODOS_LOADING":
            return !state
        default:
            return state
    }
}