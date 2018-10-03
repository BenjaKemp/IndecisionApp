import React from 'react'
import ReactDOM from 'react-dom'
import AddOptions from './AddOption'
import Options from './Options'
import OptionModal from './OptionModal'
import Header from './Header'
import Action from './Action'



class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  }

  componentDidMount() {
    console.log('fetching data')
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)
      if(options){
        this.setState(() => ({options}))
      }
    }
      catch (e) {

      }

  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
      console.log('saving data')
    }
  }
  componentWillUnmount () {
    console.log('component will unmount')
  }
  handleDeleteOptions = () => {
    this.setState(()=>({options: []}));
  }
  handleDeleteOption = (optionToRemove) => {
    console.log('deleting an option', optionToRemove)
    this.setState((prevState)=>({
      options: prevState.options.filter(option=>optionToRemove !== option)
    }))
  }
  handleClearSelectedOption = () => {
    console.log('here here here')
    this.setState(()=>({
      selectedOption: undefined
    }))
  }
  handlePick = () => {
    const length = Math.floor(Math.random()*this.state.options.length);
    const option = this.state.options[length]

    this.setState(()=>({
      selectedOption:option
    }))
  }
  handleAddOption = (newOption) => {
    if(!newOption) {
    return 'no option was offered'
    }
    if(this.state.options.indexOf(newOption) !== -1) {

    return 'this option already exists!'
    }

    this.setState((prevState)=>({options: prevState.options.concat([newOption])}))

  }
  render() {
    const title = "Indecision";
    const subTitle = "In the nads of a computer ";
    const options = ["Thing one", "thing 2", "thing 3"];

    return (
      <div>
        <Header  />
        <div className="container">
          <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
          <div className="widget">
            <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
            />
          <AddOptions
             handleAddOption={this.handleAddOption} />
          </div>

      </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}/>

      </div>
    );
  }
}


export default IndecisionApp
