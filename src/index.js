import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-virtualized/styles.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { userLoggedIn } from './components/actions/auth';

const store = createStore(rootReducer, applyMiddleware(thunk));

if (localStorage.ethriddleJWT) {
	const payload = decode(localStorage.ethriddleJWT);
	const user = { token: localStorage.ethriddleJWT, _id: payload._id, email: payload.email, confirmed: payload.confirmed };
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>, 
	document.getElementById('root')
);
registerServiceWorker();
