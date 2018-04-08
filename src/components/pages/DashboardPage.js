import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import AddRiddleForm from '../forms/AddRiddleForm';
import { createRiddle, getAllUserRiddles } from '../actions/riddles';
import { setRiddleToDetail } from '../actions/riddleToDetail';
import UserRiddleDetailBox from './pageComponents/UserRiddleDetailBox';
import UserRiddlesBox from './pageComponents/UserRiddlesBox';
import SearchBox from './pageComponents/SearchBox';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { getWeb3, initContract } from '../../ethUtils/getWeb3';
import {  
	handleCreateRiddle, 
	handleWithdraw,
	handleCancelRiddle,
	handleCheckForActivity,
	handleGetBalance,
	handleGetOwnerOfRiddle,
	handleGetOwnerOfEthRiddle,
	checkForAndUpdateRiddleActivity } from '../../ethUtils/ethUtils';
import '../../css/DashboardPage.css';


class DashboardPage extends React.Component {

	contract = () => {};

	web3 = {};

	isConfirmed = this.props.isConfirmed;

	submit = data => {
		let web3 = this.web3;
		let contract = this.contract;

		let answer = web3.utils.keccak256(data.answer);

		this.props.createRiddle(data).then(riddle => {
			
			handleCreateRiddle(web3, contract, riddle, answer).then(result => {
				if (result) {
					//Set riddletodetail and checkfor/update activity after handling transaction, assuming they stay on the page
					checkForAndUpdateRiddleActivity(web3, contract, riddle).then(activity => {
						this.props.getAllUserRiddles();
					});
				}
			});
			alert("Once you sign the transaction, just wait until the transaction goes through in Metamask and your riddle will be created! If it's not active by then, you can click 'check activity' in the detail box on your userpage and it should update!");
		});
	};
	
	handleWithdraw = (riddle, amt) => {
		let web3 = this.web3;
		let contract = this.contract;

		handleWithdraw(web3, contract, riddle, amt).then(tx => {
			checkForAndUpdateRiddleActivity(web3, contract, riddle).then(activity => {
			});
		});
		alert("Once you sign the transaction, just wait until the transaction goes through in Metamask and your amount will be withdrawn.");
	};

	handleCancelRiddle = (riddle) => {
		let web3 = this.web3;
		let contract = this.contract;

		handleCancelRiddle(web3, contract, riddle).then(tx => {
		});
		alert("Once you sign the transaction, just wait until the transaction goes through in Metamask and your riddle will be cancelled. Check it's activity in the riddle's detail box on your userpage.");
	};

	handleCheckForActivity = (riddle) => {
		let web3 = this.web3;
		let contract = this.contract;

		checkForAndUpdateRiddleActivity(web3, contract, riddle).then(activity=> {
			alert(activity);
		});	
	};

	handleGetBalance = (riddle) => {
		let web3 = this.web3;
		let contract = this.contract;

		handleGetBalance(web3, contract, riddle).then(balance => {
			alert(web3.utils.fromWei(balance.toString()));
		});		
	};

	handleGetOwnerOfRiddle = (riddle) => {
		let web3 = this.web3;
		let contract = this.contract;

		handleGetOwnerOfRiddle(web3, contract, riddle).then(owner => {
			alert(owner);
		});		
	};
	//for test
	handleGetOwnerOfEthRiddle = (riddle) => {
		let web3 = this.web3;
		let contract = this.contract;

		handleGetOwnerOfEthRiddle(web3, contract, riddle).then(owner => {
			alert(owner);
		});		
	};

	componentWillMount() {
		getWeb3
			.then(results => {
				if (results.web3) {
					this.web3 = results.web3;
					this.contract = initContract(this.web3);
				}
			});
	}

	render(){
		return (
			<div>
				<Grid>
					<Row>
						<div>
							<Link to='/' onClick={() => this.props.setRiddleToDetail({})}>Homepage</Link>
						</div>
					</Row>
					<Row>
						<Col md={6}>
							<h1 className="DashboardPageTitle">Your User Page</h1>
							<p>Create a riddle to the right, and manage/search through your riddles below</p>
							<Link to='/faq'>FAQ</Link>
						</Col>
						<Col className="AddRiddleForm" md={6}>
				<div>
					<AddRiddleForm submit={this.submit} token={this.props.token}/>
				</div>
						</Col>
					</Row>
					<Row className="SeperatingBarrierGreen">
						{ this.props.riddleSelected ? (
							<UserRiddleDetailBox 
								riddle={this.props.riddleToDetail} 
								setRiddleToDetail={this.props.setRiddleToDetail}
								handleWithdraw={this.handleWithdraw}
								handleCancelRiddle={this.handleCancelRiddle}
								handleCheckForActivity={this.handleCheckForActivity}
								handleGetBalance={this.handleGetBalance}
								handleGetOwnerOfRiddle={this.handleGetOwnerOfRiddle}
								handleGetOwnerOfEthRiddle={this.handleGetOwnerOfEthRiddle}
							/>
							) : (
							<div>
								<SearchBox />
								<UserRiddlesBox />
							</div>
						)}
					</Row>	
				</Grid>
			</div>
		);
	}
}

DashboardPage.propTypes ={
	isConfirmed: PropTypes.bool.isRequired,
	getAllUserRiddles: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
	createRiddle: PropTypes.func.isRequired,
	riddles: PropTypes.array.isRequired,
	riddleToDetail: PropTypes.shape({}).isRequired,
	riddleSelected: PropTypes.bool.isRequired,
	setRiddleToDetail: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		isConfirmed: state.user.confirmed,
		token: state.user.token,
		riddles: state.riddles,
		riddleToDetail: state.riddleToDetail,
		riddleSelected: !(Object.keys(state.riddleToDetail).length == 0)
	};
}

export default connect(mapStateToProps, { createRiddle, getAllUserRiddles, setRiddleToDetail })(DashboardPage);