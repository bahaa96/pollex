import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"


import { history } from "store"
import Main from "Main"
import PollPage from "PollPage"
import Login from "Login"
import NotFound from "NotFound"
import PrivateRoute from "PrivateRoute"
import PublicPollPage from "PublicPollPage"
import HomePage from "HomePage"

export default class Router extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={"/test"} render={(props) => <h1>{new URLSearchParams(props.location.search).get("id")}</h1>}/>
                    <PrivateRoute  path={'/polls'} component={Main} />
                    <PrivateRoute path={"/me"} component={PollPage}/>
                    <Route path={"/poll"} component={PublicPollPage} />
                    <Route path="/login" component={Login} />
                    <Route exact path={"/"} component={HomePage}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
}



