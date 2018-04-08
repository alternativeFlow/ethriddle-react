import React from 'react';
import PropTypes from 'prop-types';
import { Well, Button } from 'react-bootstrap';
import GuessForm from '../../forms/GuessForm';
import '../../../css/RiddleDetailBox.css';

class RiddleDetailBox extends React.Component {
	
	submit = (data) => {
		console.log(data.guess);

		let web3 = this.props.web3;
		let contract = this.props.contract;
		let riddle = this.props.riddle;

		this.props.handleGuess(riddle, data.guess);
	}

	render() {

		let setRiddleToDetail = this.props.setRiddleToDetail;
		let riddle = this.props.riddle;
		let web3 = this.props.web3;
		let contract = this.props.contract;
		return (
			<div>
				<Button bsClass="BackButtonSalmon" onClick={() => setRiddleToDetail({})}>
					Back
				</Button>
				<Well className="RiddleDetailBoxWell">
					<div className="RiddleDetailBoxContent">
						<h3>{riddle.title}</h3>
						<p>{riddle.riddle}</p>
						<p>{riddle.owner.nickname}</p>
						<p>{"Payout Amount:"+riddle.payoutAmt}</p>
						<p>{"Guess Cost:"+riddle.guessCost}</p>
					</div>
					{ this.props.renderMetamaskMessages ? (
						<p className="RiddleDetailBoxMetamaskGuessMessage">Please install Metamask or sign in to guess. More info in the FAQ.</p>
						) : (
						<div>
							<GuessForm submit={this.submit} />
						</div>
						)
					}
				</Well>
			</div>
		);
	}
}

RiddleDetailBox.propTypes = {
	riddle: PropTypes.shape({}).isRequired,
	setRiddleToDetail: PropTypes.func.isRequired,
	web3: PropTypes.object.isRequired,
	contract: PropTypes.func.isRequired,
	renderMetamaskMessages: PropTypes.bool.isRequired
}

export default RiddleDetailBox;