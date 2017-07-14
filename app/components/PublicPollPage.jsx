import React from "react"
import { connect } from "react-redux"
import CopyToClipboard from 'react-copy-to-clipboard';

import Chart from "Chart";
import { startUpAVote, startUpdatePoll} from "actions"
import { getPolls, getCurrentUser, getVotes, setVotes } from "LocalStorage"
import findPoll from "../firebase/api"
import PollPageContentLoader from "PollPageContentLoader"
import NotFound from "NotFound"

class PollPage extends React.Component {
    constructor(props){
        super(props)
        this.uid = new URLSearchParams(this.props.location.search).get("uid")
        this.id = new URLSearchParams(this.props.location.search).get("id")
        this.sortOptions = this.sortOptions.bind(this)
        this.voteClicked = this.voteClicked.bind(this)
        this.optionSelected = this.optionSelected.bind(this)
        this.poll = undefined
        this.state = {
            selectedOption: undefined,
            contentEditable: true,
            loading: true,
            hasVoted: false
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
        let {dispatch} = this.props
        let { selectedOption } = this.state
        if (selectedOption){
            this.setState({
                hasVoted: true
            })
            dispatch(startUpAVote(this.uid, this.id, selectedOption, this.poll.options[selectedOption].votes))
            dispatch(startUpdatePoll(this.uid, this.id, {
                votes: this.poll.votes + 1
            }))
            setVotes(this.uid, this.id)
        }

    }
    componentWillMount() {
        findPoll(this.uid, this.id).then(snapshot => {
            this.poll = snapshot.val()
            this.setState({
                loading: false
            })
        }).catch(e => {
            this.setState({
                loading: false
            })
        })
    }
    componentDidMount() {
        let pollTitle = $(".poll-data-box > h2")
        pollTitle.on("click", (e)=> {
            $(e.target).css("animation", "editable 0.40s")
        })
        pollTitle.on("blur", (e)=> {
            $(e.target).css("animation", "")
        })

    }
    render(){
        let { loading } = this.state
        let hasVoted =  getVotes() ? getVotes()[this.uid][this.id] : this.state.hasVoted
        return loading ? <PollPageContentLoader/> : (this.poll ? (
            hasVoted ? (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10 col-sm-8 col-sm-6 poll-data-box" style={{marginTop: "15px"}}>
                            <Chart poll={ this.poll }/>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-12 col-md-6 share-buttons">
                            <div className="icon"><a target="_blank" href={`http://www.facebook.com/sharer.php?u=http://still-ocean-97520.herokuapp.com/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-facebook fa-2x"/></div>
                            <div className="icon"><a target="_blank" href={`https://twitter.com/share?url=http://still-ocean-97520.herokuapp.com/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-twitter fa-2x"/></div>
                            <div className="icon"><a target="_blank" href={`https://plus.google.com/share?url=http://still-ocean-97520.herokuapp.com/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-google-plus fa-2x"/></div>
                            <div className="icon"><a target="_blank" href={`http://www.linkedin.com/shareArticle?mini=true&amp;url=http://still-ocean-97520.herokuapp.com/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-linkedin fa-2x"/></div>
                            <CopyToClipboard text={`http://still-ocean-97520.herokuapp.com/poll?uid=${ this.uid }&id=${ this.id }`}
                                             onCopy={ this.copyToClipboard }>
                                <div className="icon"><a className="copy-to-clipboard" target="_blank" href="#" onClick={ e => e.preventDefault() } data-toggle="tooltip" title="Copied to Clipboard"/><i className="fa fa-link fa-2x"/></div>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            ) : (
                    <div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-10 col-sm-8 col-sm-6 poll-data-box">
                                    <h2> { this.poll.title } </h2>
                                    <ul className="options-list">
                                        { this.sortOptions(this.poll.options) }
                                    </ul>
                                    <button onClick={ this.voteClicked }><span>Vote</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : <NotFound/>

        )

    }
}

export default connect()(PollPage)
