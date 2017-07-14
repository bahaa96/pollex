import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { startLogin } from "actions"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        try { this.from = this.props.location.state.from } catch (e) {this.from = "/polls"}
    }
    handleLogin(e){
        e.preventDefault()
        this.props.dispatch(startLogin(e.target.title, this.from))
    }
    render(){
        return this.props.auth ? <Redirect to={this.from}/> : (
            <div className="login-container">
                <div className="login-box col-sm-8 justify-content-center">
                    <h2 className="display-4">Login with</h2>
                    <ul className="login-buttons" >
                        <li title="Github" onClick={this.handleLogin}/>
                        <li title="Twitter" onClick={this.handleLogin}/>
                        <li title="Facebook" onClick={this.handleLogin}/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth
        }
    }
)(Login)
