import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactnumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      contactnumber.trim() === '' ||
      password.trim() === ''
    ) {
      setErrorMessage('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setErrorMessage('Please re-enter the password');
    } else {
      setErrorMessage('');

      // Send signup data to the backend
      axios
        .post('http://localhost:3000/signuptourist/add', {
          name,
          email,
          contactnumber,
          password,
        })
        .then((response) => {
      
          
          
        
            console.log('signup successful')
            alert('Welcome to Travelanka');
            // Clear input fields
            setName('');
            setEmail('');
            setContactNumber('');
            setPassword('');
            setConfirmPassword('');
            // Redirect to the homepage or any other authenticated page
            navigate('/');
          
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
          setErrorMessage('An error occurred while signing up');
        });
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label className="lbl">
          Name:
          <input type="text" className="inp" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="lbl">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="lbl">
          Contact Number:
          <input type="text" value={contactnumber} onChange={(e) => setContactNumber(e.target.value)} />
        </label>
        <label className="lbl">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="lbl">
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        </label>
        <label className="er-sign">{errorMessage}</label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
