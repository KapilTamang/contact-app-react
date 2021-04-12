import React from 'react';
import { Form, Button, Grid, Header as SemanticHeader, Segment } from 'semantic-ui-react';
import Header from './../../components/Header';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ form: { onChange, form, registerFormValid, onSubmit, loading, fieldErrors } }) => {
    return (
        <div>
            <Header />
            <Grid centered>
                <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                    <SemanticHeader textAlign="center">
                        <Icon name="signup" style={{ color: "#0E6EB8" }} />SignUp
                    </SemanticHeader>
                    <Segment>
                        <Form>
                            <Form.Field>
                                <Form.Input icon="user" iconPosition="left" value={form.username || ""} onChange={onChange} name="username" placeholder="Username"
                                    error={fieldErrors.username && {
                                        content: fieldErrors.username,
                                        pointing: "below",
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input icon="user" iconPosition="left" value={form.firstName || ""} onChange={onChange} name="firstName" placeholder="First Name"
                                    error={fieldErrors.first_name && {
                                        content: fieldErrors.first_name,
                                        pointing: "below"
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input icon="user" iconPosition="left" value={form.lastName || ""} onChange={onChange} name="lastName" placeholder="Last Name"
                                    error={fieldErrors.last_name && {
                                        content: fieldErrors.last_name,
                                        pointing: "below"
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input icon="mail" iconPosition="left" value={form.email || ""} onChange={onChange} name="email" type="email" placeholder="Email"
                                    error={fieldErrors.email && {
                                        content: fieldErrors.email,
                                        pointing: "below"
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input icon="key" iconPosition="left" value={form.password || ""} onChange={onChange} name="password" type="password" placeholder="Password"
                                    error={fieldErrors.password && {
                                        content: fieldErrors.password,
                                        pointing: "below"
                                    }}
                                />
                            </Form.Field>
                            <Button onClick={onSubmit} loading={loading} disabled={registerFormValid || loading} fluid primary type='submit'>Submit</Button>
                            <Segment>
                                Already have an account? <Link to="/auth/login">Login Here</Link>
                            </Segment>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default RegisterForm;