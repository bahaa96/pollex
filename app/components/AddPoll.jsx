import React from "react"
import {connect} from "react-redux"
import moment from "moment"


import { startAddPoll } from "actions"

class AddPoll extends React.Component {
    constructor (props) {
        super(props)
        this.addPoll = this.addPoll.bind(this)
        this.addOption = this.addOption.bind(this)
    }
    addPoll(e){
        e.preventDefault()
        let title=  this.refs.pollTitle.value
        if( title ) {
            let getOptions = ()=>{
                let out = []
                Array.from(this.refs.options.children).forEach(el => {
                    if (el.value) {
                        out.push(el.value)
                    }   
                })
                return out
            }
            let poll = {
                title,
                options: getOptions(),
                votes: 0,
                createdAt: moment().unix()
            }
            this.props.dispatch(startAddPoll(poll))
            $("#myModal").modal("hide")
        }else {

        }

    }
    addOption(e){
        e.preventDefault()
        let input = `<input type="text" class="form-control" placeholder="Write an option"/>`
        $("#myModal").find(".modal-body form .inputs-group").append(input)
        $("#myModal").find(".modal-body form .inputs-group input:last-child").focus()

    }
    render() {
        return (
            <div>
                <button className="add-poll" onClick={()=>{$("#myModal").modal("show")}} data-toggle="modal" data-target="#exampleModal">
                    +
                </button>

                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Poll</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label>Title: </label>
                                    <input type="text" className="form-control" ref={"pollTitle"} placeholder="Poll title"/>
                                    <div>
                                        <h4>Options</h4>
                                        <div className="inputs-group"  ref={"options"}>
                                            <input type="text" className="form-control" placeholder="Write an option"/>
                                            <input type="text" className="form-control" placeholder="Write an option"/>
                                        </div>
                                        <button type="button" className="btn btn-outline-primary" onClick={this.addOption}>Add Option</button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>{$("#myModal").modal("hide")}} >Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={this.addPoll}>Add Poll</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(AddPoll)