import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CreateContactForm from '../../layout/Contacts/Create';
import createContact from '../../context/actions/contacts/createContact';
import clearCreateContact from '../../context/actions/contacts/clearCreateContact';
import { GlobalContext } from '../../context/Provider';

const CreateContactContainer = () => {

    const [form, setForm] = useState({});

    const [tempFile, setTempFile] = useState(null);

    const history = useHistory();

    const { contactsState: { addContact: { loading, data, error } }, contactsDispatch } = useContext(GlobalContext);


    const onChange = (e, { name, value }) => {
        setForm({ ...form, [name]: value });
    };

    const onImageChange = (e) => {
        e.persist();
        const fileURL = e.target.files[0];
        setForm({ ...form, contactPicture: fileURL });

        if (fileURL) {
            setTempFile(URL.createObjectURL(fileURL));
        }
    }

    const formInvalid =
        !form.firstName?.length ||
        !form.lastName?.length ||
        !form.countryCode?.length ||
        !form.phoneNumber?.length;

    const formIsHalfFilled = Object.values(form).filter((item) => item && item !== "")?.length > 0 && !data;


    const onSubmit = () => {
        createContact(form)(contactsDispatch);
    };


    useEffect(() => {
        if (data) {
            history.push("/");
        }

        return () => {
            clearCreateContact()(contactsDispatch);
        }
    }, [data]);

    return (
        <CreateContactForm
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            formInvalid={formInvalid}
            loading={loading}
            formIsHalfFilled={formIsHalfFilled}
            onImageChange={onImageChange}
            tempFile={tempFile}>
        </CreateContactForm>
    );
};

export default CreateContactContainer;
