import React, { useState, useEffect } from 'react';
import './Payment.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import baseURL from './baseurl';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [submitText, setSubmitText] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    if (purpose === 'accommodation') {
      setSubmitText('Pay Now - Rs. 3000');
    } else if (purpose === 'tourguide') {
      setSubmitText('Pay Now - Rs. 2000');
    } else {
      setSubmitText('Pay Now');
    }
  }, [purpose]);

  const handlePaymentSuccess = () => {
    // Payment successful logic here
    setPaymentCompleted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the payment object to be sent to the backend
    const paymentData = {
      amount: purpose === 'accommodation' ? '3000' : '2000',
      name: cardholderName,
      cardNumber: cardNumber,
      cvv: cvv,
    };

    // Send a POST request to the backend endpoint
    axios.post(`${baseURL}/pay/add`, paymentData)
      .then((response) => {
        console.log(response.data); // Handle the response from the backend
        // Perform any necessary actions after successful payment creation
        handlePaymentSuccess();
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  return (
    <div className="container">
      <h2>Payment Details</h2>
      {!paymentCompleted ? (
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="text"
              id="card-number"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div id="exp-cvv">
            <div className="input-field">
              <label htmlFor="expiry">Expiry Date:</label>
              <input
                type="date"
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                placeholder="Enter CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="name">Cardholder Name:</label>
            <input
              type="text"
              id="name-pay"
              placeholder="Enter cardholder name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="purpose">Select Purpose:</label>
            <select
              id="purpose"
              value={purpose}
              onChange={handlePurposeChange}
              required
            >
              <option value="">Select Purpose</option>
              <option value="accommodation">Accommodation</option>
              <option value="tourguide">Tour Guide</option>
            </select>
          </div>
          <button className="btn" type="submit">{submitText}</button>
        </form>
      ) : (
        <div className="payment-success">
          <h3>Payment Successful!</h3>
          <p>Thank you for your payment.</p>
        </div>
      )}
      {purpose && !paymentCompleted && (
        <PayPalScriptProvider options={{ 'client-id': 'YOUR_PAYPAL_CLIENT_ID' }}>
          <PayPalButtons
            style={{ layout: 'horizontal' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: purpose === 'accommodation' ? '3000' : '2000',
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                console.log(details); // Handle the captured payment details
                handlePaymentSuccess();
              });
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default Payment;
