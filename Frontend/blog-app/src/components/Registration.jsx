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
  const navigate = useNavigate();

  const [alrt, setAlrt] = useState("");
  const [msg, setMsg] = useState("");
  const [blankFieldMsg, setBlankFieldMsg] = useState(""); // Message for blank fields
  const [invalidEmailMsg, setInvalidEmailMsg] = useState(""); // Message for invalid email format

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the messages
    setBlankFieldMsg("");
    setInvalidEmailMsg("");
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the form fields are empty
    if (!formData.username || !formData.email || !formData.password) {
      setBlankFieldMsg("Please fill in all fields");
    } else if (!isEmailValid(formData.email)) {
      setInvalidEmailMsg("Invalid email format");
    } else {
      // Clear the messages
      setBlankFieldMsg("");
      setInvalidEmailMsg("");

      axios.post("https://good-jade-shrimp-wrap.cyclic.app/api/register", formData)
        .then((res) => {
          console.log(res.data);
          setAlrt(res.data.message);
          speakNotification(res.data.message);
          navigate("/login");
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
  };

  const handleclick = () => {
    navigate("/login");
  }
  
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
 


  return (
   
      <div className="registration-container">
     
    
        <form onSubmit={handleSubmit}>
        <h2 >Register Form</h2>
          <div >
            <label htmlFor="username">Username:</label>
            <br />
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
            <br />
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
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='password'
            />
          </div>
          {blankFieldMsg && <p style={{ color: 'red' }}>{blankFieldMsg}</p>}
          {invalidEmailMsg && <p style={{ color: 'red' }}>{invalidEmailMsg}</p>}
          {alrt && <p>{alrt}</p>}
          <div className='om'>
          <button type="submit">Register</button>
          <button onClick={handleclick} style={{"color": 'teal'}} type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
   
  );
}

export default Registration;
