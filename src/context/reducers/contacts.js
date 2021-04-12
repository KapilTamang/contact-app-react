import {
    STAR_UNSTAR_SUCCESS, STAR_UNSTAR_LOADING, STAR_UNSTAR_ERROR,
    SEARCH_CONTACTS, CLEAR_ADD_CONTACT, CONTACTS_LOADING, CONTACTS_LOADING_SUCCESS, CONTACTS_LOADING_ERROR,
    USER_LOGOUT, ADD_CONTACT_LOADING, ADD_CONTACT_SUCCESS, ADD_CONTACT_ERROR, DELETE_CONTACT_LOADING,
    DELETE_CONTACT_SUCCESS, DELETE_CONTACT_ERROR
} from '../../constants/actionTypes';

const contacts = (state, { type, payload }) => {
    switch (type) {

        case CONTACTS_LOADING: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: true,
                    error: null
                }
            };
        }

        case CONTACTS_LOADING_SUCCESS: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: payload
                }
            };
        }

        case CONTACTS_LOADING_ERROR: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: payload
                }
            };
        }

        case USER_LOGOUT: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: []
                }
            };
        }

        case ADD_CONTACT_LOADING: {
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    loading: true,
                    error: null
                }
            };
        }

        case ADD_CONTACT_SUCCESS: {
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    loading: false,
                    data: payload
                },

                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: [payload, ...state.contacts.data]
                }
            };
        }

        case ADD_CONTACT_ERROR: {
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    loading: false,
                }
            };
        }

        case CLEAR_ADD_CONTACT: {
            return {
                ...state,
                addContact: {
                    ...state.addContact,
                    loading: false,
                    error: null,
                    data: null
                }
            };
        }

        case SEARCH_CONTACTS: {
            const searchValue = payload?.toLowerCase();
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    isSearchActive: !!payload.length > 0 || false,
                    foundContacts: state.contacts.data.filter((item) => {
                        try {
                            return (
                                item.first_name.toLowerCase().search(searchValue) !== -1 ||
                                item.last_name.toLowerCase().search(searchValue) !== -1 ||
                                item.phone_number.toLowerCase().search(searchValue) !== -1
                            );
                        }
                        catch (error) {
                            return [];
                        }
                    }),
                },
            }
        }

        case DELETE_CONTACT_LOADING: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    error: null,
                    data: state.contacts.data.map((item) => {
                        if (item.id === payload) {
                            return { ...item, deleting: true };
                        }

                        return item;
                    }),
                },
            };
        }

        case DELETE_CONTACT_SUCCESS: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: state.contacts.data.filter((item) => item.id !== payload)
                }
            };
        }

        case DELETE_CONTACT_ERROR: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    error: payload
                }
            };
        }

        case STAR_UNSTAR_LOADING: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: state.contacts.data.map((item) => {
                        if (item.id === payload) {
                            return { ...item, starring: true }
                        }

                        return item;
                    })
                }
            };
        }

        case STAR_UNSTAR_SUCCESS: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: state.contacts.data.map((item) => {
                        if (item.id === payload.id) {
                            return payload;
                        }
                        return item;
                    })
                }
            };
        }

        case STAR_UNSTAR_ERROR: {
            return {
                ...state,
                contacts: {
                    ...state.contacts,
                    loading: false,
                    data: payload
                },
            };
        }

        default:
            return state;
    }
};

export default contacts;
