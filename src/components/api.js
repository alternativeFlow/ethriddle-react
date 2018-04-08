import axios from 'axios';

export default {
	user: {
		login: (signature) => 
			axios.post('/api/auth', { signature }).then(res => res.data.user),
		signup: user =>
			axios.post('/api/users', { user }).then(res => res.data.userRecord),
		confirm: token =>
			axios.post("/api/auth/confirmation", { token }).then(res => res.data.user),
		resetPasswordRequest: email =>
			axios.post("/api/auth/reset_password_request", { email }),
		validateToken: token =>
			axios.post("api/auth/validate_token", { token }),
		resetPassword: data =>
			axios.post("/api/auth/reset_password", { data })
	},
	riddles: {
		getAllRiddles: () =>
			axios.get("/api/riddles", {}).then(res => res.data.riddles),
		getAllUserRiddles: token =>
			axios.post("/api/riddles/get_all_user_riddles", {token}).then(res=> res.data.riddles),
		createRiddle: data =>
			axios.post("/api/riddles/create_riddle", { data }).then(res=>res.data.riddle),
		updateRiddleActivity: (id, currentContractActivity) => 
			axios.post("/api/riddles/update_riddle_activity", {id, currentContractActivity}).then(res=>res.data.riddle)
	},
	chat: {
		getChat: () =>
			axios.get("/api/chat", {}).then(res => res.data.chat),
		addMessage: data =>
			axios.post("/api/chat/add_message", {data}).then(res => res.data.chat)
	}
};