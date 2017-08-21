import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">REDUX CARDS</Link>
            <NavMenu authenticated={this.props.authenticated} />
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({ currentUser }) {
  const { authenticated } = currentUser;
  return {
    authenticated
  };
}

export default connect(mapStateToProps)(Header);
