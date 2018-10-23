import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTechnology } from '../../actions/profileActions';

class Technology extends Component {
    onDelete(id) {
        this.props.deleteTechnology(id);
    }
    render() {
        //If a tech exists in the DB then map through the array and retrieve the values
        const technology = this.props.technology.map(tech => (
            <tr key={tech._id}>
                <td>{tech.techName}</td>
                <td>{tech.level}</td>
                <td>{tech.description}</td>
                <td><button onClick={this.onDelete.bind(this, tech._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ));
        //Creating the base template for each technology
        return (
            <div>
                <h4 className="mb-4">Technologies</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Techology</th>
                            <th>Level</th>
                            <th>Description</th>
                        </tr>
                        {technology}
                    </thead>
                </table>

            </div>
        )
    }
}

Technology.propTypes = {
    deleteTechnology: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    deleteTechnology
}

export default connect(null, mapDispatchToProps)(Technology);
