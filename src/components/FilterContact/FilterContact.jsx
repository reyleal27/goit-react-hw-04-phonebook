import React from 'react';
import './FilterContactStyle.css';
import PropTypes from 'prop-types';


const Filter = ({filter, setFilter}) => {
  const handleFilterChange = e => {
    setFilter(e.target.value);
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

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}
export default Filter;

