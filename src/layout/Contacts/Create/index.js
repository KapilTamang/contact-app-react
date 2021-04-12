import React, { useRef } from 'react';
import Header from '../../../components/Header';
import { Card, Grid, Header as SemanticHeader, Form, Button, Icon, Select, Image } from 'semantic-ui-react';
import './index.css';
import countries from '../../../utils/countries';
import { Prompt } from 'react-router-dom';

const CreateContactForm = ({ form, onChange, onSubmit, formInvalid, loading, formIsHalfFilled, onImageChange, tempFile }) => {

    const imagePickRef = useRef(null);

    const chooseImage = () => {
        if (imagePickRef.current) {
            imagePickRef.current.click();
        }
    }

    return (
        <div>
            <Prompt
                when={formIsHalfFilled}
                message={JSON.stringify({
                    header: 'Confirm',
                    content: 'You have unsaved changes. Are you sure you wanna leave?'
                })}
            />
            <Header />
            <Grid centered>
                <Grid.Column className="form-column">
                    <SemanticHeader textAlign="center">
                        <Icon name="add user" className="addIcon" /> Create Contact
                    </SemanticHeader>
                    <Card fluid>
                        <Card.Content>
                            <Form unstackable>
                                <input ref={imagePickRef} onChange={onImageChange} type="file" hidden />
                                <div className="contactPicture" onClick={chooseImage}>
                                    {tempFile &&
                                        <Image src={tempFile} className="contactPicture" />
                                    }
                                    {!tempFile &&
                                        <span>Choose Picture</span>
                                    }
                                </div>
                                <div className="choosePictureBtn">
                                    <Button onClick={chooseImage} icon="pencil" primary size="mini" content="Choose a Picture" labelPosition="left" />
                                </div>
                                <Form.Group widths={2}>
                                    <Form.Input onChange={onChange}
                                        icon="user"
                                        iconPosition="left"
                                        label="First Name"
                                        name="firstName"
                                        placeholder="First Name" />
                                    <Form.Input onChange={onChange}
                                        icon="user"
                                        iconPosition="left"
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Last Name" />
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Input onChange={onChange}
                                        control={Select}
                                        options={countries}
                                        label="Country"
                                        name="countryCode"
                                        placeholder="Country" />
                                    <Form.Input onChange={onChange}
                                        icon="phone volume"
                                        iconPosition="left"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        placeholder="Phone Number" />
                                </Form.Group>
                                <Form.Checkbox
                                    onChange={(e, data) => {
                                        onChange(e, { name: 'is_favorite', value: data.checked })
                                    }}
                                    name="isFavorites"
                                    label="Add to Favorite" />
                                <Button onClick={onSubmit} disabled={formInvalid || loading} loading={loading} primary type='submit'>Submit</Button>
                            </Form>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </div >
    );
};

export default CreateContactForm;