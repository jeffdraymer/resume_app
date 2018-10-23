import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER,
    GET_PROFILES
} from './types';

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile')
        .then(res =>
            //If the profile is found then return it
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
        .catch(err =>
            //If the profile is not found then return empty object and prompt user to create profile
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

//Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: null
            }));
};

//Create new profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Profile Loading 
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

//Profile Loading 
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};

//Get All Profiles 
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/all')
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILES,
            payload: null
        }));
};

//Add Experience
export const addExperience = (expData) => dispatch => {
    axios
        .post('/api/profile/experience', expData)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Add Experience
export const addEducation = (eduData) => dispatch => {
    axios
        .post('/api/profile/education', eduData)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Add Technology
export const addTechnology = (techData) => dispatch => {
    axios
        .post('/api/profile/technology', techData)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};


//Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Delete Education
export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

//Delete Technology
export const deleteTechnology = (id) => dispatch => {
    axios
        .delete(`/api/profile/technology/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

//Delete Account
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile')
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
};




