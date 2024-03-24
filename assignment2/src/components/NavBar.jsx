import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/" className="title">
        Conway's Game Of Life
      </Link>
      <ul>
        <CustomLink to="/game">Game Of Life</CustomLink>
        <CustomLink to="/credits">Credits</CustomLink>
      </ul>
    </nav>
  );
};

function CustomLink({to, children, ...props}) {
  const path = window.location.pathname
  return (
    <li className={ path === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
  
}

export default Navbar;
