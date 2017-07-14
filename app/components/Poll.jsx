import React from "react"
import moment from "moment"
import { Link } from "react-router-dom"
import { connect } from "react-redux"


export default connect()((props) => {
    let {votes, title, createdAt, id} = props
    return (
        <li>
            <h4><Link to={`/me?id=${ id }`}>{title}</Link></h4>
            <div className="data">
                <p>{votes === 1 ? votes + " Vote" :votes + " Votes"}</p>
                <p>{moment.unix(createdAt).format("Do, MMM, YYYY, hh:mm")}</p>
            </div>
        </li>
    )
})
