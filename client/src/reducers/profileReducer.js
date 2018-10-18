import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from '../actions/types';

const initialState = {
    profile: null, //Will contain all the details of a specific profile
    profiles: null, //Will contain all the profiles which currently exist in the DB
    loading: false //Will track if the data have been successfully retrieved from the DB
}

export default function(state = initialState, action) {
    switch (action.type) {
        //Set loading value so that the Spinner component will run while the results are being fetched
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        //Returns a single profile object    
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        //Removes the active profile from the state    
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        //Returns all the profile objects which were found in the DB  
        case GET_PROFILES:
            return{
                ...state,
                profiles: action.payload,
                loading: false
            }
        default:
            return state;
    }
}