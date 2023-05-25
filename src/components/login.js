import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';


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
    if (name.valueOf() === '' || password.valueOf() === '') {
        setErrorMessage('Please fill in all fields');
        
        
      } else {
        setErrorMessage('');
     
     console.log('Logged in:', name, password);
     alert('welcome',name);
     // Clear input fields
     setName('');
     setPassword('');
     //re-direct to the homepage
     navigate("/");
   }
 }
  

  const handleSignup = () => {
    // Redirect to signup page or perform signup logic here
    console.log('Redirecting to signup page...');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div>
       
        <label htmlFor="name">Name:</label>
        <input className='red'  type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input className='red' type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <label className='err-msg'>{errorMessage}</label>
      <button onClick={handleLogin}> <a className='sb' href='#' >Login </a></button>
      <p className='signpara'>Dont you have an account?<br/> Click signup </p>
      <button  onClick={handleSignup}><a className='sb' href='/signup' > Signup </a></button>
    </div>
  );
}

export default LoginPage;
