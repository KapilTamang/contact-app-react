import React, { useEffect, useContext } from 'react';
import getContacts from '../../context/actions/contacts/getContacts';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';
import ContactsListUI from '../../layout/Contacts/List'
import deleteContact from '../../context/actions/contacts/deleteContact';
import starUnstarContact from '../../context/actions/contacts/starUnstarContact';

const ContactsContainer = () => {

    const { contactsState, contactsDispatch } = useContext(GlobalContext);

    const history = useHistory();

    const { contacts: { data } } = contactsState;

    useEffect(() => {
        if (data.length === 0) {
            getContacts(history)(contactsDispatch);
        }
    }, []);

    const handleDeleteContact = (id) => {
        deleteContact(id)(contactsDispatch)
    }

    const handleStarUnstarContact = (id, is_favorite) => {
        starUnstarContact(id, !is_favorite)(contactsDispatch);
    }

    return <ContactsListUI state={contactsState} deleteContact={handleDeleteContact} starUnstarContact={handleStarUnstarContact} />
}

export default ContactsContainer;
