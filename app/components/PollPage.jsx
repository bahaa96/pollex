import React from "react"
import { connect } from "react-redux"
import CopyToClipboard from 'react-copy-to-clipboard';

import Chart from "Chart";
import { upAVote, startUpdatePoll} from "actions"
import DeleteModal from "DeleteModal"
import EditModal from "EditModal"
import { getPolls, getCurrentUser } from "LocalStorage"
import NotFound from "NotFound"


class PollPage extends React.Component {
    constructor(props){
        super(props)
        this.uid = getCurrentUser().uid
        this.id = new URLSearchParams(this.props.location.search).get("id")
        this.findPoll = this.findPoll.bind(this)
        this.sortOptions = this.sortOptions.bind(this)
        this.copyToClipboard = this.copyToClipboard.bind(this)
        this.optionSelected = this.optionSelected.bind(this)
        this.state = {
            hasVoted: false,
            selectedOption: undefined,
            contentEditable: true
        }
    }
    findPoll(){
        let polls = this.props.polls.length ? this.props.polls : getPolls()
        try {
            if (polls.length) {
                let poll= polls.filter( el => el.id === this.id )
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
        } catch (e) {return false}
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
                        <span className="custom-control-description">{options[key].title}</span>
                        <span className="option-votes">{options[key].votes}</span>
                    </label>
                </li>
            )
        })
    }
    copyToClipboard({ target }){
        $(".copy-to-clipboard").tooltip('show')

    }
    render(){

        let poll = this.findPoll()
        if (!poll){
            return <NotFound/>
        }else {
            return (
                <div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6 poll-data-box">
                                <h2> {poll.title} </h2>
                                <ul className="options-list">
                                    { this.sortOptions(poll.options) }
                                </ul>
                            </div>
                            { poll.votes ?  <div className="col-12 col-md-6 chart p-0 pl-md-3">
                                                <Chart poll={ poll }/>
                                            </div> : ""
                            }
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className="col-12 col-md-6 share-buttons">
                                <div className="icon"><a target="_blank" href={`http://www.facebook.com/sharer.php?u=/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-facebook fa-2x"/></div>
                                <div className="icon"><a target="_blank" href={`https://twitter.com/share?url=/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-twitter fa-2x"/></div>
                                <div className="icon"><a target="_blank" href={`https://plus.google.com/share?url=/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-google-plus fa-2x"/></div>
                                <div className="icon"><a target="_blank" href={`http://www.linkedin.com/shareArticle?mini=true&amp;url=/poll?uid=${ this.uid }&id=${ this.id }`}/><i className="fa fa-linkedin fa-2x"/></div>
                                <CopyToClipboard text={`/poll?uid=${ this.uid }&id=${ this.id }`}
                                                    onCopy={ this.copyToClipboard }>
                                    <div className="icon"><a className="copy-to-clipboard" target="_blank" href="#" onClick={ e => e.preventDefault() } data-toggle="tooltip" title="Copied to Clipboard"/><i className="fa fa-link fa-2x"/></div>
                                </CopyToClipboard>
                            </div>
                            <div className="col-12 col-md-6  mb-lg-0 mb-sm-4">
                                <div className="row">
                                    <div className="col-8 col-sm-6 col-md-6 mt-4">
                                        <button className={"btn btn-danger btn-block"} onClick={()=>{ $(".delete-modal-container").show() }}><i className="fa fa-trash-o fa-lg"/> Delete </button>
                                    </div>
                                    <div className="col-8 col-sm-6 col-md-6 mt-4">
                                        <button className={"btn btn-primary btn-block"} onClick={()=>{ $('#editModal').modal('show') }}><i className="fa fa-pencil fa-lg"/> Edit </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <DeleteModal id={ this.id }/>
                    <EditModal poll={ poll }/>
                    <div className="tooltip tooltip-top" role="tooltip">
                        <div className="tooltip-arrow"/>
                        <div className="tooltip-inner">
                        </div>
                    </div>
                </div>
            )


        }
    }
}

export default connect(
    (state) => {
        return {
            polls: state.polls
        }
    }
)(PollPage)