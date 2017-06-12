import React from "react"
import Poll from "Poll"
import {connect} from "react-redux"

import ContentLoader from "ContentLoader"

import "jquery-ui/ui/widgets/sortable"
import "../../jquery.ui.sortable-animation"

class PollsList extends React.Component {
    constructor(props){
        super(props)
        this.renderPolls = this.renderPolls.bind(this)
    }
    renderPolls(){
        if (this.props.areTodosLoading){
            return <ContentLoader/>
        }else {
            if (this.props.polls.length) {
                return this.props.polls.map((poll, index) => <Poll key={index} {...poll}/>)
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
            areTodosLoading: state.areTodosLoading
        }
    }
)(PollsList)
