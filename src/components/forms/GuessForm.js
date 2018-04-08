import React from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import validator from 'validator';
import InlineError from "../messages/InlineError";
import '../../css/GuessForm.css';

class GuessForm extends React.Component {
	state = {
		data: {
			guess: ''
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
				// .catch(err =>
				// 	this.setState({ errors: err.response.data.errors, loading: false})
				// );
		}
	};

    onlyLowercaseLetters = (str) => {
    	return str.match("^[a-z ]+$");
    }

	validate = data => {
		const errors = {};
		if (!this.onlyLowercaseLetters(data.guess)||!(data.guess.length<=15)||!(data.guess.length>0)) errors.guess = "Invalid guess. Max 15 characters."
		return errors;
	};

	render() {
		const { errors, data, loading } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<FormGroup 
					controlId="guess"
				>
					<ControlLabel htmlFor="guess">Guess</ControlLabel>
					<FormControl
						type="text"
						id="guess"
						placeholder="take a guess!"
						value={data.guess}
						onChange={this.onChange}
					/>
					{errors.guess && <InlineError text={errors.guess} />}
				</FormGroup>
				<Button bsClass="GuessSubmitButton" type="submit">Submit</Button>
			</form>
		);
	}
}

GuessForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default GuessForm;