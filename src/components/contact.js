import React, { useState } from 'react';
import './Contact.css';

function ContactForm() {
  return(
  
    <div className="form-container">
    
    <form>
    <h1>Contact Us</h1>
    <input placeholder="Name"/>
    <input placeholder="Email"/>
    <input placeholder="Subject"/>
    <textarea placeholder="Message" rows="4"></textarea>
    <button>Send Message</button>

    </form>
    </div>

)
}

export default ContactForm;