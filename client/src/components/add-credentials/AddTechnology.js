import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//Addtional required components
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

//Import action functions
import { addTechnology } from '../../actions/profileActions';

class AddTechnology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            techName: '',
            level: '',
            description: '',
            errors: {}
        }
        //bind the functions to the state
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componetWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Assign the state values to an object and pass it to the profile action
    onSubmit(e) {
        e.preventDefault();
        const techData = {
            techName: this.state.techName,
            level: this.state.level,
            description: this.state.description
        }

        this.props.addTechnology(techData);
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="addTechnology">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <small className="d-block pb-3">* = Required Fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Technology"
                                    name="techName"
                                    value={this.state.techName}
                                    onChange={this.onChange}
                                    error={errors.techName}
                                />
                                <TextFieldGroup
                                    placeholder="* Level"
                                    name="level"
                                    value={this.state.level}
                                    onChange={this.onChange}
                                    error={errors.level}
                                />
                                <TextAreaFieldGroup
                                    placeholder="Experience Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="What projects have you used this tech for?"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4 mb-3" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddTechnology.propTypes = {
    addTechnology: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

const mapDispatchToProps = {
    addTechnology
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddTechnology));