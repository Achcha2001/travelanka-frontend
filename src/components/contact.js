import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';
import baseURL from './baseurl';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}/contact/add`, formData) // Make sure to use the correct backend route here
      .then((response) => {
        console.log(response.data); // Display the response from the backend
        // Reset the form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        alert('Your Message send succesfully!!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        <input id='name'
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input id='email-1'
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input id='subject'
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;
