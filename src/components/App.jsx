import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { useEffect, useState } from 'react';
import Filter from './FilterContact/FilterContact';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const savedContacts = localStorage.getItem('contactList');
  const [contacts, setContacts] = useState(
    savedContacts && JSON.parse(savedContacts).length > 0
      ? JSON.parse(savedContacts)
      : initialContacts
  );
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filterContact = () => {
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  return (
    <div className="phonebook-wrapper">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      {contacts.length > 0 ? (
        <ContactList
          filterContact={filterContact}
          deleteContact={deleteContact}
        />
      ) : (
        <p className="no-contacts"> No Saved Contacts</p>
      )}
    </div>
  );
};

export default App;
