import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//Used to format Dates
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';


class Education extends Component {
    onDelete(id) {
        this.props.deleteEducation(id);
    }

    render() {
        //loop through the Education array and grab the required tables
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.certification}</td>
                <td>{edu.fieldOfStudy}</td>
                <td>

                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                  {/*If the To date was not specified then display Now else show the date*/}
                    {edu.to === null ? (' Present') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}

                </td>
                <td><button onClick={this.onDelete.bind(this, edu._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ));

        return (
            <div>
                <h4 className="mb-4">Education History</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Certification</th>
                            <th>Field of Study</th>
                            <th>Years</th>
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    deleteEducation
}


export default connect(null, mapDispatchToProps)(Education);