import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from "../forms/LoginForm";
import { login } from '../actions/auth';

class LoginPage extends React.Component {
	submit = data => {
		console.log('submit in loginpage reached');
		this.props.login(data);
		this.props.history.push('/dashboard');
	}

	render() {
		return (
			<div>
				<h1>Login Page</h1>

				<LoginForm submit={this.submit} />

				<Link to="/forgot_password">Forgot Password?</Link>
			</div>
		);
	}
}

LoginPage.propTypes = {
	login: PropTypes.func.isRequired,
  	history: PropTypes.shape({
    	push: PropTypes.func.isRequired
  	}).isRequired
};

export default connect(null, { login })(LoginPage);
