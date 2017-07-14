import React from "react"
import Poll from "Poll"
import {connect} from "react-redux"
const sortBy = require("sort-by")

import ContentLoader from "ContentLoader"
import { startAddPolls } from "actions"

import "jquery-ui/ui/widgets/sortable"
import "../../public/jquery.ui.sortable-animation"

class PollsList extends React.Component {
    constructor(props){
        super(props)
        this.renderPolls = this.renderPolls.bind(this)
        this.props.dispatch(startAddPolls())
    }
    renderPolls(){
        let {arePollsLoading, polls, searchText, sortOption} = this.props
        if (arePollsLoading){
            return <ContentLoader/>
        }else {
            if (polls.length) {
                return polls.filter(el => el.title.includes(searchText.toLowerCase())).sort(sortBy(sortOption)).map((poll, index) => <Poll key={index} {...poll}/>)
            }else {
                return <h2 className="no-polls">No Polls To show</h2>
            }
        }

    }
    componentDidMount(){
        $(".polls-list ul").sortable({
            animation: 200,
            axis: "y",
        });
    }
    render(){
        return (
            <div className="polls-list">
                <ul>
                    {this.renderPolls()}
                </ul>
            </div>
        )
    }
}

export default connect(
    (state) =>{
        return {
            polls: state.polls,
            arePollsLoading: state.arePollsLoading,
            searchText: state.searchText,
            sortOption: state.sortOption
        }
    }
)(PollsList)
