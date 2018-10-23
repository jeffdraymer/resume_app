import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

//import ProfileActions from './ProfileActions';

import Spinner from '../common/Spinner';
import Experience from './Experience';
import Education from './Education';
import Technology from './Technology';
import AddEducation from '../add-credentials/AddEducation';
import AddExperience from '../add-credentials/AddExperience';
import AddTechnology from '../add-credentials/AddTechnology';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayEducation: false,
      displayExperience: false,
      displayTechnology: false
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { displayEducation, displayExperience, displayTechnology } = this.state;

    let dashboardContent;
    let educationFields;
    let experienceFields;
    let technologyFields;

    if (displayEducation) {
      educationFields = <AddEducation />;
    }
    if (displayExperience) {
      experienceFields = <AddExperience />;
    }
    if (displayTechnology) {
      technologyFields = <AddTechnology />;
    }

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
            {/*<ProfileActions />*/}
            <Experience experience={profile.experience} />
            <div className="mb-3">
              <button type="button" onClick={() => {
                this.setState(prevState => ({
                  displayExperience: !prevState.displayExperience
                }))
              }} className="btn btn-light">
                Add Experience
                </button>
            </div>
            {experienceFields}
            <Education education={profile.education} />
            <div className="mb-3">
              <button type="button" onClick={() => {
                this.setState(prevState => ({
                  displayEducation: !prevState.displayEducation
                }))
              }} className="btn btn-light">
                Add Education
                </button>
            </div>
            {educationFields}
            <Technology technology={profile.technology} />
            <div className="mb-3">
              <button type="button" onClick={() => {
                this.setState(prevState => ({
                  displayTechnology: !prevState.displayTechnology
                }))
              }} className="btn btn-light">
                Add Technology
                </button>
              {technologyFields}
            </div>
            <div style={{ marginBottom: '60px' }}>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Acccount</button>
            </div>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet created a profile. Please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
        </div>
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);