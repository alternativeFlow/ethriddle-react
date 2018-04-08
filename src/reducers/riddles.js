import { GET_ALL_RIDDLES_SUCCESS, CREATE_RIDDLE_SUCCESS, GET_ALL_USER_RIDDLES_SUCCESS } from "../types";

export default function riddles(state = {}, action = {}) {
	switch (action.type) {
		case GET_ALL_RIDDLES_SUCCESS:
			return action.riddles;
		case GET_ALL_USER_RIDDLES_SUCCESS:
			return action.riddles;
		case CREATE_RIDDLE_SUCCESS:
			return {};
		default: 
			return state;
	}
}