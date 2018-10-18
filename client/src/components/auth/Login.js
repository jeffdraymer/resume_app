import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';

import { loginuser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',      
      password: '',
      errors: {}
    }
    //Updated functions to use arrow notation so no longer need to bind the data
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }
   //Will check if the user is already logged in and if so it will route to the dashboard
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    } 
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  //When user updates field on the page, will set the current state to the entered values
  onChange = (e) =>  {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const user =  {     
      email: this.state.email,
      password: this.state.password      
    }

   this.props.loginuser(user, this.props.history);
  }

  render() {
const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="Email Address" 
                  name="email"
                  value={this.state.email}
                  error={errors.email} 
                  type="email"
                  onChange={this.onChange} />
                
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  error={errors.password}
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

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = {
  loginuser
}

//Export that the mapStateToProps, along with any actions to be used
export default connect(mapStateToProps, mapDispatchToProps)(Login);
