import * as redux from "redux"
import thunk from "redux-thunk"
import reducer from "reducers"

export let configure = (initState)=>{

    return redux.createStore(reducer, initState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))

}
