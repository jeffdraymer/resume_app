import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Component will verify that the user is logged in with valid authentication
//Before allowing the Route to be accessed
const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route 
        {...rest}
        render = {props => 
            auth.isAuthenticated === true ? (                
                <Component {...props} />
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
)

PrivateRoute.protoTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);