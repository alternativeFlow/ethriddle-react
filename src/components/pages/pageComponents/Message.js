import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {

	render() {	

		return (
			<div>
				{ this.props.message }
			</div>
		);
	}
}

Message.propTypes = {
	message: PropTypes.array.isRequired
}

export default Message;