import React from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends React.Component {
	state = {
		data: {
			token: this.props.token,
			password: '',
			passwordConfirmation: ''
		},
		loading:false,
		errors: {}
	};

	onChange = e =>
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.id]: e.target.value }
		});

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				.catch(err =>
					this.setState({ errors: err.response.data.errors, loading: false})
				);
		}
	};

	validate = data => {
		const errors = {};
		if (!data.password) errors.password = "Can't be blank";
		if (data.password!==data.passwordConfirmation) errors.password = "Passwords must match";
		return errors;
	};

	render() {
		const { errors, data, loading } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<FormGroup 
					controlId="password"
				>
					<ControlLabel htmlFor="password">New Password</ControlLabel>
					<FormControl
						type="text"
						id="password"
						placeholder="your new password"
						value={data.password}
						onChange={this.onChange}
					/>
					{errors.password && <InlineError text={errors.password} />}
				</FormGroup>
				<FormGroup
					controlId="passwordConfirmation"
				>
					<ControlLabel htmlFor="password">Confirm new Password</ControlLabel>
					<FormControl
						type="text"
						id="passwordConfirmation"
						placeholder="type it again please"
						value={data.passwordConfirmation}
						onChange={this.onChange}
					/>
					{errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
				</FormGroup>
				<Button type="submit">Reset</Button>
			</form>
		);
	}
}

ResetPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default ResetPasswordForm;




