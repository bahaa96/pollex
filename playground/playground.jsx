// import * as redux from "redux"
// import thunk from "redux-thunk"
// const initialState = {
//     polls: [],
// };
//
// let reducer = (state = initialState, action) =>{
//     switch(action.type) {
//         case "ADD_POLL":
//             return {
//                 polls: [
//                     ...state.polls,
//                     action.poll
//                 ]
//             }
//         default:
//             return state
//     }
// }
//
// let store = redux.createStore(reducer,  redux.compose(
//     redux.applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// ))
//
// store.subscribe(()=>{
//     let currentState = store.getState()
//     console.log(currentState)
// })
//
// store.dispatch({
//     type: "ADD_POLL",
//     poll: {
//         id: 1,
//         title: "What's  your fav Color",
//         votes: 230
//     }
// })



