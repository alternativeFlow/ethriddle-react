import React from 'react'
import PropTypes from 'prop-types';
import { Well, Col, Button } from 'react-bootstrap';
import '../../../css/UserRiddle.css'

class UserRiddle extends React.Component {


	render() {
		let setRiddleToDetail = this.props.setRiddleToDetail;
		const riddle = this.props.riddleJSON;

		let processedTitle;
		if (riddle.title.length > 25) {
			processedTitle = riddle.title.substring(0,22);
			processedTitle = processedTitle + '...'
		}
		else {
			processedTitle= riddle.title;
		}

		let processedRiddle;
		if (riddle.riddle.length > 25) {
			processedRiddle = riddle.riddle.substring(0,22);
			processedRiddle = processedRiddle + '...';
		}
		else {
			processedRiddle = riddle.riddle;
		}
		return (
			<Col md={3}>
				<Well className="UserRiddleWell">
					<h4> {processedTitle} </h4>
					<h5> {processedRiddle} </h5>
					<p> {riddle.owner.email} </p>
					<Button bsClass="WithdrawButton" onClick={() => setRiddleToDetail(riddle)}>Details/Withdraw</Button>
				</Well>
			</Col>
		);
	}
}

UserRiddle.propTypes = {
	key: PropTypes.string.isRequired,
	riddleJSON: PropTypes.shape({
		owner: PropTypes.shape({
			email: PropTypes.string.isRequired
		}).isRequired,
		riddle: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}).isRequired,
	setRiddleToDetail: PropTypes.func.isRequired
}

export default UserRiddle;