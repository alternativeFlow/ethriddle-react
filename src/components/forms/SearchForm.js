import React from "react";
import PropTypes from "prop-types";
import { Form, Alert, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
import '../../css/SearchForm.css';

class SearchForm extends React.Component {
  state = {
    data: {
      search: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.id]: e.target.value }
    });

    console.log(e.target.value);
    this.props.search(e.target.value);
  };

  // onSubmit = e => {
  //   e.preventDefault();
  //   const errors = this.validate(this.state.data);
  //   this.setState({ errors });
  //   if (Object.keys(errors).length === 0) {
  //     this.setState({ loading: true });
  //     this.props
  //       .submit(this.state.data)
  //       .catch(err =>
  //         this.setState({ errors: err.response.data.errors, loading: false })
  //       );
  //   }
  // };


  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        {!!errors.global && <Alert bsStyle="danger">{errors.global}</Alert>}
        <FormGroup
          controlId="search"
        >
          <FormControl
            type="text"
            id="search"
            name="search"
            placeholder="Type to search in titles, bodies of riddles, and nicknames"
            value={data.search}
            onChange={this.onChange}
          />
        </FormGroup>
      </Form>
    );
  }
}

SearchForm.propTypes = {
  // submit: PropTypes.func.isRequired,
  getAllRiddles: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

export default SearchForm;