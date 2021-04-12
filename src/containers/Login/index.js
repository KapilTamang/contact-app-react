import LoginForm from '../../layout/login';
import useForm from './useForm';
import { GlobalContext } from './../../context/Provider';
import { useContext } from 'react';

const LoginContainer = () => {

    return (
        <div>
            <LoginForm form={useForm()} />
        </div>
    )
}

export default LoginContainer;