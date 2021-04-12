import axiosInstance from '../../../helpers/axiosInstance';
import { STAR_UNSTAR_LOADING, STAR_UNSTAR_SUCCESS, STAR_UNSTAR_ERROR } from '../../../constants/actionTypes';
import { CONNECTION_ERROR } from '../../../constants/api';

export default (id, is_favorite) => (dispatch) => {
    dispatch({
        type: STAR_UNSTAR_LOADING,
        payload: id
    });

    axiosInstance().patch(`/contacts/${id}`, { is_favorite }).
        then((res) => {
            dispatch({
                type: STAR_UNSTAR_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: STAR_UNSTAR_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
}