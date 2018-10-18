import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentFeed from '../post/CommentFeed';


class Post extends Component {
  componentDidMount(){
    //using match.params to grab the value which was passed in through the URL
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    //Valiadate that the post is not empty and the page is not still loading
    if(post === null || Object.keys(post).length === 0 || loading){
      postContent = <Spinner/>;
    } else {
      postContent = ( 
        <div>
          {/*Create a PostItem but do not display the action buttons underneath*/}
          <PostItem post={post} showActions={false}/> 
          <CommentForm postId={post._id}/>
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      )
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.Proptypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getPost
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps,mapDispatchToProps)(Post);
