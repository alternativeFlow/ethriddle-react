import React from 'react';
import api from '../components/api';

export const handleCreateRiddle = (web3, contract, riddle, answer) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}

			var contractInstance;
			var account = accounts[0];
			contract.deployed().then( (instance) => {
				contractInstance = instance;

				let guessTaxation = riddle.guessCost*0.0375;
				let payoutTaxation = riddle.payoutAmt*0.0375;
				let guessCost = riddle.guessCost;
				let payoutAmt = riddle.payoutAmt
				// console.log("guessCost and type");
				// console.log(guessCost);
				// console.log(typeof guessCost);
				// console.log("payoutAmt and type");
				// console.log(payoutAmt);
				// console.log(typeof payoutAmt);
				// console.log("guessTaxation and type");
				// console.log(guessTaxation);
				// console.log(typeof guessTaxation);
				// console.log("payoutTaxation and type");
				// console.log(payoutTaxation);
				// console.log(typeof payoutTaxation);

				resolve(contractInstance.createRiddle(
					riddle._id, 
					answer, 
					web3.utils.toWei(guessCost.toString()),
					web3.utils.toWei(payoutAmt.toString()),
					web3.utils.toWei(guessTaxation.toString()),
					web3.utils.toWei(payoutTaxation.toString()),
					{from: account, value: web3.utils.toWei(payoutAmt.toString())}
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleCreateRiddle');
				console.log(err.message);
				reject(err);
			});
		});
	});
}

export const handleGuess = (web3, contract, riddle, guess) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}
			
			var contractInstance;
			var account = accounts[0];

			contract.deployed().then( (instance) => {
				contractInstance = instance;

				resolve(contractInstance.guess(
					riddle._id, 
					guess, 
					{from: account, value: web3.utils.toWei(riddle.guessCost.toString()) }
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleGuess');
				console.log(err.message);
				reject(err);
			});
		});
	});
};

export const handleWithdraw = (web3, contract, riddle, amt) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}
			
			var contractInstance;
			var account = accounts[0];

			contract.deployed().then( (instance) => {
				contractInstance = instance;

				resolve(contractInstance.withdrawFromRiddle(
					riddle._id, 
					web3.utils.toWei(amt.toString()), 
					{from: account }
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleWithdraw');
				console.log(err.message);
				reject(err);
			});
		});	
	});
};

export const handleCancelRiddle = (web3, contract, riddle) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}
			
			var contractInstance;
			var account = accounts[0];

			contract.deployed().then( (instance) => {
				contractInstance = instance;

				resolve(contractInstance.cancelRiddle(
					riddle._id, 
					{from: account }
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleCancelRiddle');
				console.log(err.message);
				reject(err);
			});
		});		
	});
};

export const handleCheckForActivity = (web3, contract, riddle) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}
			
			var contractInstance;
			var account = accounts[0];

			contract.deployed().then( (instance) => {
				contractInstance = instance;

				resolve(contractInstance.checkForActivity(
					riddle._id, 
					{from: account }
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleCheckForActivity');
				console.log(err.message);
				reject(err);
			});
		});	
	});
};

export const handleGetBalance = (web3, contract, riddle) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}
			
			var contractInstance;
			var account = accounts[0];

			contract.deployed().then( (instance) => {
				contractInstance = instance;

				resolve(contractInstance.getBalance(
					riddle._id, 
					{from: account }
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleGetBalance');
				console.log(err.message);
				reject(err);
			});
		});		
	});
}

export const handleGetOwnerOfRiddle = (web3, contract, riddle) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}
			
			var contractInstance;
			var account = accounts[0];

			contract.deployed().then( (instance) => {
				contractInstance = instance;

				resolve(contractInstance.getOwnerOfRiddle(
					riddle._id, 
					{from: account }
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleGetOwnerOfRiddle');
				console.log(err.message);
				reject(err);
			});
		});		
	});
}
//for test
export const handleGetOwnerOfEthRiddle = (web3, contract, riddle) => {
	return new Promise((resolve, reject) => {
		web3.eth.getAccounts((error, accounts) => {
			if (error) {
				console.log(error);
			}
			
			var contractInstance;
			var account = accounts[0];

			contract.deployed().then( (instance) => {
				contractInstance = instance;

				resolve(contractInstance.getOwnerOfEthRiddle( 
					{from: account }
				));
			})
			.catch( (err) => {
				console.log('err in getaccounts handleGetOwnerOfEthRiddle');
				console.log(err.message);
				reject(err);
			});
		});		
	});
}

export const checkForWeb3Network = (web3) => {
	return new Promise( (resolve, reject) => {
		if (web3) {
			web3.eth.net.getId((err, netId) => {
			  if (err) {
			  	console.log(err);
			  	resolve('netError');
			  }
			  else {
				  switch (netId.toString()) {
				    case "1":
				      console.log('This is mainnet');
				      resolve("mainnet");
				      break;
				    case "2":
				      console.log('This is the deprecated Morden test network.');
				      resolve("morden");
				      break;
				    case "3":
				      console.log('This is the Ropsten test network.');
				      resolve("ropsten");
				      break;
				    case "4":
				      console.log('This is the Rinkeby test network.');
				      resolve("rinkeby");
				      break;
				    case "42":
				      console.log('This is the Kovan test network.');
				      resolve("kovan");
				      break;
				    default:
				      console.log('This is an unknown network.');
				      resolve("unknown");
				      break;
				  }
			  }
			})
		} else {
			console.log("No web3 in checkForWeb3Network");
			resolve("No web3");
		}
	});
}

export const getAccounts0 = (web3) => {
	return new Promise( (resolve, reject) =>{
		if (web3) {
			web3.eth.net.getId((err, netId) => {
				if (err) {
					console.log(err);
				}
				//Switch from testnet to mainnet for production
				if (netId=="3") {
					web3.eth.getAccounts((accountsError, accounts) => {
						if (accountsError) {
							console.log(accountsError);
						}
						if (accounts[0]) {
							console.log('Resolve to account');
							resolve(accounts[0]);
						}
						else {
							console.log('resolve to account=0');
							resolve("0");
						}
					});
				}
			});
		}
		else {
			console.log("no web3 in getAccounts0");
		}
	});
}

export const checkForAndUpdateRiddleActivity = (web3, contract, riddle) => {
	return new Promise((resolve, reject) => { 
			let currentDbActivity = riddle.active;
			handleCheckForActivity(web3, contract, riddle).then(result => {
				let currentContractActivity = result;
				if (currentDbActivity!=currentContractActivity) {
					let id = riddle._id;
					api.riddles.updateRiddleActivity(id, currentContractActivity).then(updateResult => {
						console.log('updateResult in checkForAndUpdateRiddleActivity');
						console.log(updateResult);
						resolve(result);
					});
				}
				else {
					resolve(result);
				}
			})
			.catch(err=> {
				console.log(err);
			})
	});
};