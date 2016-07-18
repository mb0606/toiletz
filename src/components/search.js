import { Link } from 'react-router';
import { connect } from  'react-redux';
import React, { Component } from 'react';
import * as actions from '../actions/index';


class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = { term: ""};
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
	
	onFormSubmit(event) {
		this.props.search(this.state.term);
		this.setState({ term: "" });
	}

    render() {
	    return (
	      <form className="navbar-form navbar-center" role="search">
	     	 <div className="form-group">
		      <input 
		      	type="text" 
		      	className="form-control"
		      	placeholder="Find a Toilet!"
		      	value={this.state.term}
		      	onChange={(event)=> this.setState({ term: event.target.value })}
		      />
		     </div>
		      <Link to={'home'}>
			      <span className="header-btn">
			      	<button type="submit" className="btn btn-default" onClick={this.onFormSubmit}>Submit</button>
			      </span>
		      </Link>
	      </form>
	    );
    };
};

export default connect(null, actions)(SearchBar);