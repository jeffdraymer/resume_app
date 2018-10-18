import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        //Call the addPost action to create a new post for the user 
        this.props.addComment(postId, newComment);
        //Once the post is created, clear out the textarea so they can make a new post
        this.setState({ text: '', errors: {} })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Make A Comment...
              </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Leave A Comment"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text} />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

CommentForm.Proptypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    addComment
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);