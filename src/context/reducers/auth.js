import { REGISTER_LOADING } from './../../constants/actionTypes';
import { REGISTER_SUCCESS } from './../../constants/actionTypes';
import { REGISTER_ERROR } from './../../constants/actionTypes';
import { LOGIN_LOADING } from './../../constants/actionTypes';
import { LOGIN_SUCCESS } from './../../constants/actionTypes';
import { LOGIN_ERROR } from './../../constants/actionTypes';

const auth = (state, { payload, type }) => {
    switch (type) {
        case REGISTER_LOADING:
        case LOGIN_LOADING:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: true,
                    error: false,
                },
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    data: payload
                },
            };

        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    error: payload
                }
            };

        default:
            return state;
    }
};

export default auth;