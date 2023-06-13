import React, { useState } from 'react';
import './accregister.css';
import axios from 'axios';
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

function AccommodationRegistrationForm() {
  let navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactNumber1, setContactNumber1] = useState('');
  const [contactNumber2, setContactNumber2] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [district, setDistrict] = useState('');
  const [accommodationType, setAccommodationType] = useState('');
  const [registeredName, setRegisteredName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [errmsg1, setErrmsg1] = useState('');
  const [errmsg2, setErrmsg2] = useState('');
  const [errmsg3, setErrmsg3] = useState('');

  const handleImageUpload = (e) => {
    const fileList = Array.from(e.target.files);
    const imageFiles = fileList.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    const validContactNumber = /^\d{10}$/;

    if (validContactNumber.test(value)) {
      setContactNumber(value);
      setErrmsg3('');
    } else {
      setContactNumber('');
      setErrmsg3('Invalid contact number');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      fullName === '' ||
      email === '' ||
      contactNumber === '' ||
      username === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setErrmsg1('Please fill in all fields');
      return;
    } else if (password !== confirmPassword) {
      setErrmsg2('Passwords do not match');
      return;
    } else if (!/^\d{10}$/.test(contactNumber)) {
      setErrmsg3('Invalid contact number format');
      return;
    }

    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('contactNumber', contactNumber);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('district', district);
      formData.append('accommodationType', accommodationType);
      formData.append('registeredName', registeredName);
      formData.append('address', address);
      formData.append('description', description);
      formData.append('contactNumber1', contactNumber1);
      formData.append('contactNumber2', contactNumber2);

      // Upload images to Firebase Storage
      const uploadedImageUrls = [];
      for (const image of images) {
        const imageRef = ref(storage, `accommodation/${image.name}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        uploadedImageUrls.push(downloadURL);
      }
      formData.append('images', uploadedImageUrls.join(','));

      // Send the form data to the backend API
      await axios.post('http://localhost:3000/accommodation/add', formData);

      // Reset form fields and display success message
      setFullName('');
      setEmail('');
      setContactNumber('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setDistrict('');
      setAccommodationType('');
      setRegisteredName('');
      setAddress('');
      setDescription('');
      setImages([]);
      setErrmsg1('');
      setErrmsg2('');
      setErrmsg3('');
      setContactNumber1('');
      setContactNumber2('');

      // Redirect to the desired page
      navigate('/payment');
    } catch (error) {
      // Handle the error
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='paraacc'>
        <p id='para1acc'>
          <span>Welcome to our Accommodation Registration Portal! </span>Experience the joy of sharing your unique
          space with travelers from around the world. Our portal provides a seamless platform to showcase your
          accommodations and connect with eager explorers. Join our community and unlock the door to unforgettable
          stays, positive reviews, and endless opportunities. Let your accommodation be a home away from home for
          every wanderer. Start your registration journey today and embark on a rewarding hosting adventure...!
        </p>
      </div>
      <div className='container-a'>
        <h2 className='accr'>Accommodation Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <section className='section'>
            <h3>Accommodator Details</h3>
            <div className='form-group'>
              <label htmlFor='fullName'>Full Name:</label>
              <input
                type='text'
                id='fullName'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='contactNumber'>Contact Number:</label>
              <input
                type='tel'
                id='contactNumber'
                value={contactNumber}
                onChange={handleContactNumberChange}
              />
            </div>
            <label className='err'>{errmsg3}</label>
            <div className='form-group'>
              <label htmlFor='username'>Create a User Name:</label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Create a Password:</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Your Password:</label>
              <input
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <label className='err'>{errmsg2}</label>
          </section>
          <section className='section'>
            <h3>Accommodation Details</h3>
            <div id='emerg'>
              <div className='form-group'>
                <label htmlFor='district'>District:</label>
                <input
                  type='text'
                  id='district1'
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='accommodationType'>Accommodation Type:</label>
                <input
                  type='text'
                  id='accommodation1'
                  value={accommodationType}
                  onChange={(e) => setAccommodationType(e.target.value)}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='registeredName'>Registered Name:</label>
              <input
                type='text'
                id='registeredName'
                value={registeredName}
                onChange={(e) => setRegisteredName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address:</label>
              <textarea
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description:</label>
              <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='images'>Add Images:</label>
              <input
                type='file'
                id='images'
                name='images'
                multiple
                onChange={handleImageUpload}
              />
            </div>
            <div className='images-grid'>
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
          </section>
          <div className='contgrid'>
            <div className='form-group'>
              <label htmlFor='contactNumber1'>Contact Number 1:</label>
              <input
                type='tel'
                id='contactNumber1'
                value={contactNumber1}
                onChange={(e) => setContactNumber1(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='contactNumber2'>Contact Number 2:</label>
              <input
                type='tel'
                id='contactNumber2'
                value={contactNumber2}
                onChange={(e) => setContactNumber2(e.target.value)}
              />
            </div>
          </div>
          <label className='err'>{errmsg1}</label>
          <button className='acc-reg' type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
}

export default AccommodationRegistrationForm;
