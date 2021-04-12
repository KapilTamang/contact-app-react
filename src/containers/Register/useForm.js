import { useState, useContext, useEffect } from 'react';
import { register } from '../../context/actions/auth/register';
import { GlobalContext } from '../../context/Provider'
import { useHistory } from 'react-router-dom';

export default () => {

    const [form, setForm] = useState({});

    const { authDispatch, authState: { auth: { loading, data, error } } } = useContext(GlobalContext);

    const [fieldErrors, setFieldErrors] = useState({});

    const history = useHistory();

    useEffect(() => {
        if (error) {
            for (const item in error) {
                setFieldErrors({
                    ...fieldErrors, [item]: error[item][0]
                });
            }
        }
    }, [error]);


    useEffect(() => {
        if (data) {
            history.push("/auth/login");
        }
    });

    const onChange = (e, { name, value }) => {
        setForm({ ...form, [name]: value });
    };

    const registerFormValid =
        !form.username?.length ||
        !form.firstName?.length ||
        !form.lastName?.length ||
        !form.email?.length ||
        !form.password?.length;

    const onSubmit = () => {
        setFieldErrors({});
        register(form)(authDispatch)
    }

    return { form, onChange, registerFormValid, onSubmit, loading, fieldErrors };
};