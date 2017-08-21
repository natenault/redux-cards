import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = ({ authenticated }) => {
  if (authenticated) {
    return (
      <ul className="nav">
        <li className="nav-item">
          <NavLink to="/collections" className="nav-link">Collections</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signout" className="nav-link">Sign Out</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <ul className="nav">
      <li key="signin" className="nav-item">
        <NavLink to="/signin" className="nav-link">Sign In</NavLink>
      </li>
      <li key="signup" className="nav-item">
        <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
