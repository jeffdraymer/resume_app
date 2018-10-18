import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

import {connect} from 'react-redux';
import { registeruser } from '../../actions/authActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }
    //Will check if the user is already logged in and if so it will route to the dashboard
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    //will be called when new props are added
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    //Will be called when an input value changes
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    //will be called when the form values are submitted
    onSubmit = (e) => {
        e.preventDefault();

        const newUser = { 
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.registeruser(newUser, this.props.history);
        
    }

    render() {
        //destructuring the errors variable
        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    error={errors.name}
                                    onChange={this.onChange} />
                                <TextFieldGroup
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.email}
                                    error={errors.email}
                                    info="This site uses gravatar so if you would like a profile image, use a gravitar email"
                                    type="email"
                                    onChange={this.onChange} />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    error={errors.password}
                                    type="password"
                                    onChange={this.onChange} />
                                <TextFieldGroup
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    error={errors.confirmPassword}
                                    type="password"
                                    onChange={this.onChange} />                                
                               
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registeruser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({    
    auth: state.auth, 
    errors: state.errors
});

const mapDispatchToProps = {
    registeruser
}
//Export that the mapStateToProps, along with any actions to be used
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
