import React,{ Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router';

class ToiletDetail extends Component{

	componentDidMount(){
		this.props.getReviews(this.props.toilet.id)
	}

	renderReviews(){
		let reviewsObj = this.props.reviews;
		let reviewsArray = [];
		let tempError = '"Received GET at /api/review/toilet/:reviewId"';
		console.log(JSON.stringify(reviewsObj) ==tempError);
		if(JSON.stringify(reviewsObj) == tempError) {
			return (

					<div className="lead">Be the first to review this Toilet.</div>

			)
		} else if (reviewsObj) {
			for(var prop in reviewsObj) {
				reviewsArray.push(reviewsObj[prop]);
			}
			return reviewsArray.map((review) => {
				return (
					<div>
						<div className='review'>
							<div className="review-content" key={review.id}>
								<p className="review-description"> {review.description}</p>
								<h5 className="review-rating" >Rating - {review.rating}/5</h5>
							</div>
						</div>
					</div>
				);
			})
		} else {
			console.log("SOMETHING WENT WRONG WITH REVIEWS IN TOILET_DETAILS");
		}
	}

	renderLink(){
		if(this.props.auth){
			return (
				<Link to={'review_new'}>
					<button type='submit' className='btn btn-submit add-review'>Add a review</button>
				</Link>
			)
		}
	}

	render(){
		if(!this.props.toilet){
			return <div>Select a toilet.</div>
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
						<div className="panel-form">

							<legend className="toilet-title">{this.props.toilet.name}</legend>


							<div className='toilet-address'>{this.props.toilet.address}</div>
							<div className='toilet-img'><img src="https://s-media-cache-ak0.pinimg.com/736x/29/11/dc/2911dcf723935b77cfc6aa5a1bb69f81.jpg" className="img-responsive"></img></div>
							<div className='toilet-description'>{this.props.toilet.description}</div>

				<div>

						<legend className="reviews-title">Reviews</legend>


					{this.renderReviews()}
				</div>
				{this.renderLink()}
				</div>
			</div>
			</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		toilet: state.activeToilet, //from rootReducer (index.js in reducers)
		reviews: state.reviews,
		auth:state.auth.authenticated,
	}
}
//   connect reducers and containers here
export default connect (mapStateToProps,actions)(ToiletDetail);

//reviews
//description
//rating
//name
//address

//<div>{this.props.toilet.reviews.map((review, index) => {
//					return (
//							<li>{review}</li>
//							)
//						}
//					)
//				}
//				</div>
