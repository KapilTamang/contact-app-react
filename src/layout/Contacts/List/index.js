import React from 'react'
import { Container, Placeholder, List, Message, Header, Icon, Divider, Button } from 'semantic-ui-react';
import AppHeader from './../../../components/Header';
import ImageThumb from '../../../components/ImageThumb';
import Favorites from './../Favorites/index';

const ContactsListUI = ({ state: { contacts: { loading, data, isSearchActive, foundContacts } }, deleteContact, starUnstarContact }) => {

    const currentContacts = isSearchActive ? foundContacts : data;

    return (
        <div style={{ paddingBottom: 30 }}>
            <AppHeader />
            <Container className="container" style={{
                boxShadow: "1px 4px 7px rgba(0,0,0,0.3)",
                paddingTop: 1, paddingBottom: 5, marginTop: 30, paddingLeft: 10, paddingRight: 10
            }}>
                <Divider horizontal style={{ marginTop: 40, marginBottom: 20 }}>
                    <Header as='h4'>
                        <Icon name="star" style={{ color: "#FFD700" }} size="large" />
                            Favorites
                        </Header>
                </Divider>
                <Favorites favorites={
                    Array.isArray(currentContacts) &&
                    currentContacts.filter((item) => item.is_favorite)
                } loading={loading} />
                <Divider horizontal style={{ marginTop: 30 }}>
                    <Header as='h4'>
                        <Icon name="users" style={{ color: "#0E6EB8" }} size="large" />
                        All
                        </Header>
                </Divider>

                {loading && (
                    <>
                        {" "}
                        <Placeholder fluid>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </>
                )}


                {!loading && currentContacts.length === 0 && (
                    <Message
                        icon='exclamation triangle'
                        header='No Contacts to Show'
                        style={{ color: "#0E6EB8" }}
                    />

                )}
                <List style={{ marginTop: 20, marginBottom: 20, paddingLeft: 30, paddingRight: 30 }}>
                    {currentContacts.length > 0 && !loading &&
                        Array.isArray(currentContacts) && currentContacts.map((contact) => (
                            <List.Item
                                style={{ marginBottom: 20 }}
                                key={contact.id}
                                disabled={contact.deleting || contact.starring}
                            >
                                <List.Content floated="right">
                                    <span><b>{contact.country_code}</b>-{contact.phone_number}</span>&nbsp; &nbsp; &nbsp;
                                    <Button color="blue" size="mini" onClick={() => starUnstarContact(contact.id, contact.is_favorite)} loading={contact.starring}>
                                        {
                                            contact.is_favorite ? "UNSTAR" : "STAR"
                                        }
                                    </Button>&nbsp;
                                    <Button icon="trash alternate" color="red" size="mini" onClick={() => { deleteContact(contact.id) }} loading={contact.deleting} />
                                </List.Content>
                                <List.Content style={{ display: "flex", alignItems: "center" }}>
                                    <ImageThumb
                                        firstName={contact.first_name}
                                        lastName={contact.last_name}
                                        src={contact.contact_picture}
                                        style={{ width: 50, height: 50 }} />
                                    <span style={{ marginLeft: 10 }}>
                                        <b>{contact.first_name} {contact.last_name} &nbsp; {
                                            contact.is_favorite && (
                                                <Icon name="star" size="small" style={{ color: "#FFD700" }} />
                                            )}
                                        </b></span>
                                </List.Content>
                            </List.Item>
                        ))}
                </List>
            </Container>
        </div >
    )
}

export default ContactsListUI;
