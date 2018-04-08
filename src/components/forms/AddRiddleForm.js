import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, FormGroup, ControlLabel, FormControl, Button, Row, Col } from "react-bootstrap";
import validator from 'validator';
import InlineError from "../messages/InlineError";
import '../../css/AddRiddleForm.css';

class AddRiddleForm extends React.Component {
	state = {
		data: {
			token: this.props.token,
			title: '',
			riddle: '',
			answer: '',
			payoutAmt: '',
			guessCost: ''
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
		console.log("AddRiddleForm onsubmit reached");
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			console.log("AddRiddleForm submit reached");
			this.props
				.submit(this.state.data);
				// .catch(err =>
				// 	this.setState({ errors: err.response.data.errors, loading: false})
				// );
			this.setState(
				{
					data: {
						token: this.props.token,
						title: '',
						riddle: '',
						answer: '',
						payoutAmt: '',
						guessCost: ''
					},
					loading:false,
					errors: {}
				}
			);
		}
	};

	isNumeric = (n) => {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	onlyLetters = (str) => {
      return str.match("^[A-z ?!'']+$");
    };

    onlyLowercaseLetters = (str) => {
    	return str.match("^[a-z ]+$");
    }

	validate = data => {
		const errors = {};
		console.log(!this.onlyLetters(data.title));
		console.log(data.title);
		if (!this.onlyLetters(data.title)||!(data.title.length<=50)||!(data.title.length>0)) errors.title = "Invalid title, (a-Z only), Max 50 characters";
		if (!this.onlyLetters(data.riddle)||!(data.riddle.length<=560)||!(data.riddle.length>0)) errors.riddle = "Invalid riddle, (a-Z and ?!' only), Max 560 characters";
		if (!this.onlyLowercaseLetters(data.answer)||!(data.answer.length<=15)||!(data.answer.length>0)) errors.answer = "Invalid answer, (a-z only), Max 15 characters";
		if (!this.isNumeric(data.payoutAmt)||!(data.payoutAmt!='')) errors.payoutAmt = "Invalid Payout Amount, Real Numbers only";
		if (!this.isNumeric(data.guessCost)||!(data.guessCost!='')) errors.guessCost = "Invalid Guess Cost, Real Numbers only";
		console.log(errors);
		return errors;
	};

	render() {
		const { errors, data, loading } = this.state;

		return (
			<Form horizontal onSubmit={this.onSubmit}>
				<FormGroup
					controlId="title"
				>	
					<Col componentClass={ControlLabel} md={2}>
						Title of Riddle
					</Col>
					<Col md={10}>
						<FormControl
							type="text"
							id="title"
							placeholder="Title of Riddle"
							value={data.title}
							onChange={this.onChange}
						/>
						{errors.title && <InlineError text={errors.title} />}
					</Col>
				</FormGroup>
				<FormGroup
					controlId="riddle"
				>
					<Col componentClass={ControlLabel} md={2}>
						Body of Riddle
					</Col>		
					<Col md={10}>
						<FormControl
							componentClass="textarea"
							placeholder="Type riddle here"
							value={data.riddle}
							onChange={this.onChange}
						/>
						{errors.riddle && <InlineError text={errors.riddle} />}
					</Col>
				</FormGroup>
				<FormGroup
					controlId="answer"
				>
					<Col componentClass={ControlLabel} md={2}>
						Answer to Riddle
					</Col>
					<Col md={10}>
						<FormControl
							type="text"
							id="answer"
							placeholder="Answer to riddle"
							value={data.answer}
							onChange={this.onChange}
						/>
						{errors.title && <InlineError text={errors.answer} />}
					</Col>
				</FormGroup>
				<FormGroup
					controlId="payoutAmt"
				>
					<Col componentClass={ControlLabel} md={2}>
						Amount to Payout
					</Col>
					<Col md={10}>
						<FormControl
							type="text"
							id="payoutAmt"
							placeholder="Amount to payout to a correct guess"
							value={data.payoutAmt}
							onChange={this.onChange}
						/>
						{errors.payoutAmt && <InlineError text={errors.payoutAmt} />}
					</Col>
				</FormGroup>
				<FormGroup
					controlId="guessCost"
				>
					<Col componentClass={ControlLabel} md={2}>
						Cost of Guess
					</Col>
					<Col md={10}>
						<FormControl
							type="text"
							id="guessCost"
							name="guessCost"
							placeholder="Cost of a guess"
							value={data.guessCost}
							onChange={this.onChange}
						/>
						{errors.guessCost && <InlineError text={errors.guessCost} />}
					</Col>
				</FormGroup>
					<Col md={2}>
					</Col>
					<Col md={10}>
						<Button bsClass="AddRiddleButton" type="submit">Submit AddRiddleForm</Button>
					</Col>
			</Form>
		);
	}
}

AddRiddleForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};


export default AddRiddleForm;




