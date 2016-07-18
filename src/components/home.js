import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import GoogleMap from './google_map'
import ToiletList from '../container/toilet_list';

export default class Home extends Component{

	render(){

		return(
			<div>
				<GoogleMap />
				<h3>Click on a toilet for more details!</h3>
				<ToiletList/>  

			</div>
		);

	}
}



