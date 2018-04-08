import { GET_CHAT_SUCCESS, ADD_MESSAGE_SUCCESS } from '../types';

export default function user(state = {}, action = {}) {
	switch (action.type) {
		case GET_CHAT_SUCCESS:
			return action.chat;
		case ADD_MESSAGE_SUCCESS:
			return {};
		default: 
			return state;
	}
}