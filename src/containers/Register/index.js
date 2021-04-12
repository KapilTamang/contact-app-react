import React, { useEffect } from 'react';
import RegisterForm from '../../layout/Register';
import useForm from './useForm';

const RegisterContainer = () => {

    useEffect(() => { });

    return (
        <div>
            <RegisterForm form={useForm()} />
        </div>
    )
}

export default RegisterContainer;