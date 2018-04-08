import axios from 'axios';

export default {
	user: {
		login: (signature) => 
			axios.post('https://ethriddle-api.herokuapp.com/api/auth', { signature }).then(res => res.data.user),
		signup: user =>
			axios.post('https://ethriddle-api.herokuapp.com/users', { user }).then(res => res.data.userRecord),
		confirm: token =>
			axios.post("https://ethriddle-api.herokuapp.com/api/auth/confirmation", { token }).then(res => res.data.user),
		resetPasswordRequest: email =>
			axios.post("https://ethriddle-api.herokuapp.com/api/auth/reset_password_request", { email }),
		validateToken: token =>
			axios.post("https://ethriddle-api.herokuapp.com/api/auth/validate_token", { token }),
		resetPassword: data =>
			axios.post("https://ethriddle-api.herokuapp.com/api/auth/reset_password", { data })
	},
	riddles: {
		getAllRiddles: () =>
			axios.get("https://ethriddle-api.herokuapp.com/api/riddles", {}).then(res => res.data.riddles),
		getAllUserRiddles: token =>
			axios.post("https://ethriddle-api.herokuapp.com/api/riddles/get_all_user_riddles", {token}).then(res=> res.data.riddles),
		createRiddle: data =>
			axios.post("https://ethriddle-api.herokuapp.com/api/riddles/create_riddle", { data }).then(res=>res.data.riddle),
		updateRiddleActivity: (id, currentContractActivity) => 
			axios.post("https://ethriddle-api.herokuapp.com//api/riddles/update_riddle_activity", {id, currentContractActivity}).then(res=>res.data.riddle)
	},
	chat: {
		getChat: () =>
			axios.get("https://ethriddle-api.herokuapp.com/api/chat", {}).then(res => res.data.chat),
		addMessage: data =>
			axios.post("https://ethriddle-api.herokuapp.com/api/chat/add_message", {data}).then(res => res.data.chat)
	}
};