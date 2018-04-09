import React from 'react';
import { Link } from 'react-router-dom';
import { Well, Row, Col } from 'react-bootstrap';
import '../../css/FaqPage.css';

class FaqPage extends React.Component {

	render() {
		return (
			<div>
				<Well className="FaqPageWell">
					<Row>
						<Col md={2}>
							<p><Link to="/">Homepage</Link></p>
						</Col>
						<Col md={10}>
							<h2>Frequently Asked Questions</h2>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>What is EthRiddle?</h5>
							<p>A means to transcend your earthly trappings</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>How do I make eth?</h5>
							<p>1. Create a Riddle and make eth taking in guesses or 2. Guess the answer to created Riddles and potentially win the payout!</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>How do I play?</h5>
							<p>Sign up and start! To play, you need Metamask, which you can get <Link to="https://metamask.io/" >here.</Link></p>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>Once I create a riddle, what can I do with it?</h5>
							<p>You can deactivate it, which will stop guesses from being able to be made on that Riddle. You can also withdraw eth from the riddle's balance, which is the sum of all the eth from guesses minus EthRiddle fees (3.75% of all guesses and payouts on guess or payout) plus the eth you put in as a payout when you created it. If the balance drops below the amount the Riddle is supposed to payout, the Riddle is automatically deactivated.</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>Something went wrong, how can I contact you?</h5>
							<p>You can email at EthRiddle.help@gmail.com</p>
						</Col>
					</Row>
				</Well>
			</div>
		);
	}
}

export default FaqPage;