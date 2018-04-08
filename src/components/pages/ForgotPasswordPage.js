import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../actions/auth';

class ForgotPasswordPage extends React.Component {
	state = {
		success: false
	}

	submit = data =>
		this.props
			.resetPasswordRequest(data)
			.then(() => this.setState({ success: true }));

	render() {
		return (
			<div>
				{this.state.success ? ( 
					<Alert bsStyle="info">Email has been sent</Alert> 
				) : (
					<ForgotPasswordForm submit={this.submit} />
				)}
			</div>
		);
	}
}

ForgotPasswordPage.propTypes =  {
	resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);