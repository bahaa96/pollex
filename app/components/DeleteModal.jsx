import React from "react"
import { startRemovePoll } from "actions"
import { connect } from "react-redux"

export default connect()((props) => {
    let { dispatch, id } = props
    return (
        <div className="delete-modal-container">
            <div className="black-screen animated fadeIn" onClick={()=>{ $(".delete-modal-container").hide() }}/>
            <div className="delete-modal">
                <i className="fa fa-close fa-lg" onClick={()=>{ $(".delete-modal-container").hide() }}/>
                <h3>Are you sure you want to delete this poll</h3>
                <button className="btn btn-outline-info" onClick={()=>{ $(".delete-modal-container").hide() }}>Cancel</button>
                <button className="btn btn-outline-danger" onClick={()=> {
                    dispatch(startRemovePoll(id))
                }}>delete</button>
            </div>
        </div>
    )
})