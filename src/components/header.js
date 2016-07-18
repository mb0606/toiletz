import SearchBar from './search';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

class Header extends Component{

	renderLinks(){
		if (this.props.auth){
			//show a link to sign out
			//show a link to add toilet
		return(	<div className="nav navbar-nav navbar-right">
			<span className="header-btn">
				<Link to={'toiletz_new'}>
					<span>
						<button className="btn btn-default">Add Toilet</button>
					</span>
				</Link>
			</span>
			<span className="header-btn">
				<Link to={'/'}>
					<span>
						<button onClick ={this.props.signoutUser.bind(this)} className="btn btn-default">Log Out</button>
					</span>
				</Link>
			</span>
			</div>
		);
		} else {
			//show a link to sign in or sign up
			return (<div className="nav navbar-nav navbar-right">
			<span className="header-btn">
				<Link to={'sign_in'}>
					<span>
						<button className="btn btn-default">Sign In</button>
					</span>
				</Link>
			</span>

			<span>
				<Link to={'sign_up'}>
					<span className="header-btn">
						<button className="btn btn-default">Sign Up</button>
					</span>
				</Link>
			</span>
			</div>
			)			
		}
	}


	render(){

		return(
			<nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
			  <div className="container topnav">
			    <div className="navbar-header">
			      <Link to={"/"}><h2>Toiletz</h2></Link>
			    </div>
		       		<div className="nav navbar-nav navbar-center">
		          		<SearchBar />
		          	</div>
			        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						{this.renderLinks()}
				      </div>
			      	</div>
			   
			</nav>
		);

	}
}

function mapStateToProps(state) {
	return {auth:state.auth.authenticated};
}

export default connect(mapStateToProps,actions)(Header);



