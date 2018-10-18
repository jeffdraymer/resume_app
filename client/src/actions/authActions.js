import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types'

//Register User
export const registeruser = (userData, history) => dispatch => {

    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

//Login Get user token
export const loginuser = (userdata, history) => dispatch => {
    axios
        .post('api/users/login', userdata)
        .then(res => {            
            //Once login validation has been confirmed save token to local storage 
            //Token contains the user data, as well as the issued at and expiration of token
            const { token } = res.data;
            //Set token to ls 
            localStorage.setItem('jwtToken', token); 
            //Set token to Authorization header
            setAuthToken(token);
            //decode token to retrieve user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

//set logged in user 
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Log User Out
export const logoutuser = () => dispatch => {
    //Remove token from local storage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

}