import api from '../api';
import { GET_CHAT_SUCCESS, ADD_MESSAGE_SUCCESS } from '../types';

export const getChatSuccess = (chat) => ({
	type: GET_CHAT_SUCCESS,
	chat
});

export const getChat = () => dispatch => {
	api.chat.getChat().then(chat => {
		dispatch(getChatSuccess(chat))
	})
};

export const addMessageSuccess = (chat) => ({
	type: ADD_MESSAGE_SUCCESS,
	chat
});

export const addMessage = (data) => dispatch => {
	api.chat.addMessage(data).then(chat => {
		dispatch(addMessageSuccess(chat))
	})
};