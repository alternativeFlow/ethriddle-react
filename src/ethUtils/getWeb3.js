import Web3 from 'web3';
import EthRiddleArtifact from '../contracts/EthRiddle.json'

export const getWeb3 = new Promise( (resolve, reject) => {
	window.addEventListener('load', () => {
		var results;
		var web3 = window.web3;

		if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);

			results = {
				web3: web3
			}

			console.log('Injected web3 detected');

			resolve(results);
		}
		else {
			// var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

			web3 = null;

			results = {
				web3: web3
			}

			console.log('no web3 instance injected, using ganache');

			resolve(results);
		}
	});
});

export const initContract = (web3) => {

	const TruffleContract = require('truffle-contract');
	const contract = TruffleContract(EthRiddleArtifact);
	contract.setProvider(web3.currentProvider);

	return contract;
};