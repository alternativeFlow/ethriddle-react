import { GET_ALL_RIDDLES_SUCCESS,
	GET_ALL_USER_RIDDLES_SUCCESS, 
	CREATE_RIDDLE_SUCCESS } from "../types";
import api from '../api';

export const getAllRiddlesSuccess = (riddles) => ({
	type: GET_ALL_RIDDLES_SUCCESS,
	riddles
});
	

export const getAllRiddles = () => (dispatch) => {
	api.riddles.getAllRiddles().then(riddles =>  {
		dispatch(getAllRiddlesSuccess(riddles))
	});
};

export const getAllUserRiddlesSuccess = (riddles) => ({
	type: GET_ALL_USER_RIDDLES_SUCCESS,
	riddles
});

export const getAllUserRiddles = (token) => (dispatch) =>
	api.riddles.getAllUserRiddles(token).then(riddles => {
		dispatch(getAllUserRiddlesSuccess(riddles))
	});

export const createRiddleSuccess = (riddle) => ({
	type: CREATE_RIDDLE_SUCCESS
});

export const createRiddle = (data) => (dispatch) => {
	return new Promise( (resolve, reject) => {
		api.riddles.createRiddle(data).then(riddle => {
			dispatch(createRiddleSuccess())
			resolve(riddle);
		});
	});
};
