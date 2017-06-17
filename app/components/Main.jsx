import React from "react"
import {connect} from "react-redux"

import Header from "Header"
import PollsList from "PollsList"
import AddPoll from "AddPoll"
import Search from "Search"

class Main extends React.Component {
    constructor(props){
        super(props)

    }
    render(){
            return (
                <div>
                    <Header/>
                    <div className="row main-container justify-content-end">
                        <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                            <PollsList/>
                        </div>
                        <div className="cl-10 col-sm-8 col-md-6 col-lg-4">
                            <Search/>
                        </div>
                    </div>
                    <AddPoll/>
                </div>
            )
    }
}

export default connect()(Main)
