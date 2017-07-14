import React from "react"
import { startUpdatePoll } from "actions"
import { connect } from "react-redux"
import { getCurrentUser } from "LocalStorage"

class EditModal extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        let editModal = $("#editModal")
        let pollTitle = $(editModal).find("form input.title")
        $(pollTitle).val($(pollTitle).attr("data-text"))
        let pollOptions = $(editModal).find(".poll-options input")
        Array.from(pollOptions).map(el => {
            $(el).val(el.attributes["data-text"].value)
        })
    }
    render() {
        let { dispatch, poll } = this.props
        let renderOptions = () => {
            return Object.keys(poll.options).map(el => {
                return <div className="input-wrapper" key={el}><input type="text" data-id={el} data-text={ poll.options[el].title }/></div>
            })
        }
        let wrapUpUpdates = () => {
            let options = {}
            Array.from($(".poll-options").find("input")).map(el => {
                options[el.attributes["data-id"].value] = {
                    title: el.value,
                    votes: poll.options[el.attributes["data-id"].value].votes
                }
            })
            return {
                title: $("#editModal").find("form .title").val(),
                options
            }
        }
        return (
            <div id="editModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <i className="fa fa-close fa-lg" onClick={()=> { $('#editModal').modal('hide') }}/>
                        <form onSubmit={(e)=> e.preventDefault()}>
                            <div className="input-wrapper"><input className="title" type="text" data-text={ poll.title } /></div>
                            <h2>Options</h2>
                            <div className="poll-options">
                                { renderOptions() }
                            </div>
                            <button onClick={ (e) => {
                                e.preventDefault()
                                let { uid } = getCurrentUser()
                                dispatch(startUpdatePoll(uid, poll.id, wrapUpUpdates()))
                                $('#editModal').modal('hide')
                            }
                            }><span>Save</span></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(EditModal)