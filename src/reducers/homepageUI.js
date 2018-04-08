import { SET_HOMEPAGE_UI_SUCCESS } from "../types";

export default function riddles(state = {}, action = {}) {
	switch (action.type) {
		case SET_HOMEPAGE_UI_SUCCESS:
			return action.homepageUI;
		default: 
			return state;
	}
}