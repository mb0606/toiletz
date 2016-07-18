import { FETCH_TOILETZ } from '../actions/index'

export default function(state=null,action){
	switch (action.type){
		case FETCH_TOILETZ:
		return action.payload.data || action.payload
	}
	
	return state;
 
}