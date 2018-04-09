import React from 'react';
import PropTypes from 'prop-types';
import { Link }  from "react-router-dom";
import { connect } from 'react-redux';
import { logout, login } from '../actions/auth';
import { getAllRiddles } from '../actions/riddles';
import { setRiddleToDetail } from '../actions/riddleToDetail';
import { setHomepageUI } from '../actions/homepageUI';
import { signup } from "../actions/users"
import HomepageHeaderBox from './pageComponents/HomepageHeaderBox';
import SearchBox from './pageComponents/SearchBox';
import RiddlesBox from './pageComponents/RiddlesBox';
import RiddleDetailBox from './pageComponents/RiddleDetailBox';
import SignUpBox from './pageComponents/SignUpBox';
import { getWeb3, initContract } from '../../ethUtils/getWeb3';
import { handleGuess, 
	checkForWeb3Network, 
	displayWeb3OrNetError, 
	getAccounts0, 
	checkForAndUpdateRiddleActivity } from '../../ethUtils/ethUtils';
import '../../css/HomePage.css';

class HomePage extends React.Component {

	web3 = {};

	contract = () => {};

	account = "";

	handleGuess = (riddle, guess) => {
		let web3 = this.web3;
		let contract = this.contract;

		let hashedGuess = web3.utils.keccak256(guess);

		handleGuess(web3, contract, riddle, hashedGuess).then(tx => {
			checkForAndUpdateRiddleActivity(web3, contract, riddle).then(activity => {
			});
		});
		alert("Once you sign the transaction, just wait until the transaction goes through in Metamask and your guess will go through. If it is correct, you should have more eth in your account!");
	};

	determineWhetherToRenderMetamaskMessages = () => {
		//Render metamask messages if "mainnet"/"testnet" and is not authenticated
		//or if no web3
		return checkForWeb3Network(this.web3).then(result => {
			//switch testnet for mainnnet in production
			if (result=="No web3"||result=="netError"||result=="ropsten") {
				if (result=="ropsten") {
					if (!this.props.isAuthenticated) {
						return true;
						console.log('isAuthenticated checkForWeb3Network');
					}
					else {
						return false;
					}
				}
				else {
					return true;
				}
			}
			else {
				return false;
			}
		});
	};

	determineWhetherToRenderRiddles = () => {
			return checkForWeb3Network(this.web3).then(result => {
				//Switch testnet for mainnet for production
				if (result=="ropsten"||result=="unknown"||result=="No web3"||result=="netError") {
					console.log('render riddles true reached');
					return true;
				} 
				else {
					console.log("render riddles false reached");
					return false;
				}
			});
	};

	determineWhetherToRenderHomepage = () => {
		return new Promise( (resolve, reject) => {
			checkForWeb3Network(this.web3)
				.then(result => {
					console.log(result);
					//Switch to "mainnet" for production
					if (result=="ropsten") {
						getAccounts0(this.web3).then(account => {
							//CONVENIENTLY Set account
							this.account = account;
							if (account=="0") {
								console.log("no account in determineWhetherToRenderHomepage");
								resolve(true);	
							}
							else {
							//check database for existence of account
							//Logs user in as well
								this.props.login(account)
									.then(user => {
										if (user) {
											resolve(true);
										}
									})
									.catch(err => {
										console.log(err);
										if (err) {
											if (this.props.isAuthenticated) {
												this.props.logout();
											}
											resolve(false);
										}
									});
							}
						});
					}
					else {
						resolve(true);
					}
				});
		});
	};

	determineHomepageUI = () => {
				//Determines which ui elements to display based on network and web3 results
				//or based on mainnet and whether account needs to sign up
				let renderRiddles;
				let renderMetamaskMessages;
				let renderHomepage;
				this.determineWhetherToRenderHomepage().then(result => {
							renderHomepage = result;
							this.determineWhetherToRenderRiddles().then(result1 => {
								renderRiddles = result1;
								this.determineWhetherToRenderMetamaskMessages().then(result2 => {
									renderMetamaskMessages = result2;
									setTimeout( () => {
										let homepageUI = {
											renderHomepage: renderHomepage,
											renderRiddles: renderRiddles,
											renderMetamaskMessages: renderMetamaskMessages,
										};
										this.props.setHomepageUI(homepageUI);
									}, 100);
								});
							});
				});
	};


	signUpBoxSubmit = (data) => {
		return this.props.signup(data);
	};

	startPoll = () => {
		this.determineHomepageUI();
		console.log('poll');
		setTimeout(this.startPoll, 3000);
	};

	componentDidMount() {
		getWeb3
			.then(results => {
				if (results.web3) {
					this.web3 = results.web3;
					this.contract = initContract(this.web3);

					this.determineHomepageUI();
				}	
			});
		setTimeout(this.startPoll, 3000);
	}

	render() {
		return (
			//Render signupform if signed into metamask and unregistered or render homepage
			<div>
				{ this.props.renderHomepage ? (
					<div>
						{this.props.isAuthenticated ? (
							<Link to="/dashboard" onClick={() => this.props.setRiddleToDetail({})}>User Page</Link>
							) : (
							<p>Sign in to Metamask to access the User Page</p>
						)}
						<HomepageHeaderBox 
							isAuthenticated={this.props.isAuthenticated} 
							logout={this.props.logout}
							renderMetamaskMessages={this.props.renderMetamaskMessages}
						/>
						{ this.props.riddleSelected ? (
							<div className="SeperatingBarrierSalmon">
								<RiddleDetailBox 		
									riddle={this.props.riddleToDetail} 
									setRiddleToDetail={this.props.setRiddleToDetail}
									web3={this.web3}
									contractInstance={this.contract}
									handleGuess={this.handleGuess}
									renderMetamaskMessages={this.props.renderMetamaskMessages}
								/>
							</div>
							) : (
							<div className="SeperatingBarrierSalmon">
								{this.props.renderRiddles ? (
									<div>
										<SearchBox />
										<RiddlesBox />
									</div>
									) : (
									<p>Please Connect to the Main Ethereum Network then refresh the page to use EthRiddle.</p>
								)}
							</div>
						)}
					</div>
					) : (
					<div>
						<SignUpBox submit={this.signUpBoxSubmit} account={this.account}/>
					</div>
					)
				}
			</div>
		);
	}
}

HomePage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	riddleSelected: PropTypes.bool.isRequired,
	riddleToDetail: PropTypes.object.isRequired,
	getAllRiddles: PropTypes.func.isRequired,
	setRiddleToDetail: PropTypes.func.isRequired,
	setHomepageUI: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	signup: PropTypes.func.isRequired,
	handleGuess: PropTypes.func.isRequired,
	renderRiddles: PropTypes.bool.isRequired,
	renderMetamaskMessages: PropTypes.bool.isRequired,
	renderHomepage: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.token,
		riddleSelected: !(Object.keys(state.riddleToDetail).length == 0),
		riddleToDetail: state.riddleToDetail,
		renderHomepage: state.homepageUI.renderHomepage,
		renderRiddles: state.homepageUI.renderRiddles,
		renderMetamaskMessages: state.homepageUI.renderMetamaskMessages,
		isFetching: state.homepageUI.isFetching
	};
}

export default connect(mapStateToProps, { logout, login, signup, getAllRiddles, setRiddleToDetail, setHomepageUI })(HomePage);