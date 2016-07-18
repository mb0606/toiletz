import { Link } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { SelectToilet } from '../actions/index';

class ToiletList extends Component{

	
	renderList(){
		if(typeof this.props.toilets === "string"){
			return (
				 	<div>
        				<h3>{this.props.toilets}</h3>
        			</div>
			)
		}
		
		return this.props.toilets.map((toilet, index) => {
			return (	
				<div 
					onClick={()=> this.props.selectToilet(toilet)}
					style={{cursor:'pointer'}}
					key={index}>
					<div>
						<Link to={'details'}><ul className='list-group'>
							<li className='list-group-item' key={toilet.id}>
								<h5>{toilet.name}</h5>
								<strong>{toilet.description}</strong>
							</li>
						</ul></Link>
					</div>
				</div>
			)
		});
	}

	render (){
		if(!this.props.toilets){
      		return null;
    	}
   
		return (
				<div>{this.renderList()}</div>
			)
	}
}

function mapStateToProps(state){
	return {
		toilets:state.toilets
	}
}

function mapDispatchToProps(dispatch){
  //Whenever SearchVal is called, the result should be passed to
  //all of our reducers
  return bindActionCreators({selectToilet:SelectToilet},dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(ToiletList);