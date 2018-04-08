import {SET_RIDDLES_TO_DISPLAY_SUCCESS} from '../types';

export const setRiddlesToDisplaySuccess = (riddlesToDisplay) => ({
	type: SET_RIDDLES_TO_DISPLAY_SUCCESS,
	riddlesToDisplay
});

export const setRiddlesToDisplay = (riddles) => (dispatch) => {
	dispatch(setRiddlesToDisplaySuccess(riddles));
};