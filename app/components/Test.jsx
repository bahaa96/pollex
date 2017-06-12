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
            <form>
                <label>
                    <input type="radio" value={"apple"} name="option"
                           checked={this.state.selectedOption === "apple"} onChange={this.optionSelected}/>
                    Apple
                </label>
                <label >
                    <input type="radio" value={"orange"}  name="option"
                           checked={this.state.selectedOption === "orange"} onChange={this.optionSelected}/>
                    Orange
                </label>
                <label>
                    <input type="radio" value={"peach"} name="option"
                           checked={this.state.selectedOption === "peach"} onChange={this.optionSelected}/>
                    Peach
                </label>
            </form>
        )
    }
}
