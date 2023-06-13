import React, { useState } from 'react';
import axios from 'axios';
import './postadd.css';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const travelRef = ref(storage, 'images');

function PostaddForm() {
    const navigate = useNavigate();
  const [district, setDistrict] = useState('');
  const [images, setImages] = useState([]);
  const [accommodationType, setAccommodationType] = useState('');
  const [formData, setFormData] = useState({
    propertyName: '',
    district: '',
    contactNumber: '',
    email: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const fileList = Array.from(e.target.files);
    const selectedImages = fileList.slice(0, 5); // Limit the selection to a maximum of 5 images
    const imageFiles = await Promise.all(
      selectedImages.map(async (file) => {
        const imageRef = ref(storage, `accommodation/${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        return {
          file,
          url: downloadURL,
        };
      })
    );
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.propertyName.trim() === '') {
      newErrors.propertyName = 'Property Name is required';
    }

    if (formData.contactNumber.trim() === '') {
      newErrors.contactNumber = 'Contact Number is required';
    }
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (formData.address.trim() === '') {
      newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log('Form submitted');

      const { propertyName, district, accommodationType, contactNumber, email, address } = formData;

      try {
        const formData = new FormData();
        formData.append('propertyName', propertyName);
        formData.append('district', district);
        formData.append('accommodationType', accommodationType);
        formData.append('contactNumber', contactNumber);
        formData.append('email', email);
        formData.append('address', address);

        const uploadedImageUrls = [];
        for (const image of images) {
          const imageRef = ref(storage, `accommodation/${image.file.name}`);
          await uploadBytes(imageRef, image.file);
          const downloadURL = await getDownloadURL(imageRef);
          uploadedImageUrls.push(downloadURL);
        }
        formData.append('images', uploadedImageUrls.join(','));

        axios
          .post('http://localhost:3000/postadd/add', formData)
          .then((response) => {
            console.log('Response from the backend:', response.data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        setFormData({
          propertyName: '',
          district: '',
          contactNumber: '',
          email: '',
          address: '',
        });
        setDistrict('');
        setAccommodationType('');
        setErrors({});
        alert('Your add will post in another 2h');
        navigate('/');
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return (
    <div className="form1-container">
      <h1 className="post">Post your Add</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="propertyName">
          Registered Name:
          <input
            type="text"
            id="propertyName"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            required
          />
          {errors.propertyName && <p className="error">{errors.propertyName}</p>}
        </label>
        <div className="grid-type-district">
          <label htmlFor="district">District:</label>
          <input
            type="text"
            id="district1"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />

          <label htmlFor="accommodationType">Accommodation Type:</label>
          <input
            type="text"
            id="accommodation1"
            name="accommodationType"
            value={formData.accommodationType}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="contactNumber">
          Contact Number:
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>

        <label htmlFor="address">
          Address:
          <input
            type="text"
            id="address1"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </label>

        <label htmlFor="imageUpload">
          Upload Images (maximum 5 images):
          <div className="image-upload">
            <label htmlFor="uploadInput" className="upload-label">
              <span>+</span> Add Photos
            </label>
            <input
              type="file"
              id="uploadInput"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        </label>

        <div className="image-grid">
          {images.slice(0, 5).map((image, index) => (
            <div className="image-wrapper" key={index}>
              <img
                src={URL.createObjectURL(image.file)}
                alt={`Image ${index + 1}`}
                className="uploaded-image"
              />
            </div>
          ))}
        </div>

        <label>Add a description about the property:</label>
        <textarea
          name="Description"
          placeholder="Maximum 100 words"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostaddForm;
