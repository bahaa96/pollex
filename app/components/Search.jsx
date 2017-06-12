import React from "react"
import { connect } from "react-redux"

class Search extends React.Component {
    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(e){
        e.preventDefault()
    }
    render(){
        return (
            <input type="text" placeholder="Search" ref={"searchText"} className="form-control search"
                   onChange={this.handleSearch}/>
        )
    }
}

export default connect()(Search)