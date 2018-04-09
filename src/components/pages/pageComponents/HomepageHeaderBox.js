import React from 'react';
import PropTypes from 'prop-types';
import { Link }  from "react-router-dom";
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ChatBox from './ChatBox';
import '../../../css/HomepageHeaderBox.css';

class HomepageHeaderBox extends React.Component {

	detectmobile = () => { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
	}


	render() {
		let mobile = this.detectmobile();
		return (
			<div>
				<Grid>
					<Row>
						<Col md={7}>
							<h1 className="HomepageTitle">EthRiddle</h1>
							<div>
								Guess riddles and win eth!
								{ this.props.renderMetamaskMessages ? (
									<p>To get started, install Metamask. If you already have it installed, please sign in. If you need more info you can find it in the <Link to="/faq">FAQ.</Link></p>
									) : (
									<p></p>
									)
								}
								{ mobile ? (
									<p>Please note, this site is not optimized for mobile.</p>
									): (
									<p></p>
									)
								}
							</div>
						</Col>
						<Col md={5} className="ChatBox">
							<ChatBox />
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

HomepageHeaderBox.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	renderMetamaskMessages: PropTypes.bool.isRequired
}

export default HomepageHeaderBox;