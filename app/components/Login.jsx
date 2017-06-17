import React from "react"
import 'font-awesome/css/font-awesome.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div className="login-container">
                <div className="login-box">
                    <h2 className="display-4">Login with</h2>
                    <ul className="login-buttons" >
                        <li title="Github"> </li>
                        <li title="Twitter"> </li>
                        <li title="Facebook"> </li>
                    </ul>
                </div>

            </div>
        )
    }
}