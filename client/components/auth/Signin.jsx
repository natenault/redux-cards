import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import InputText from '../fields/InputText';
import { signinUser } from '../../actions/actionsUser';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password }, () => {
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
        <Field label="Password" type="password" name="password" component={InputText} />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return { errorMessage: currentUser.error };
}

export default connect(mapStateToProps, { signinUser })(
  reduxForm({
    form: 'userSigninForm'
  })(Signin)
);
