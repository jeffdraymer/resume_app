import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
    //When user clicks the delete post button then call the deletePost action
    onDeleteClick(id){
        this.props.deletePost(id);
    }
    //When user clicks the like button (thumbs up) then call the addLike action
    onLikeClick(id){
        this.props.addLike(id);
    }
    //When user clicks the unlike button (thumbs down) then call the removeLike action
    onUnlikeClick(id) {
        this.props.removeLike(id);
    }
    //confirm if the user has already liked a post
    findUserLikes(likes){
        //Getting the details of the currently logged in user to verify against the current post
        const { auth } = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0){
            return true;
        } else {
            return false;
        }
    }

  render() {
      const { post, auth, showActions } = this.props;

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                        <img className="rounded-circle d-none d-md-block" 
                            src={post.avatar}
                            alt="" />
                    </a>
                    <br />
                    <p className="text-center">{post.name}}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    {/*Only show the action buttons if part of the post feed page, not for the individaul posts*/}
                    {showActions ? (<span>
                        <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            {/*Will check if the user has liked the post already and change the color of the tag to green if they have*/}
                            <i className={classnames("fas fa-thumbs-up", { "text-info": this.findUserLikes(post.likes) })}></i>
                            {/*Will show the number of likes that are currently stored in the likes array*/}
                            <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                            <i className="text-secondary fas fa-thumbs-down"></i>
                        </button>
                        {/*Will send the user to the page to show comments for the selected post*/}
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                  </Link>
                        {/*If the user owns the comment, then display a button which will allow them to delete the comment*/}
                        {post.user === auth.user.id ? (
                            <button type="button" className="btn btn-danger mr-1" onClick={this.onDeleteClick.bind(this, post._id)}>
                                <i className="fas fa-times" />
                            </button>
                        ) : null}
                    </span>) : null}
                    
                </div>
            </div>
        </div>
    )
  }
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.Proptypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
    
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    deletePost,
    addLike,
    removeLike
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
