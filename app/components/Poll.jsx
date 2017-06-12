import React from "react"
import moment from "moment"

export default (props) => {
    let {votes, title, createdAt, id} = props
    return (
        <li>
            <h4><a href={"/poll/"+id}>{title}</a></h4>
            <div className="data">
                <p>{votes === 1 ? votes + " Vote" :votes + " Votes"}</p>
                <p>{moment.unix(createdAt).format("Do, MMM, YYYY, hh:mm")}</p>
            </div>
        </li>
    )
}