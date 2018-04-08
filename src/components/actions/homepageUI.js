import { SET_HOMEPAGE_UI_SUCCESS } from '../types'

export const setHomepageUISuccess = (homepageUI) => ({
	type: SET_HOMEPAGE_UI_SUCCESS,
	homepageUI
})

export const setHomepageUI = (homepageUI) => (dispatch) => {
	console.log('setHomepageUI reached');
	dispatch(setHomepageUISuccess(homepageUI));
};