import React from 'react';

export default class AddOptions extends React.Component {
  state = {
    error: undefined
  }

  handleAddOption = (e) => {
    e.preventDefault();
    console.log('testing')
    const newOption = e.target.elements.option.value;

      const error = this.props.handleAddOption(newOption)
      e.target.elements.option.value = '';

  this.setState(()=> ({error}));
  }
  render() {
    return (
      <div>
      {this.state.error && <p>{this.state.error}</p>}
        <form className="form" onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button className="button" >Please add an option to get started</button>
        </form>
      </div>
    );
  }
}
