import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleLogout = () => {
    
    localStorage.removeItem("token")
    navigate("/login")
  };

  return (
    <div className="navbar">
      <ul>
        {token ? (
         
          <>
            <li style={{marginTop:"10px"}} >
              <Link to="/blog">Blog</Link>
            </li>
            <li style={{color:"teal"}} className='blog'>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
