import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

import '../../../css/MessageList.css';

class MessageList extends React.Component {

	scrollToBottom = () => {
		this.dummyRefForMessageScroll.scrollIntoView({ behavior: "instant"});
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	let chatArray = Object.keys(this.props.chat);
	// 	let lastEleInChatArray = chatArray[chatArray.length-1];
	// 	let nextChatArray = Object.keys(nextProps.chat);
	// 	let lastEleInNextChatArray = nextChatArray[nextChatArray.length-1];
	// 	if (lastEleInChatArray.message==lastEleInNextChatArray.message) {
	// 		return false;
	// 	}
	// 	else {
	// 		return true;
	// 	}

	// }

	timeout0 = {};
	timeout1 = {};

	componentWillUpdate() {
		this.timeout0 = setTimeout(() => {
			this.dummyRefForMessageScroll.scrollTop = this.dummyRefForMessageScroll.scrollHeight;
		}, 500);
	}

	componentDidMount() {
		this.timeout1 = setTimeout(() => {
			this.dummyRefForMessageScroll.scrollTop = this.dummyRefForMessageScroll.scrollHeight;
		}, 500);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout0);
		clearTimeout(this.timeout1);
	}

	render() {

		let messages = [];
		let messagesStrings = [];
		let processedMessages = [];
		let messagesJson = this.props.chat;
		// Object.keys(messagesJson).forEach(messagesIndex => {
		// 	let message = messagesJson[messagesIndex];
		// 	messages.unshift(
		// 		<Message key={messagesIndex} message={message}/>
		// 	);
		// });

		Object.keys(messagesJson).forEach(messagesIndex => {
			let message = messagesJson[messagesIndex];
			messages.push(message);
		})

		let chatLength = 0;
		for (var i = 0; i<messages.length; i++) {
			let messageToProcess = messages[i].message;
			let nickname = messages[i].sender.nickname;
			if (messageToProcess.length <= 42) {
				messagesStrings.push(nickname + ": " + messageToProcess.substring(0,messageToProcess.length));
				chatLength = chatLength + 1;
			}
			else if ((messageToProcess.length > 42) && (messageToProcess.length <= 102)) {
				messagesStrings.push(messageToProcess.substring(43,messageToProcess.length));
				messagesStrings.push(nickname + ": " + messageToProcess.substring(0,43));
				chatLength = chatLength + 2;
			}
			else if ((messageToProcess.length > 102) && (messageToProcess.length <= 162)) {
				messagesStrings.push(messageToProcess.substring(102,messageToProcess.length));
				messagesStrings.push(messageToProcess.substring(43,102));
				messagesStrings.push(nickname + ": " + messageToProcess.substring(0,43));
				chatLength = chatLength + 3;
			}
			else {
				messagesStrings.push(messageToProcess.substring(162,messageToProcess.length));
				messagesStrings.push(messageToProcess.substring(102,162));
				messagesStrings.push(messageToProcess.substring(43,102));
				messagesStrings.push(nickname + ": " + messageToProcess.substring(0,43));
				chatLength = chatLength + 4;
			}

			if (chatLength>100){
				console.log('chatLength reached');
				break;
			}
		}
		for (var i=0; i<messagesStrings.length; i++) {
			processedMessages.unshift(
				<Message message={messagesStrings[i]} />
			);
		}

		

		return (
			<div
				className="MessageBox"
				ref={(dummyRefForMessageScroll) => {this.dummyRefForMessageScroll = dummyRefForMessageScroll}} 
			>
				{ processedMessages }
			</div>
		);
	}
}

MessageList.propTypes = {
	chat: PropTypes.array.isRequired
}

export default MessageList;