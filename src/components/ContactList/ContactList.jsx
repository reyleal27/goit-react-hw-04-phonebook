import React, { Component } from 'react';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import PropTypes from 'prop-types';

export class ContactList extends Component {

  render() {
    const { filterContact, deleteContact } = this.props;
    const filteredContacts = filterContact();

    return (
      <ul className='contact-list'>
        {filteredContacts.map(filteredContact => (
          <ContactListItem
            key={filteredContact.id}
            filteredContact={filteredContact}
            deleteContact={deleteContact}
          />
        ))}
      </ul>
    );
  }
};

ContactList.propTypes = {
    filterContact: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired,
}