import React, { useState } from 'react';
import axios from 'axios';
import Speech from 'react-speech';
import "./Registration.css"
import { Navigate, useNavigate } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate=useNavigate()

  const [alrt,setalrt]=useState("")
  const [msg,setMsg]=useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if the form data is empty
    if (!formData.username || !formData.email || !formData.password) {
      // Navigate to the error page
      navigate("/error") 
    } else {
     
      axios.post("https://good-jade-shrimp-wrap.cyclic.app/api/register", formData)
        .then((res) => {
          console.log(res.data);
          setalrt(res.data.message);
          speakNotification(res.data.message);
          navigate("/login")
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          
         navigate("/error");
        });
    }
  };
  
  
  
  
  
  

  const speakNotification = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
    alert(`${alrt}`)





    
    

  
  };
  const handleclick=()=>{
navigate("/login")
  }

  return (
    <div className='main'>
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder='username'
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='email'
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='password'
          />
        </div>
        <button type="submit">Register</button>
        <button onClick={handleclick} style={{"color":'teal'}} type="submit" className="login-button">Login</button>

      
      </form>
      
    </div>
    </div>
  );
}

export default Registration;
