import React from "react"


export default class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedOption: undefined
        }
        this.optionSelected = this.optionSelected.bind(this)
    }
    optionSelected(e){
        this.setState({
            selectedOption: e.currentTarget.value
        })
    }

    render(){
        return (
            <h1>
                Test Page
            </h1>
        )
    }
}
