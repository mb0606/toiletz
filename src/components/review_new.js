import React,{ Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createReview } from '../actions/index';
import { Link } from 'react-router';

class ReviewsNew extends Component {
	//Navigating onSubmit
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		const toilet = this.props.toilet;
		const userId = localStorage.getItem('userId');
		this.props.createReview(props,toilet,userId)
			.then(() => {
				this.context.router.push('/')
			});
	}

	render(){
		const { fields:{description, rating}, handleSubmit,toilet } = this.props

		return (
			<div className="top-margin">
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3 col-lg-8 col-lg-offset-2">
							<form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-horizontal panel-form">
								<h3>Create a new Review</h3>
								<div className={`form-group ${description.touched && description.invalid ? 'has-danger' : '' }`}>
									<label> Content </label>
									<textarea type="text" className='form-control' {...description}/>
									<div className='text-help'>
										{description.touched ? description.error : ''}
									</div>
								</div>

								<div className={`form-group ${rating.touched && rating.invalid ? 'has-danger' : '' }`}>
									<label> Rating /5</label>
									<input type="number" className='form-control' {...rating}/>
									<div className='text-help'>
										{rating.touched ? rating.error : ''}
									</div>
								</div>
								<div className="form-group">
									<div className='cancel'>
								<button type='submit' className='btn btn-submit' >Submit</button>
									<Link to='/' > <i className="fa fa-chevron-circle-left" aria-hidden="true"> </i><span  type='submit'>
									Cancel</span></Link>
								</div>
								</div>
							</form>
						</div>
						</div>
						</div>
			</div>

		);
	}
}

//Form Validation

function validate(values){
	const errors = {};

	if(!values.description){
		errors.description = 'Enter a valid description'
	}

	if(!(values.rating) || values.rating>5 || values.rating<0){
		errors.rating = 'Enter a valid rating'
	}

	return errors;

}

function mapStateToProps(state){
	return {
		toilet: state.activeToilet, //from rootReducer (index.js in reducers)
		user: state.user
	}
}

export default reduxForm({
	form: 'ReviewsNewForm',
	fields: ['description','rating'],
	validate
},mapStateToProps,{ createReview })(ReviewsNew)
