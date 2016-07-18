import { Link } from 'react-router';
import { connect } from  'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/auth';

class SignUp extends Component {

	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className='alert alert-danger'>
					<strong>Oops!</strong>{this.props.errorMessage}
				</div>
				);
		}
	}

	onSubmit(props) {
		this.props.signupUser(props)		
	}
	
    render() {
    	const { fields:{ gender, email, password, passwordConfirm}, handleSubmit } = this.props

	    return (
	    <div className="top-margin">
			<div className="container">
			  <div className="row">
			  	<div className="col-md-6">
			          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }   className="form-horizontal">
			          	<fieldset>
				            <div id="legend">
				              <legend className="">Sign Up</legend>
				            </div>

				             <div className="control-group">
				              <label className="control-label">Gender</label>
				              <div className="controls">
				                <input {...gender}
				                	className="form-control input-lg"
			    					type='text'
			    					placeholder='Gender Type: i.e.: Male, female, transgender, n/a, etc.'
					      		/>
					      		<div className='text-help' style={{color:'red'}}>
									{gender.touched && gender.error ? gender.error : ''}
								</div>
				              </div>
				            </div>


				            <div className="control-group">
				              <label className="control-label">Email</label>
				              <div className="controls">
				                <input {...email}
				                	className="form-control input-lg"
			    					type='text'
			    					placeholder="type your email"
					      		/>
					      		<div className='text-help' style={{color:'red'}}>
									{email.touched && email.error ? email.error : ''}
								</div>
				              </div>
				            </div>
				         
				            <div className="control-group">
				              <label className="control-label">Password</label>
				              <div className="controls">
				                <input {...password}
				                	className="form-control input-lg"
			    					type="password" 
			    					placeholder="type your password"
			    				/>
			    				<div className='text-help' style={{color:'red'}}>
									{password.touched && password.error ? password.error : ''}
								</div>
				              </div>
				            </div>

				            <div className="control-group">
				              <label className="control-label">Confirm Password</label>
				              <div className="controls">
				                <input {...passwordConfirm}
				                	className="form-control input-lg"
			    					type="password" 
			    					placeholder="confirm your password"
			    				/>
			    				<div className='text-help' style={{color:'red'}}>
									{passwordConfirm.touched && passwordConfirm.error ? passwordConfirm.error : ''}
								</div>
				              </div>
				            </div>

				            <div className="control-group">
				              <div className="controls">
				              	<p>Already have an account?<Link to={'sign_in'}><strong>Sign In</strong></Link></p>
				                {this.renderAlert()}
				                <button className="btn btn-success"  type="submit">Sign up</button>
				              </div>
				            </div>
			         	</fieldset>
			        </form>
			    </div> 
			  </div>
			</div>
		</div>
	    );
    };
};

//Form Validation

function validate(values){
	const errors = {};

	if(!values.gender){
		errors.gender = 'Please enter a gender';
	}

	if(!values.email){
		errors.email = 'Please enter an email';
	}

	if(!values.password){
		errors.password = 'Please enter a password';
	}

	if(!values.passwordConfirm){
		errors.passwordConfirm = 'Please enter a password confirmation';
	}

	if(values.password !== values.passwordConfirm){
		errors.password = 'Passwords must match';
	}

	return errors;

}

function mapStateToProps(state){
	return {
		errorMessage: state.auth.error, //from rootReducer (index.js in reducers)
	}
}

export default reduxForm({
	form: 'signup',
	fields: ['gender','email','password','passwordConfirm'],
	validate
},mapStateToProps,actions)(SignUp)