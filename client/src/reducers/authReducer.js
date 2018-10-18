import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false, //Will track if the user has been successfully found in the DB and logged in
    user: {} //Will contain all of the details of the user
};

export default function(state = initialState, action){
    switch(action.type){  
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
        return state;
    }
}