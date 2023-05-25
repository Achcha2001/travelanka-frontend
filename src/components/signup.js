import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
const navigate=useNavigate();

  function handleSignup(event) {
    event.preventDefault();
   if(name.valueOf()===''||email.valueOf()===''||contactNumber.indexOf()===''||password.valueOf()===''){
    setErrorMessage1('Please fill in all fields');
   }else if(password.valueOf()!==confirmPassword){
  setErrorMessage2('Please re-enter the password')
    
   }
   else{

    // Perform signup logic here
    console.log('Signup:', name, email, contactNumber, password, confirmPassword);
    alert(`Welcome to travelanka `);

    // Clear input fields
    setName('');
    setEmail('');
    setContactNumber('');
    setPassword('');
    setConfirmPassword('');
    //re-derecting to home page
    navigate("/");

  }}

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label className='lbl'>
          Name:
          <input type="text" className='inp' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className='lbl'>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className='lbl'>
          Contact Number:
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </label>
        <label className='lbl'>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className='lbl'>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <label className='er-sign'>{errorMessage2}</label>
        </label>
        <label className='er-sign'>{errorMessage1}</label>
        <button type="submit"> Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
