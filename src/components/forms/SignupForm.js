import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import validator from 'validator';
import InlineError from '../messages/InlineError';

class SignupForm extends React.Component {
	state = {
		data: {
			account: this.props.account,
			nickname: ""
		},
		loading: false,
		errors: {}
	};

	onChange = e => {
		return this.setState({ 
			...this.state,
			data: { ...this.state.data,
			 [e.target.id]: e.target.value,
			 account: this.props.account }
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			console.log(this.state.data);
			this.props.submit(this.state.data)
				.catch(err => {
					errors.nickname = "Invalid nickname. Nickname already taken.";
					this.setState({errors});
				});
		}
	};

	onlyLetters = (str) => {
      return str.match("^[A-z]+$");
    };

	validate = data => {
		const errors = {};

		if (!this.onlyLetters(data.nickname)||!(data.nickname.length<=15)||!(data.nickname.length>0)) errors.nickname = "Invalid nickname. Max 15 characters. Only letters. No spaces.";

		return errors;
	};

	render() {
		const {data, errors, loading } = this.state;
		return (
			<form onSubmit={this.onSubmit}>

				<FormGroup 
					controlId="account"
				>
					<ControlLabel htmlFor="email">EthAddress</ControlLabel>
					<FormControl
						type="text"
						id="account"
						placeholder={this.props.account}
						value={this.props.account}
						disabled={true}
					/>
					{errors.account && <InlineError text={errors.account} />}
				</FormGroup>

				<FormGroup>
					<ControlLabel htmlFor="nickname">Nickname</ControlLabel>
					<FormControl
						type="text"
						id="nickname"
						placeholder="enter nickname"
						value={data.nickname}
						onChange={this.onChange}
					/>
					{errors.nickname && <InlineError text={errors.nickname} />}
				</FormGroup>

				<Button type="submit">Sign up</Button>

			</form>
		);
	}
}

SignupForm.propTypes = {
	submit: PropTypes.func.isRequired,
	account: PropTypes.string.isRequired
};

export default SignupForm;