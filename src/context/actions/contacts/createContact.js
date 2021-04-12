import { ADD_CONTACT_LOADING, ADD_CONTACT_SUCCESS } from '../../../constants/actionTypes';
import axiosInstace from '../../../helpers/axiosInstance';
import { ADD_CONTACT_ERROR } from './../../../constants/actionTypes/index';
import { CONNECTION_ERROR } from './../../../constants/api';
import { storage } from '../../../helpers/firebase';
import { FIREBASE_IMAGE_REF } from '../../../constants/firebase';

export default ({
    firstName: first_name,
    lastName: last_name,
    countryCode: country_code,
    phoneNumber: phone_number,
    contactPicture: contact_picture,
    is_favorite
}) => (dispatch) => {

    const saveToBackend = (url = null) => {
        axiosInstace().post("/contacts/", {
            first_name,
            last_name,
            country_code,
            phone_number,
            is_favorite,
            contact_picture: url
        })
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: ADD_CONTACT_SUCCESS,
                    payload: res.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: ADD_CONTACT_ERROR,
                    payload: err.response ? err.response.data : CONNECTION_ERROR
                });
            });
    }

    dispatch({
        type: ADD_CONTACT_LOADING,
    });

    if (contact_picture) {
        storage.ref(`${FIREBASE_IMAGE_REF}/${contact_picture.name}`)
            .put(contact_picture)
            .on(
                "state_changes",
                (snapshot) => { },
                async (error) => { },
                async () => {
                    const url = await storage
                        .ref(FIREBASE_IMAGE_REF)
                        .child(contact_picture.name)
                        .getDownloadURL();

                    saveToBackend(url);
                }
            );
    }
    else {
        saveToBackend();
    }
};