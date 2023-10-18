import React, { useState } from 'react';
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserBlog from './UserBlog';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const Navigate = useNavigate();

  const obj = {
    email,
    password
  }

  const isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const handleLogin = () => {
    try {
      if (!email || !password) {
        setMessage('Please enter both email and password.');
        setMessageColor('red');
      }  else {
        localStorage.setItem("email", email);
        axios.post("https://good-jade-shrimp-wrap.cyclic.app/api/login", obj)
          .then((res) => {
            const token = res.data.token;
            if (token) {
              localStorage.setItem("token", res.data.token);
              setMessage('Login successful!');
              setMessageColor('green');
              Navigate("/blog");
            }
          })
          .catch((error) => {
            console.error("Login failed:", error);
            setMessage('Login failed. Please check your email and password.');
            setMessageColor('red');
          });
      }
    } catch (error) {
      Navigate("/error")
    }
  };

  const handleclick = () => {
    Navigate('/register');
  }

  const handlePasswordFocus = () => {
    if (!isEmailValid(email)) {
     setMessage("Email is not valid")

    }else{
      setMessage("")
    }
    
  }
  
  
  
  

  return (
   
      <div className="login-container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
         
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handlePasswordFocus} // Add this line
        />
        <button className='login' onClick={handleLogin}>Login</button>
        <p style={{ color: messageColor }}>{message}</p>
        <hr />
        <button onClick={handleclick} style={{ color: "black" }} className="register">Register</button>
      </div>
   
  );
}

export default Login;
