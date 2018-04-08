import { SET_RIDDLE_TO_DETAIL_SUCCESS } from "../types";

export default function riddleToDetail(state = {}, action = {}) {
	switch (action.type) {
		case SET_RIDDLE_TO_DETAIL_SUCCESS:
			return action.riddleToDetail;
		default: 
			return state;
	}
}