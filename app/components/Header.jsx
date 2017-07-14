import React from "react"
import { connect } from "react-redux"
import { startLogout } from "actions"
import { getCurrentUser } from "LocalStorage"

export default connect(
    (state) => {
        return {
            auth: state.auth
        }
    }
)( (props) =>{
    let { displayName, photoURL } = props.auth || getCurrentUser()
    return (
        <div className="jumbotron">
            <div className="row justify-content-center">
                <div className="col-10 col-sm-8 col-md-6">
                    <div className="image-wrapper">
                        <img className="img-fluid" src={ photoURL } alt="User's photo" />
                    </div>
                    <h3>{ displayName }</h3>
                    <span className="lead"><a onClick={(e)=>{
                        e.preventDefault()
                        props.dispatch(startLogout())
                    }}><i className="fa fa-sign-out"/> Logout</a></span>
                </div>
            </div>
        </div>
    )
})
