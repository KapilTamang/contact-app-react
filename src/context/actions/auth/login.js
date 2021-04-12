import axiosInstance from '../../../helpers/axiosInstance';
import { LOGIN_LOADING } from '../../../constants/actionTypes';
import { LOGIN_SUCCESS } from '../../../constants/actionTypes';
import { LOGIN_ERROR } from '../../../constants/actionTypes';
import { CONNECTION_ERROR } from '../../../constants/api';

export const login = ({ username, password }) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING
    });
    axiosInstance().post("/auth/login", {
        username,
        password
    })
        .then((res) => {
            localStorage.token = res.data.token;
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR,
            });
        });
}

