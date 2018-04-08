import React from 'react';
import { Alert, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
	state = {
		data: {
			email: '',
			password: ''
		},
		loading: false,
		errors: {}
	};

	onChange = e => 
		this.setState({ 
			data: { ...this.state.data, [e.target.id]: e.target.value}
	});

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });

		console.log('onsubmit in loginform reached');
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				// .catch(err => 
				// 	this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};



	validate = (data) => {
		const errors = {};

		if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
		if (!data.password) errors.password = "Can't be blank";

		return errors;
	};

	render() {
		const { data, errors, loading } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				{ errors.global && (
					<Alert bsStyle="danger">
						Something went wrong
						<p>{errors.global}</p>
					</Alert>
				)}
				<FormGroup 
					controlId="email"
				>
					<ControlLabel htmlFor="email">Email</ControlLabel>
					<FormControl
						type="email" 
						id="email" 
						placeholder="example@example.com" 
						value={data.email}
						onChange={this.onChange}
					/>
					{errors.email && <InlineError text={errors.email} />}
				</FormGroup>
				<FormGroup 
					controlId="password"
				>
					<ControlLabel htmlFor="password">Password</ControlLabel>
					<FormControl
						type="password" 
						id="password" 
						placeholder="make it secure"
						value={data.password}
						onChange={this.onChange}
					/>
					{errors.password && <InlineError text={errors.password} />}
				</FormGroup>
				<Button type="submit">Login</Button>
			</form>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;