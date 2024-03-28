import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Component } from 'react';
import { Filter } from './FilterContact/FilterContact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contactListItems');
    if (savedContacts && JSON.parse(savedContacts).length > 0) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    } 
  }

  componentDidUpdate(_prevProps, prevState) {
    console.log('COmponentDid Update');
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        'contactListItems',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className="phonebook-wrapper">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={contacts} />

      <h2>Contacts</h2>
        <Filter filter={filter} setFilter={this.setFilter} />
        {this.state.contacts.length > 0 ? <ContactList
          filterContact={this.filterContact}
          deleteContact={this.deleteContact}
        /> : <p className='no-contacts'> No Saved Contacts</p>}
      </div>
    );
  }
};

export default App;
