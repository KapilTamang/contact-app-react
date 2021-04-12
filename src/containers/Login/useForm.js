import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from './../../context/Provider';
import { login } from './../../context/actions/auth/login';
import { useHistory } from 'react-router-dom';

export default () => {

    const [form, setForm] = useState({});

    const history = useHistory();

    const { authState: { auth: { loading, error, data } }, authDispatch } = useContext(GlobalContext);

    const onChange = (e, { name, value }) => {
        setForm({ ...form, [name]: value })
    };

    useEffect(() => {
        if (data && localStorage.token) {
            if (data.user) {
                history.push("/");
            }
        }
    }, [data]);

    const loginFormValid =
        !form.username?.length ||
        !form.password?.length;

    const onSubmit = () => {
        login(form)(authDispatch);
    }

    return { form, onChange, loginFormValid, onSubmit, loading, error };
};