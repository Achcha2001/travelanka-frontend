import React, { useState } from 'react';
import axios from 'axios';
import './guideregister.css';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDJq-SNfcd7XB-jFKrPXhI_ZYmkEJ1Uopw",
  authDomain: "travelanka-7f736.firebaseapp.com",
  projectId: "travelanka-7f736",
  storageBucket: "travelanka-7f736.appspot.com",
  messagingSenderId: "743575272700",
  appId: "1:743575272700:web:e01c0eb92cea7dfe102b79",
  measurementId: "G-FVN21BYE3E"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function GuideregistrationForm() {
  let navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [languageSkills, setLanguageSkills] = useState(['']);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [validity, setValidity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImage] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errmsg1, setErrmsg1] = useState('');
  const [errmsg2, setErrmsg2] = useState('');
  const [errmsg3, setErrmsg3] = useState('');
  const [errmsg4, setErrmsg4] = useState('');
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageFile = URL.createObjectURL(file);
    setImage((prevImages) => [...prevImages, imageFile]);
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    const validContactNumber = /^\d{10}$/;

    if (validContactNumber.test(value)) {
      setContactNumber(value);
      setErrmsg2('');
    } else {
      setContactNumber('');
      setErrmsg2('Invalid contact number');
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      fullName === '' ||
      age ===''||
      email === '' ||
      contactNumber === '' ||
      username === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setErrmsg1('Please fill in all fields');
      return;
    } else if (password !== confirmPassword) {
      setErrmsg3('Passwords do not match');
      return;
    } else if (!/^\d{10}$/.test(contactNumber)) {
      setErrmsg4('Invalid contact number format');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('age', age);
      formData.append('languageSkills', JSON.stringify(languageSkills));
      formData.append('registrationNumber', registrationNumber);
      formData.append('validity', validity);
      formData.append('contactNumber', contactNumber);
      formData.append('category', category);
      formData.append('image', images);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
  
      // Upload image to Firebase Storage
const image = images[0]; 

const imageRef = ref(storage, `accommodation/${image.name}`);
await uploadBytes(imageRef, image);
const downloadURL = await getDownloadURL(imageRef);

formData.append('image', downloadURL);



      await axios.post('http://localhost:3000/guide/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form fields after successful submission
      setFullName('');
      setAge('');
      setLanguageSkills(['']);
      setRegistrationNumber('');
      setValidity('');
      setContactNumber('');
      setCategory('');
      setImage([]);
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setErrmsg1('');
      navigate('/payment');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddLanguageSkill = () => {
    setLanguageSkills([...languageSkills, '']);
  };

  const handleLanguageSkillChange = (index, value) => {
    const updatedSkills = [...languageSkills];
    updatedSkills[index] = value;
    setLanguageSkills(updatedSkills);
  };

  // const handleImageChange = (e) => {
  //   const fileList = Array.from(e.target.files);
  //   const imageFiles = fileList.map((file) => URL.createObjectURL(file));
  //   setImage((prevImages) => [...prevImages, ...imageFiles]);
  // };

  return (
    <div className='para'>
      <div className='chop1'>
        <p>Welcome to the Tour Guide Registration Portal, your gateway to becoming a certified tour guide and unlocking exciting opportunities in the tourism industry. Our portal is specifically designed to simplify the registration process and connect aspiring tour guides with travelers from around the globe.</p>
        <p>Are you passionate about sharing your knowledge and love for your city or region? Do you have a knack for storytelling and a desire to showcase the hidden treasures of your area? Look no further than our Tour Guide Registration Portal.</p>
      </div>
      <div className='container'>
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-grid'>
            <div>
              <label className='label-container'>Enter Your Full Name:</label>
              <input id='fname' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className='first-grid-view'>
              <div>
                <label className='label-container'>Age:</label>
                <input id='age' type="number" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div>
                <label className='label-container'>Language Skills:</label>
                {languageSkills.map((skill, index) => (
                  <div key={index}>
                    <input
                      className='lskills'
                      type="text"
                      value={skill}
                      onChange={(e) => handleLanguageSkillChange(index, e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddLanguageSkill}>+</button>
              </div>
            </div>
            <div>
              <label className='label-container'>Registration Number:</label>
              <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
            </div>
            <div>
              <label className='label-container'>Validity:</label>
              <input type="date" value={validity} onChange={(e) => setValidity(e.target.value)} />
            </div>
            <div>
              <label className='label-container'>Contact Number:</label>
              <input type="number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </div>
            <div>
            <label className='label-container'>Guide Type:</label>
<div>
  <input className='cat' type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter guide type" />
</div>

            </div>
            <br />
            <div>
            <label className='label-container'>Upload Image:</label>
  <input type="file" onChange={handleImageUpload} />
  
    <div className="image-grid">
    {images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} />))}
    </div>
  
            </div>
            <div>
              <label className='label-container'>E-mail:</label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div id='uname'>
              <label className='uname'>Create a User Name</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className='label-container'>Create a password</label>
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <label className='label-container'>Confirm the password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <label className='err'>{errmsg1}</label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default GuideregistrationForm;
