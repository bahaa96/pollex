import expect from "expect"
// import React from "react"
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom"

import { configure } from "store"

import PollsList from "PollsList"
import Poll from "Poll"
import { polls } from "../base"


// describe("Polls List", ()=>{
//     it("Should render PollsList properly", ()=>{
//         let store = configure({ polls })
//         let provider = TestUtils.renderIntoDocument(
//             <Provider store={ store } >
//                 <BrowserRouter >
//                     <PollsList />
//                 </BrowserRouter>
//             </Provider>
//         )
//         let router = TestUtils.scryRenderedComponentsWithType(provider, BrowserRouter)[0]
//         let pollsList = TestUtils.scryRenderedComponentsWithType(router, PollsList)[0]
//         let renderedPolls = TestUtils.scryRenderedComponentsWithType(pollsList, Poll)
//         expect().toBe(2)
//     })
// })