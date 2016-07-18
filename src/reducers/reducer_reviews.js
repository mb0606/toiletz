import { FETCH_REVIEWS } from '../actions/index';

export default function(state = {}, action){
	
	switch(action.type){
		case FETCH_REVIEWS:
			return action.payload.data;

	default:
		return state;
	}
}