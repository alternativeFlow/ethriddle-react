import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { getAllRiddles } from '../../actions/riddles';
import { setRiddlesToDisplay } from '../../actions/riddlesToDisplay';
import { setRiddleToDetail } from '../../actions/riddleToDetail';
import { getWeb3, initContract } from '../../../ethUtils/getWeb3';
import { checkForAndUpdateRiddleActivity } from '../../../ethUtils/ethUtils';
import Riddle from './Riddle';
import '../../../css/RiddlesBox.css';

class RiddlesBox extends React.Component {

	web3 = {};

	contract = () => {};

	setRiddleToDetail = (riddle) => {



		let setRiddleToDetail = this.props.setRiddleToDetail;
		setRiddleToDetail(riddle);
	};

	checkAllRiddlesForActivity = () => {
		let riddlesToDisplay = this.props.riddlesToDisplay;
		Object.keys(riddlesToDisplay).forEach(index => {
			checkForAndUpdateRiddleActivity(this.web3, this.contract, riddlesToDisplay[index]);
			if (index+1==Object.keys(riddlesToDisplay).length) {
				this.props.getAllRiddles();
			}
		});
	};

	componentDidMount() {
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
		//HACK: gives warning about how render should be a pure function
		if (Object.keys(riddlesToDisplay).length ===0 && riddlesToDisplay.constructor === Object) {
			this.props.getAllRiddles().then(() => {
				setRiddlesToDisplay(this.props.riddles);
			});
			getWeb3.then(results => {
				this.web3 = results.web3;
				this.contract = initContract(this.web3);
				
				this.checkAllRiddlesForActivity();
			})
		}

		let riddlesList = [];
 		let riddlesInJSONObject=riddlesToDisplay;
		let setRiddleToDetail = this.props.setRiddleToDetail;

		Object.keys(riddlesInJSONObject).forEach((cardIndex) => {
			let riddleJSON = riddlesInJSONObject[cardIndex];
			// if(this.web3) {
			// 	checkForAndUpdateRiddleActivity(this.web3, this.contract, riddleJSON).then(updatedRiddle=> {
			// 		if (updatedRiddle.active) {
			// 			riddleJSON.active = updatedRiddle.active;
						riddlesList.push(
								<Riddle 
									key={riddleJSON._id} 
									riddleJSON={riddleJSON}
									setRiddleToDetail={setRiddleToDetail}
								/>
						);
			// 		}
			// 	});
			// }
		});

		return (
			<div className="RiddlesBox">
				<Row>
					{console.log(riddlesList)}
					{ riddlesList }
				</Row>
			</div>
		);
	}
}

RiddlesBox.propTypes = {
	getAllRiddles: PropTypes.func.isRequired,
	setRiddlesToDisplay: PropTypes.func.isRequired,
	setRiddleToDetail: PropTypes.func.isRequired,
	riddles: PropTypes.array.isRequired,
	riddlesToDisplay: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		riddles: state.riddles,
		riddlesToDisplay: state.riddlesToDisplay,
		example: state.example
	};
}

export default connect(mapStateToProps, {getAllRiddles, setRiddlesToDisplay, setRiddleToDetail})(RiddlesBox);