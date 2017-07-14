import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"
import { getCurrentUser } from "LocalStorage"

export default connect(
    (state) => {
        return {
            auth: state.auth
        }
    }
)((props) => {
    let { component: Component, ...rest } = props
    return (
            <Route {...rest} render={ownProps => (
                props.auth || getCurrentUser() ? <Component {...ownProps}/> :
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: ownProps.location }
                    }}/>
            )}/>
    )

})