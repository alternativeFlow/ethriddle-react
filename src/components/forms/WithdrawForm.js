import React from "react";
import PropTypes from "prop-types";
import { Form, Col, Row, Grid, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import validator from 'validator';
import InlineError from "../messages/InlineError";

class WithdrawForm extends React.Component {
	state = {
		data: {
			withdrawAmt: ''
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
			this.setState({
				data: {
					withdrawAmt: ''
				},
				loading:false,
				errors: {}
			});
		}
	};

	isNumeric = (n) => {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	validate = data => {
		const errors = {};
		if (!this.isNumeric(data.withdrawAmt)||!(data.withdrawAmt!='')) errors.withdrawAmt = "Withdrawal amount must be a number";
		return errors;
	};

	render() {
		const { errors, data, loading } = this.state;

		return (
			<Grid>
			<Row>
			<Col md={1}>
			</Col>
			<Col md={11}>
			<Form inline onSubmit={this.onSubmit}>
				<FormGroup 
					controlId="withdrawAmt"
				>
					<ControlLabel htmlFor="guess">Withdraw</ControlLabel>
					<FormControl
						type="text"
						id="withdrawAmt"
						placeholder="Withdraw from riddle"
						value={data.withdrawAmt}
						onChange={this.onChange}
					/>
					{errors.withdrawAmt && <InlineError text={errors.withdrawAmt} />}
				</FormGroup>
				<Button type="submit">Submit</Button>
			</Form>
			</Col>
			</Row>
			</Grid>
		);
	}
}

WithdrawForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default WithdrawForm;