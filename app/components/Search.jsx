import React from "react"
import { connect } from "react-redux"

import { setSearchText } from "actions"

class Search extends React.Component {
    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(e){
        e.preventDefault()
        this.props.dispatch(setSearchText(this.refs.searchText.value))
    }
    render(){
        return (
            <input type="text" placeholder="Search" ref={"searchText"} className="form-control search"
                   onChange={this.handleSearch}/>
        )
    }
}

export default connect()(Search)