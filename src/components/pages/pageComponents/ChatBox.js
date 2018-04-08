import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { getChat, addMessage } from '../../actions/chat.js';
import AddMessageForm from '../../forms/AddMessageForm';
import MessageList from './MessageList';
import '../../../css/ChatBox.css';

class ChatBox extends React.Component {

	constructor(props) {
		super(props);

		this.socket = io('localhost:8080');

		this.socket.on('RECEIVED_MESSAGE', function(data) {
			console.log('recieved message');
			props.getChat();
		});
	}

	submit = data => {
		let addMessage = this.props.addMessage;
		this.socket.emit('SEND_MESSAGE', {});
		addMessage(data);
	}

	componentWillMount() {
		let getChat = this.props.getChat;
		getChat();
	}

	render() {

		//HACK: render should be a pure function
		let getChat = this.props.getChat;
		return(
			<div>
				<div>
					<MessageList chat={this.props.chat}/>
				</div>
				<div>
					{this.props.isAuthenticated ? <AddMessageForm token={this.props.token} submit={this.submit} /> : <div>Sign in to send messages</div>}
				</div>
			</div>
		);
	}
}

ChatBox.propTypes = {
	chat: PropTypes.array.isRequired,
	token: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.token,
		token: state.user.token,
		chat: state.chat
	};
}

export default connect(mapStateToProps, { getChat, addMessage })(ChatBox);