import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutuser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutuser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Experience</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Technologies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Education</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Contact</Link>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img className='rounded-circle'
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You must have a gravitar connected to your email to display an image" />
                        {' '}
                        Logout
                </a>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Experience</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Technologies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Education</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">Contact</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">My React App</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles"> Developers
                            </Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}

                    </div>
                </div>
            </nav>
        )
    }
}


Navbar.propTypes = {
    logoutuser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    logoutuser,
    clearCurrentProfile
}

//Export that the mapStateToProps, along with any actions to be used
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);