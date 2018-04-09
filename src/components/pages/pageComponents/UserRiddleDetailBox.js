import React from 'react';
import PropTypes from 'prop-types';
import { Well, Button,Grid, Row, Col } from 'react-bootstrap';
import WithdrawForm from '../../forms/WithdrawForm';
import '../../../css/UserRiddleDetailBox.css';

class UserRiddleDetailBox extends React.Component {
	
	submit = (data) => {
		//update database at some point
		this.props.handleWithdraw(this.props.riddle, data.withdrawAmt);
	}

	render() {

		let setRiddleToDetail = this.props.setRiddleToDetail;
		let riddle = this.props.riddle;
		return (
			<div>
				<Button bsClass="BackButtonGreen" onClick={() => setRiddleToDetail({})}>
					Back
				</Button>
				<Well className="UserRiddleDetailBoxWell">
					<div className="UserRiddleDetailBoxContent">
						<h3>{riddle.title}</h3>
						<p>{riddle.riddle}</p>
						<p>{riddle.owner.nickname}</p>
						<p>{"Payout Amount:"+riddle.payoutAmt}</p>
						<p>{"Guess Cost:"+riddle.guessCost}</p>
					</div>
					<div>
						<WithdrawForm submit={this.submit}/>
						<Grid>
							<Row>
								<Col md={1}>
								</Col>
								<Col md={11}>
									<Button onClick={() => this.props.handleGetBalance(riddle)} bsClass="UserRiddleDetailBoxInfoButton">Get Balance</Button>
									<Button onClick={() => this.props.handleCheckForActivity(riddle)} bsClass="UserRiddleDetailBoxInfoButton">Check Activity</Button>
									<Button onClick={() => this.props.handleCancelRiddle(riddle)} bsClass="RiddleCancelButton">Cancel Riddle</Button>
								</Col>
							</Row>
						</Grid>
					</div>
				</Well>
			</div>
		);
	}
}

UserRiddleDetailBox.propTypes = {
	riddle: PropTypes.shape({}).isRequired,
	setRiddleToDetail: PropTypes.func.isRequired,
	handleWithdraw: PropTypes.func.isRequired,
	handleCancelRiddle: PropTypes.func.isRequired,
	handleCheckForActivity: PropTypes.func.isRequired,
	handleGetBalance: PropTypes.func.isRequired
}

export default UserRiddleDetailBox;