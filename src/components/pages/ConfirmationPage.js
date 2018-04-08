import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../actions/auth';

class ConfirmationPage extends React.Component {
	state = {
		loading: true,
		success: false
	}

	componentDidMount() {
		this.props.confirm(this.props.match.params.token)
			.then(() => this.setState({ loading: false, success: true}))
			.catch(() => this.setState({ loading: false, success: false}));
	}

	render() {
		const { loading, success } = this.state;

		return (
			<div>
				{ loading && (
					<Alert bsStyle="info">
						Validating your email
					</Alert>
				)}

				{!loading && success &&
					(<Alert bsStyle="success">
						Thanks, Account verified.
						<Link to="/dashboard"> Go to dashboard</Link>
						
					</Alert>)
				}

				{!loading && !success && 
					(<Alert bsStyle="danger">
						Invalid Token it seems.
					</Alert>)
				}
			</div>
		);
	}
}

ConfirmationPage.propTypes = {
	confirm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);