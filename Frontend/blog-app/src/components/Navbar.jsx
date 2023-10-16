import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
  
    const token=localStorage.getItem("token")

  return (
    <div className="navbar">
      <ul>
        
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          
            {
              token? <Link to="/blog">Blog</Link>: <Link to="/login">Login</Link>  
            }
          
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
