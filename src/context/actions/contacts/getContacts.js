import axiosInstance from "../../../helpers/axiosInstance";
import { CONTACTS_LOADING, CONTACTS_LOADING_SUCCESS, CONTACTS_LOADING_ERROR } from '../../../constants/actionTypes';
import { CONNECTION_ERROR } from '../../../constants/api';

export default (history) => (dispatch) => {
    dispatch({
        type: CONTACTS_LOADING
    })
    axiosInstance(history).get("/contacts/")
        .then((res) => {
            dispatch({
                type: CONTACTS_LOADING_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: CONTACTS_LOADING_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
};