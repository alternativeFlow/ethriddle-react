import React from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import validator from 'validator';
import InlineError from "../messages/InlineError";

class AddMessageForm extends React.Component {
	state = {
		data: {
			message: '',
			token: this.props.token
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
				.submit(this.state.data);
				// .catch(err =>
				// 	this.setState({ errors: err.response.data.errors, loading: false})
				// );
			this.setState({
				...this.state,
				data: {...this.state.data, message: ''}
			});
		}
	};

	onlyLettersAndDigits = (str) => {
      return str.match("^[A-z0-9 !?']+$");
    };

	validate = data => {
		const errors = {};
		if (!this.onlyLettersAndDigits(data.message)||!(data.message.length<=198)) errors.message = "Invalid Message, only numbers, letters and !?' allowed. Max 198 characters.";
		return errors;
	};

	render() {
		const { errors, data, loading } = this.state;
		if (this.props.token!=this.state.data.token) {
			this.setState({
				...this.state,
				data: {...this.state.data, token: this.props.token}
			})
		}
		return (
			<form onSubmit={this.onSubmit}>
				<FormGroup>
					<FormControl
						type="text"
						placeholder="Type message here"
						id="message"
						value={data.message}
						onChange={this.onChange}
					/>
					{errors.message && <InlineError text={errors.message} />}
				</FormGroup>
				<Button type="submit">Send</Button>
			</form>
		);
	}
}

AddMessageForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default AddMessageForm;




