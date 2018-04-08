import {SET_RIDDLE_TO_DETAIL_SUCCESS} from '../types';

export const setRiddleToDetailSuccess = (riddleToDetail) => ({
	type: SET_RIDDLE_TO_DETAIL_SUCCESS,
	riddleToDetail
});

export const setRiddleToDetail = (riddle) => (dispatch) => {
	dispatch(setRiddleToDetailSuccess(riddle));
};