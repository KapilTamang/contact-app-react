import { useContext } from 'react';
import { Form, Button, Grid, Segment, Icon, Header as SegmentHeader, Message } from 'semantic-ui-react';
import Header from '../../components/Header';
import { GlobalContext } from '../../context/Provider';
import { Link } from 'react-router-dom';

const LoginForm = ({ form: { form, onChange, loginFormValid, onSubmit, loading, error } }) => {
    const { authState: { auth: { data } } } = useContext(GlobalContext);

    return (
        <div>
            <Header />
            <Grid centered>
                <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                    <SegmentHeader textAlign="center">
                        <Icon name="sign in" style={{ color: "#0E6EB8" }} />
                        {data ? `Welcome ${data.username} . Please Login to continue.` : "Login to your account"}
                    </SegmentHeader>
                    <Segment>
                        <Form>
                            {error && <Message content={error?.detail} negative />}
                            <Form.Field>
                                <Form.Input icon="user" iconPosition="left" value={form.username || ""} onChange={onChange} name="username" placeholder='Username' />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input icon="key" iconPosition="left" value={form.password || ""} onChange={onChange} type="password" name="password" placeholder='Password' />
                            </Form.Field>
                            <Button onClick={onSubmit} loading={loading} disabled={loginFormValid || loading} primary fluid type='submit'>Submit</Button>
                            <Segment>
                                Need an account? <Link to="/auth/register"> Register Here</Link>.
                            </Segment>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div >
    );
};

export default LoginForm;