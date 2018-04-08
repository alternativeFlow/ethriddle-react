import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedIn = (user) => ({
	type: USER_LOGGED_IN,
	user
});

export const userLoggedOut = (user) => ({
	type: USER_LOGGED_OUT
});

export const login = (account) => dispatch => {
	return api.user.login(account).then((user) => {
		dispatch(userLoggedIn(user));
		return user;
	})
};

export const logout = () => dispatch => {
	localStorage.removeItem('ethriddleJWT');
	dispatch(userLoggedOut());
};

export const confirm = (token) => (dispatch) => api.user.confirm(token)
	.then(user => {
		localStorage.ethriddleJWT = user.token;
		dispatch(userLoggedIn(user));
	})

export const resetPasswordRequest = ({email}) => () =>
	api.user.resetPasswordRequest(email);

export const validateToken = (token) => () =>
	api.user.validateToken(token);

export const resetPassword = (data) => () => api.user.resetPassword(data);