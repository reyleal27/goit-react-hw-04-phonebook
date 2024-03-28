import React, { Component } from 'react';
import './FilterContactStyle.css';
import PropTypes from 'prop-types';


export class Filter extends Component {
  handleFilterChange = e => {
    this.props.setFilter(e.target.value);
  };

  componentWillUnmount() {
    console.log('componentwillunmount')
  }

  render() {
    const { filter } = this.props;

    return (
      <div className='filter-container'>
        
        <p>Find Contacts by Name</p>
            <input
                className='filter-contact'
          type="text"
          name="filter"
          placeholder="Search by name"
          value={filter}
          onChange={this.handleFilterChange}
        />
      </div>
    );
  }
};

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}