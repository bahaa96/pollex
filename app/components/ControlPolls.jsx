import React from "react"
import { connect } from "react-redux"

import { setSortOption } from "actions"

class ControlPolls extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            byDate: true,
            byName: true,
            byVotes: true
        }
    }
    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip()
    }
    render(){
        let { byDate, byVotes, byName} = this.state,
            { dispatch } = this.props
        return (
            <ul className="control-polls">
                <li onClick={()=>{
                    dispatch(setSortOption(byDate ? "createdAt" : "-createdAt"))
                    byDate = !byDate
                }} data-toggle="tooltip" data-placement="top" title="By date"><i className="fa fa-calendar fa-lg"/></li>
                <li onClick={()=>{
                    dispatch(setSortOption(byName ? "title" : "-title"))
                    byName = !byName
                }} data-toggle="tooltip" data-placement="top" title="By name"><i className="fa fa-sort-alpha-asc fa-lg"/></li>
                <li onClick={()=>{
                    dispatch(setSortOption(byVotes ? "votes" : "-votes"))
                    byVotes = !byVotes
                }} data-toggle="tooltip" data-placement="top" title="By votes"><i className="fa fa-sort fa-lg"/></li>
            </ul>
        )
    }
}


export default connect()(ControlPolls)