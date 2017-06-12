import React from "react"
import { connect } from "react-redux"
import Chart from "Chart";
import { upAVote, startUpdatePoll} from "actions"
import DeleteModal from "DeleteModal"

class PollPage extends React.Component {
    constructor(props){
        super(props)
        this.findPoll = this.findPoll.bind(this)
        this.sortOptions = this.sortOptions.bind(this)
        this.voteClicked = this.voteClicked.bind(this)
        this.optionSelected = this.optionSelected.bind(this)
        this.state = {
            hasVoted: false,
            selectedOption: undefined,
            contentEditable: true
        }
    }
    findPoll(id){
        if (this.props.polls.length) {
            let poll= this.props.polls.filter( el => el.id === id )
            if(poll.length){
                poll = poll[0]
                return poll
            }else {
                return false
            }
        }
        else {
            return false
        }
    }
    optionSelected(e){
        let selectedOption = e.target.value
        this.setState({
            selectedOption
        })
    }
    sortOptions(options){
        let keys = Object.keys(options)
        keys = keys.sort((a,b)=>{
            return options[a].votes < options[b].votes
        })
        return keys.map((key, index) => {
            return (
                <li key={index} >
                    <label className="custom-control custom-radio">
                        <input type="radio" value={key} className="custom-control-input" name="option"
                               checked={this.state.selectedOption === key} onChange={this.optionSelected}/>
                        <span className="custom-control-indicator"/>
                        <span className="custom-control-description">{options[key].title}</span>
                        <span className="option-votes">{options[key].votes}</span>
                    </label>
                </li>
            )
        })
    }
    voteClicked(){
        let { id, dispatch} = this.props
        this.setState({
            hasVoted: true
        })
        dispatch(upAVote(id, this.state.selectedOption))
        dispatch(startUpdatePoll(id, {
            votes: this.findPoll(id).votes + 1
        }))
    }
    render(){
        let {id, dispatch} = this.props
        let poll = this.findPoll(id)
        if (!poll){
            return <h2 className="poll-not-found">oOps, Poll not found</h2>
        }else {
            if (!this.state.hasVoted){
                return (
                    <div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-10 col-sm-8 col-sm-6 poll-data-box">
                                    <h2 contentEditable={this.state.contentEditable}
                                        onChange={(e)=> {
                                        dispatch(startUpdatePoll(id, {title: e.target.innerText}))
                                    }} > {poll.title} </h2>
                                    <ul className="options-list">
                                        {this.sortOptions(poll.options)}
                                    </ul>
                                    <button onClick={this.voteClicked}><span>Vote</span></button>
                                </div>
                            </div>
                            <button className={"delete btn btn-danger"} onClick={()=>{ $(".delete-modal-container").show() }}><i className="fa fa-trash-o fa-lg"/> Delete this poll</button>
                        </div>
                        <DeleteModal id={ id }/>
                    </div>
                )
            }else {
                return (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-sm-6 poll-data-box">
                                <Chart/>
                            </div>
                        </div>
                    </div>
                )
            }

        }
    }
}

export default connect(
    (state)=>{
        return {
            polls : state.polls
        }
    }
)(PollPage)