import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col, Glyphicon } from "react-bootstrap";
import { getAllRiddles } from '../../actions/riddles';
import { setRiddlesToDisplay } from '../../actions/riddlesToDisplay';
import SearchForm from '../../forms/SearchForm'

class SearchBox extends React.Component {

	search = (search) => {
		var riddles = this.props.riddles;

		//to filter Objects
		let filter = (obj, predicate) =>
			Object.keys(obj)
				.filter( key => predicate(obj[key]) )
				.reduce( (res, key) => (res[key] = obj[key], res), {});


		let regexEscape = (str) => {
		    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
		}

		let reg = (input) => {
		    var flags;
		    //could be any combination of 'g', 'i', and 'm'
		    flags = 'i';
		    input = regexEscape(input);
		    return new RegExp(input, flags);
		}

		let predicate = riddle => {
			let searchInTitle = riddle.title.search(reg(search));
			let searchInRiddle = riddle.riddle.search(reg(search));
			let searchInEmail = riddle.owner.email.search(reg(search));

			if (searchInTitle!=-1||searchInRiddle!=-1||searchInEmail!=-1) {
				return true;
			}
			else {
				return false;
			}
		}

		let filtered = filter(riddles, predicate);
		this.props.setRiddlesToDisplay(filtered);
	};

	render() {
		const { getAllRiddles, riddles } = this.props;
		return (
			<div>
				<Grid>
				<Row>
				<Col md={1}>
				<p><Glyphicon glyph="search" />  Search</p>
				</Col>
				<Col md={11}>
				<SearchForm 
					getAllRiddles={getAllRiddles}
					search={this.search}
				/>
				</Col>
				</Row>
				</Grid>
			</div>
		);
	}
}

SearchBox.propTypes = {
	getAllRiddles: PropTypes.func.isRequired,
	setRiddlesToDisplay: PropTypes.func.isRequired,
	riddles: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return {
		token: state.user.token,
		riddles: state.riddles
	};
}

export default connect(mapStateToProps, { getAllRiddles, setRiddlesToDisplay })(SearchBox);