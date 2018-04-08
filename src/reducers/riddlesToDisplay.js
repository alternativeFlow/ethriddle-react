import { SET_RIDDLES_TO_DISPLAY_SUCCESS } from "../types";

export default function riddlesToDisplay(state = {}, action = {}) {
	switch (action.type) {
		case SET_RIDDLES_TO_DISPLAY_SUCCESS:
			return action.riddlesToDisplay;
		default: 
			return state;
	}
}