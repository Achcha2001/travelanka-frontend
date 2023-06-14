import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from './baseurl';

function LoginPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (name.trim() === '' || password.trim() === '') {
      setErrorMessage('Please fill in all fields');
    } else {
      setErrorMessage('');

      // Send login data to the backend for validation
      axios
        .post(`${baseURL}/login/add`, {
          name,
          password,
        })
        .then((response) => {
          // Check if the login was successful
          if (response.data.success) {
            // Login successful
            console.log('Login successful');
            alert('Welcome, ' + name);
            // Clear input fields
            setName('');
            setPassword('');
            // Redirect to the homepage or any other authenticated page
            navigate('/');
          } else {
            // Login failed
            setErrorMessage('Invalid username or password');
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
          setErrorMessage('An error occurred while logging in');
        });
    }
  };

  const handleSignup = () => {
    // Redirect to signup page or perform signup logic here
    console.log('Redirecting to signup page...');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          className="red"
          type="text"
          id="name-login"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          className="red"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <label className="err-msg">{errorMessage}</label>
      <button onClick={handleLogin}>
        <a className="sb" href="#">
          Login
        </a>
      </button>
      <p className="signpara">
        Don't you have an account?
        <br /> Click signup
      </p>
      <button onClick={handleSignup}>
        <a className="sb" href="/signup">
          Signup
        </a>
      </button>
    </div>
  );
}

export default LoginPage;
