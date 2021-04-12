import { USER_LOGOUT } from "../../../constants/actionTypes";

export default (history) => (dispatch) => {

    localStorage.removeItem("token");

    dispatch({
        type: USER_LOGOUT,
    });

    history.push("/auth/login");
};