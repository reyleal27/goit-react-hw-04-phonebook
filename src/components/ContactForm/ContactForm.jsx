import './ContactFormStyle.css';
import { Component } from 'react';
import Proptypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class ContactForm extends Component {
  static propTypes = {
    addContact: Proptypes.func.isRequired,
    contacts: Proptypes.arrayOf(
      Proptypes.shape({
        id: Proptypes.string.isRequired,
        name: Proptypes.string.isRequired,
        number: Proptypes.string.isRequired,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };
  handleNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { addContact, contacts } = this.props;

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

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { number, name } = this.state;
    return (
      <form className="contact-form" onSubmit={this.handleSubmit}>
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
            onChange={this.handleNameChange}
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
            onChange={this.handleNumberChange}
          />
        </label>
        <button className="button" type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}
