import axios from 'axios';

import {ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS } from './types';

//Get Post
//Gets all of the posts which have been added to the DB
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }));
};

//Get Post
//Gets all of the posts which have been added to the DB
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POST,
            payload: null
        }));
};

//Add Post
//Sends the details which the user entered for the post
//Returns the post if it was successfully added
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Add Like
//Sends the id of the post which the user has liked
//If the response is successful then just call the getPosts action, above, to retrieve the post list 
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Add Comment
//Sends the details which the user entered for the comment as well as the postId
//Returns the post if it was successfully added with the new comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Delete like
//will send the id of post which the user has unliked
//If the response is successful then just call the getPosts action, above, to retrieve the post list 
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Delete Post
//will send the id of the post which is to be deleted
//Returns the id of the post so that it can be removed from the state
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Delete Comment
//will send the id of the comment which is to be deleted as well as the associated post 
//Returns the id of the post
export const deleteComment = (postId, commentId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Set Loading State
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
};


//Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};
