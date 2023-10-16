import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
