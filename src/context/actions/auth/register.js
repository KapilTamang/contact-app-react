import axiosInstance from '../../../helpers/axiosInstance';
import { REGISTER_LOADING } from './../../../constants/actionTypes';
import { REGISTER_SUCCESS } from './../../../constants/actionTypes';
import { REGISTER_ERROR } from './../../../constants/actionTypes';
import { CONNECTION_ERROR } from '../../../constants/api';

export const register = ({ username, firstName: first_name, lastName: last_name, email, password }) => (dispatch) => {
    dispatch({
        type: REGISTER_LOADING
    });
    axiosInstance().post("/auth/register", {
        username,
        first_name,
        last_name,
        email,
        password
    })
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR,
            });
        });
}

