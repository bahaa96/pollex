import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import Main from "Main"
import PollPage from "PollPage"
import Test from "Test"
import Login from "Login"

export default class Router extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Route exact path={'/'} component={Main}/>
                    <Route path={"/poll/:id"} render={({match})=>{
                        return <PollPage id={match.params.id}/>
                    }}/>
                    <Route path={"/test"} component={Test}/>
                    <Route path="/login" component={Login}/>
                </div>
            </BrowserRouter>
        )
    }
}

