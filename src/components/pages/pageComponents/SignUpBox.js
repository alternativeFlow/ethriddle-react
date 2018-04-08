import React from 'react';
import PropTypes from 'prop-types';
import {Well} from 'react-bootstrap';
import SignupForm from '../../forms/SignupForm';
import { getAccounts0 } from '../../../ethUtils/ethUtils';
import { getWeb3 } from '../../../ethUtils/getWeb3';
import '../../../css/SignUpBox.css'

class SignUpBox extends React.Component {



	render() {	
		console.log(this.props.account);
		return (
			<div>
				<Well className="SignUpBoxWell">
					<h4>Sign up below to use EthRiddle</h4>

					<SignupForm submit={this.props.submit} account={this.props.account}/>
				</Well>
			</div>
		);
	}
}

SignUpBox.propTypes = {
	account: PropTypes.string.isRequired,
	submit: PropTypes.func.isRequired
}

export default SignUpBox;