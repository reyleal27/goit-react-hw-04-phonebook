import React from 'react';
import './FilterContactStyle.css';
import PropTypes from 'prop-types';


const Filter = ({filter}) => {
  const handleFilterChange = e => {
    this.props.setFilter(e.target.value);
  };

    return (
      <div className='filter-container'>
        
        <p>Find Contacts by Name</p>
            <input
                className='filter-contact'
          type="text"
          name="filter"
          placeholder="Search by name"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    );
  }


export default Filter;

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}