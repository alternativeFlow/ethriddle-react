import { combineReducers } from 'redux';

import user from "./reducers/user";
import riddles from "./reducers/riddles";
import riddlesToDisplay from "./reducers/riddlesToDisplay";
import riddleToDetail from "./reducers/riddleToDetail";
import chat from "./reducers/chat";
import homepageUI from './reducers/homepageUI';

export default combineReducers({ 
	user,
	riddles,
	riddlesToDisplay,
	riddleToDetail,
	chat,
	homepageUI
});