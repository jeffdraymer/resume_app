import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from '../actions/types';

const inintialState = {
    posts: [], //Will hold all of the posts which have been added by users
    post: {}, //Well contain the details of each individual post 
    loading: false //Will track if the data has been returned from the DB
};

export default function(state = inintialState, action) {
    switch (action.type){
        //Set loading value so that the Spinner component will run while the results are being fetched
        case POST_LOADING: 
            return {
                ...state,
                loading: true
            }
        //Returns all of the profiles which were found in the DB
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        //Gets single post which will include all of the 
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }
        //Inserts a new post to the DB and returns all the other posts which have been made
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload,...state.posts]
            }
        //Removes a post from the DB
        //The post id will be returned and the posts array will be filtered so that only posts which
        //do not have an _id which match the one which was passed in will be loaded back to the state
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        default: 
            return state;
    } 
}