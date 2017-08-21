import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputText from '../fields/InputText';
import { signupUser } from '../../actions/actionsUser';

class Signup extends Component {
  handleFormSubmit(values) {
    this.props.signupUser(values, () => {
      this.props.history.push('/');
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field label="Email" type="email" name="email" component={InputText} />
        <Field label="Username" type="text" name="username" component={InputText} />
        <Field label="Password" type="password" name="password" component={InputText} />
        <Field label="Confirm Password" type="password" name="passwordConfirm" component={InputText} />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // Inspect and validate the inputs from 'values'
  if (!values.email) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.username) {
    errors.username = 'Please enter a username';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps({ currentUser }) {
  return { errorMessage: currentUser.error };
}

export default connect(mapStateToProps, { signupUser })(
  reduxForm({
    validate,
    form: 'userSignupForm'
  })(Signup)
);
