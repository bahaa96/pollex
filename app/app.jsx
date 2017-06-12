import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import ReallySmoothScroll from 'really-smooth-scroll'

import Router from "./router/index.jsx"
import { startAddPolls } from "actions"

import "style-loader!css-loader!sass-loader!../styles/app.scss"
import 'font-awesome/css/font-awesome.css'
import "animate.css/animate.min.css"

import {configure} from "store"


let store = configure()

store.dispatch(startAddPolls())

ReallySmoothScroll.shim();

ReallySmoothScroll.config({
    mousewheelSensitivity: 6, // Default
    keydownSensitivity: 6 // Default (When you press arrow down/up key)
});

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById("app")
)