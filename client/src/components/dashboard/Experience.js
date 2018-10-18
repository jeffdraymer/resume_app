import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//Used to format Dates
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';


class Experience extends Component {
    onDelete(id){
        this.props.deleteExperience(id);
    }

  render() {
      //loop through the Experience array and grab the required tables
      const experience = this.props.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                  
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> -  
                  {/*If the To date was not specified then display Now else show the date*/}
                  {exp.to === null ? (' Present') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                  
            </td>
            <td><button onClick={this.onDelete.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
        </tr>
      ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Years</th>
                    <th></th>
                </tr>                
                    {experience}
            </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    deleteExperience
}


export default connect(null, mapDispatchToProps)(Experience);