// src/Login.jsx
import React, { useState } from 'react';
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const Navigate=useNavigate()

let obj={
    email,
    password
}
  const handleLogin = () => {
    if (!email || !password) {
       
        Navigate("/error") 
      } else {
        
        axios.post("https://good-jade-shrimp-wrap.cyclic.app/api/login", obj)
          .then((res) => {
            
            const token=res.data.token
            if(token){
                localStorage.setItem("token",res.data.token)
                Navigate("/blog")
              
            }
           
          
           
          })
       
          .catch((error) => {
            console.error("Registration failed:", error);
           
           Navigate("/error"); // Replace "/error" with the actual path to your error page
          });
      }
   
    
  };
  

const handleclick=()=>{
Navigate('/register')
}
  

  return (
  <div className='main'>
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
      />
      <button className='login' onClick={handleLogin}>Login</button>
      <hr />
      <button onClick={handleclick}  style={{color:"black"}} className="register">Register</button>
    </div>
    </div>
   
  );
}

export default Login;
