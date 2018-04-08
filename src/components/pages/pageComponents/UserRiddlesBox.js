import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { getAllUserRiddles } from '../../actions/riddles';
import { setRiddlesToDisplay } from '../../actions/riddlesToDisplay';
import { setRiddleToDetail } from '../../actions/riddleToDetail';
import { getWeb3, initContract } from '../../../ethUtils/getWeb3';
import { checkForAndUpdateRiddleActivity } from '../../../ethUtils/ethUtils';
import UserRiddle from './UserRiddle';

class UserRiddlesBox extends React.Component {

	web3 = {};

	contract = () => {};


	setRiddleToDetail = (riddle) => {
		let setRiddleToDetail = this.props.setRiddleToDetail;
		setRiddleToDetail(riddle);
	}


	componentDidMount() {
		let getAllUserRiddles = this.props.getAllUserRiddles;
		getAllUserRiddles(this.props.token).then(() => {
			setRiddlesToDisplay(this.props.riddles);
		});
		getWeb3
			.then(results => {
				this.web3 = results.web3;
				this.contract = initContract(this.web3);
			});
	}

	componentWillUnmount() {
		let setRiddlesToDisplay = this.props.setRiddlesToDisplay;
		setRiddlesToDisplay({});
	}

	render() {		
		let setRiddlesToDisplay = this.props.setRiddlesToDisplay;
		let riddlesToDisplay = this.props.riddlesToDisplay;
		let getAllUserRiddles = this.props.getAllUserRiddles;
		//HACK: gives warning about how render should be a pure function

		if (Object.keys(riddlesToDisplay).length ===0 && riddlesToDisplay.constructor === Object) {
			getAllUserRiddles(this.props.token).then(() => {
				setRiddlesToDisplay(this.props.riddles);
			});
		}
		// else {
		// 	if (Object.keys(riddlesToDisplay)[0]) {
		// 		console.log(Object.keys(riddlesToDisplay)[0].owner._id);
		// 		if (this.props.userId!=Object.keys(riddlesToDisplay)[0].owner._id) {
		// 			getAllUserRiddles(this.props.token).then(() => {
		// 				setRiddlesToDisplay(this.props.riddles);
		// 			});
		// 		}
		// 	}
		// }

		let riddlesList = [];
 		let riddlesInJSONObject=riddlesToDisplay;
		let setRiddleToDetail = this.props.setRiddleToDetail;

		Object.keys(riddlesInJSONObject).forEach((cardIndex) => {
			let riddleJSON = riddlesInJSONObject[cardIndex];
			// checkForAndUpdateRiddleActivity(this.web3, this.contract, riddleJSON).then(updatedRiddle => {
			// 	riddleJSON.active = updatedRiddle.active;
				riddlesList.push(
						<UserRiddle 
							key={riddleJSON._id} 
							riddleJSON={riddleJSON}
							setRiddleToDetail={setRiddleToDetail}
						/>
				);
			// });
		});

		return (
			<div>
				<Row>
					{ riddlesList }
				</Row>
			</div>
		);
	}
}

UserRiddlesBox.propTypes = {
	getAllUserRiddles: PropTypes.func.isRequired,
	setRiddlesToDisplay: PropTypes.func.isRequired,
	setRiddleToDetail: PropTypes.func.isRequired,
	riddles: PropTypes.array.isRequired,
	riddlesToDisplay: PropTypes.array.isRequired,
	token: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return {
		riddles: state.riddles,
		riddlesToDisplay: state.riddlesToDisplay,
		token: state.user.token,
		userId: state.user._id
	};
}

export default connect(mapStateToProps, {getAllUserRiddles, setRiddlesToDisplay, setRiddleToDetail})(UserRiddlesBox);