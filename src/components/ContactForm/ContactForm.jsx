import './ContactFormStyle.css';
import { useState } from 'react';
import Proptypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

const ContactForm = ({ addContact, contacts }) => {
 
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const handleNameChange = e => {
    setName(e.target.value)
  };
  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      Notify.warning(`${name} is already in your contacts!`, {
        position: 'center-top',
      });
      return;
    } else {
      Notify.success(`${name} is successfully added to your contacts!`, {
        position: 'center-top',
      });
    }
    
    addContact({
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    });
  }

    return (
      <form className="contact-form" onSubmit={ handleSubmit }>
        <label className="label">
          Name
          <input
            className="input"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={handleNameChange}
          />
        </label>

        <label className="label">
          Number
          <input
            className="input"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleNumberChange}
          />
        </label>
        <button className="button" type="submit">
          Add Contact
        </button>
      </form>
    );
  }


 ContactForm.propTypes = {
    addContact: Proptypes.func.isRequired,
    contacts: Proptypes.arrayOf(
      Proptypes.shape({
        id: Proptypes.string.isRequired,
        name: Proptypes.string.isRequired,
        number: Proptypes.string.isRequired,
      })
    ),
};
  
export default ContactForm;