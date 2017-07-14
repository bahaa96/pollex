import React from "react"
import {connect} from "react-redux"

import Header from "Header"
import PollsList from "PollsList"
import AddPoll from "AddPoll"
import Search from "Search"
import ControlPolls from "ControlPolls"



export default connect()(
    (props) => (
        <div>
            <Header/>
            <div className="row main-container justify-content-lg-end justify-content-center ">
                <div className="col-10 col-sm-8 col-md-8 col-lg-4 flex-md-first flex-lg-first align-self-md-start text-center">
                    <ControlPolls/>
                </div>
                <div className="col-10 col-sm-10 col-md-6 col-lg-4 flex-last mb-5">
                    <PollsList/>
                </div>
                <div className="cl-10 col-sm-8 col-md-6 col-lg-4 flex-md-last flex-lg-last mb-5">
                    <Search/>
                </div>
            </div>
            <AddPoll/>
        </div>
    )
)



