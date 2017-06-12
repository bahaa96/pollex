import * as redux from "redux"
import thunk from "redux-thunk"
import reducer from "reducers"

export let configure = (initState)=>{

    // let reducer = (state = {polls: []}, action) =>{
    //     switch(action.type) {
    //         case "ADD_POLL":
    //             return {
    //                 polls: [
    //                     ...state.polls,
    //                     action.poll
    //                 ]
    //             }
    //         default :
    //             return state
    //     }
    // }
    let store = redux.createStore(reducer, initState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))


    return store
}
