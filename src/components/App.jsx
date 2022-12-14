import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
// import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Катька Витькина', number: '459-12-56' },
      { id: 'id-2', name: 'Колекторы не отвечать', number: '443-89-12' },
      { id: 'id-3', name: 'Гусь с посёлка', number: '645-17-79' },
      { id: 'id-4', name: 'Лёха Кабан', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',

    // showModal: false,
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contactList');
    const parsedContacts = JSON.parse(contactsFromLocalStorage);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevStateContacts = prevState.contacts;
    const nextStayContacts = this.state.contacts;

    if (prevStateContacts !== nextStayContacts) {
      localStorage.setItem('contactList', JSON.stringify(nextStayContacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...this.state.contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });
    }

    this.setState({ contacts: contactsLists });
  };

  handleDelete = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  getFilteredContacts = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };

  //  MODAL

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  render() {
    const { filter } = this.state;

    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#010101',
        }}
      >
        {/* <button type="button" onClick={this.toggleModal}>
          Add contact
        </button>
        {showModal && (
          <Modal>
            <h1>Hello world</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              provident molestias facilis dolore culpa tenetur aperiam eum,
              accusantium voluptatibus expedita, nobis praesentium animi,
              voluptates pariatur repellat odio. Error, facere ipsum?
            </p>
            <button type="button" onClick={this.toggleModal}>
              X
            </button>
          </Modal>
        )} */}
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2> Contacts</h2>
        <Filter filter={filter} handleChange={this.handleChange} />
        <ContactList
          contacts={this.getFilteredContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
