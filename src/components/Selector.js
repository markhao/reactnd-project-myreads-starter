import React from 'react'
import PropTypes from 'prop-types'

class Selector extends React.Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
    shelves: PropTypes.object.isRequired
  }

  handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(value);
    }
  }

  render () {
    return (
      <select onChange={this.handleChange} value={this.props.defaultValue}>
        <option value="none" disabled>Move to...</option>
        {Object.keys(this.props.shelves).map(key => (
          <option key={key} value={key}>{this.props.shelves[key]}</option>
        ))}
        <option value="none">None</option>
      </select>
    )
  }
}

export default Selector;
