// import React from 'react';
// import { useLocation } from 'react-router-dom';
 import './results.css';
// function SearchResultsPage() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const query = searchParams.get('query');
//   const category = searchParams.get('category');
//   const results = searchParams.get('results');
//   const searchResults = JSON.parse(decodeURIComponent(results));
//   // Perform your search logic here
//   // You can query the database or use any other data source

//   // If the query is "colombo" and the category is "category1" (economical), display custom data
//   // Otherwise, display data from the database

//   return (
//     <div className="search-results-container">
//      
//       <h2>Search Results</h2>
//       <p>Query: {query}</p>

//       {searchResults.length > 0 ? (
//         <div>
//           {searchResults.map((result) => (
//             <div key={result.id}>
//               <h3>{result.name}</h3>
//               <p>Location: {result.location}</p>
//               <p>Category: {result.category}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// }

// export default SearchResultsPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const results = searchParams.get('results');

  const [accommodationResults, setAccommodationResults] = useState([]);
  const [activeTab, setActiveTab] = useState('accommodation');
  const [paragraphWords, setWords] = useState([]);
  const paragraph = '  Welcome to Travelanka, your ultimate search results portal for hotels and hotel details in Sri Lanka! Whether you\'re planning a tropical getaway or a business trip, we\'ve got you covered with a vast selection of accommodations to suit every preference and budget. Our intuitive search engine instantly fetches the most relevant and up-to-date results, allowing you to browse through a wide range of hotels, from luxurious resorts to cozy boutique options. Each listing provides comprehensive details, including room types, amenities, rates, and guest reviews, empowering you to make informed decisions before making a reservation. With Travelanka, your dream stay in Sri Lanka is just a click away, ensuring that your travel experience is memorable and hassle-free.';

  useEffect(() => {
    if (results) {
      const decodedResults = decodeURIComponent(results);
      setAccommodationResults(JSON.parse(decodedResults));
    } else {
      fetchAccommodationResults();
    }
  }, [results]);

  useEffect(() => {
    if (activeTab === 'accommodation') {
        const wordsArray = paragraph.split(' ');
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex < wordsArray.length) {
            setWords((prevWords) => [...prevWords, wordsArray[currentIndex]]);
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 200);

      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const fetchAccommodationResults = () => {
    if (query.trim() === '') return;

    axios
      .get(`http://localhost:3000/postadd/get?query=${query}`)
      .then((response) => {
        const searchResults = response.data;
        setAccommodationResults(searchResults);
      })
      .catch((error) => {
        console.error('Error:', error);
        
      });
  };

  const transportationResults = [
    {
        _id: '1',
        providerName: 'Sri Lanka Taxi Service',
        district: 'Colombo',
        contactNumber: '+94 112345678',
        imageUrl: '../images/sl-taxi.jpeg',
        price: 'Starting from $50 per day',
      },
      {
        _id: '2',
        providerName: 'Tuk Tuk Rides',
        district: 'Kandy',
        contactNumber: '+94 7788996655',
        imageUrl: '../images/tuk-tuk.jpeg',
        price: 'Starting from $10 per hour',
      },
      {
        _id: '3',
        providerName: 'Luxury Car Rentals',
        district: 'Galle',
        contactNumber: '+94 777888999',
        imageUrl: 'luxury-car-rentals.jpg',
        price: 'Starting from $150 per day',
      },
      {
        _id: '4',
        providerName: 'Jetwing Travels',
        district: 'Colombo',
        contactNumber: '+94 1122334455',
        imageUrl: '../images/jetwing-travels.jpeg',
        price: 'Customized packages available',
      },
      {
        _id: '5',
        providerName: 'Aitken Spence Travels',
        district: 'Negombo',
        contactNumber: '+94 777555666',
        imageUrl: '../images/aitken-spence.jpeg',
        price: 'Starting from $200 per day',
      },
      {
          _id: '6',
          providerName: 'Ceylon Bike Rentals',
          district: 'Nuwara Eliya',
          contactNumber: '+94 777222333',
          imageUrl: '../images/ceylon-bike-rentals.jpeg',
          price: 'Starting from $15 per day',
        },
       
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src="../images/main-site.mp4" type="video/mp4" />
        </video>

        {activeTab === 'accommodation' && (
          <p className='mainpara'>
            {paragraphWords.map((word, index) => (
              <span id='main-par' key={index}>{word} </span>
            ))}
          </p>
        )}
      </div>
      <div className='middle'>
      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'accommodation' ? 'active' : ''}`}
          onClick={() => handleTabChange('accommodation')}
        >
          Accommodation
        </button>
        <button
          className={`tab ${activeTab === 'transportation' ? 'active' : ''}`}
          onClick={() => handleTabChange('transportation')}
        >
          Transportation
        </button>
      </div>
      
      <h2>Search Results</h2>
      <p>Location: {query}</p>
      

      {activeTab === 'accommodation' ? (
        accommodationResults.length > 0 ? (
          <div className="grid-cont">
            {accommodationResults.map((result) => (
              <div className="square" key={result._id}>
              <img className="square-image" src={result.imageUrl} alt={result.providerName} />
              <h3 className="square-title">{result.registeredName}</h3>
              <p className="square-info">Location: {result.district}</p>
              <p className="square-info">Accommodation Type: {result.accommodationType}</p>
              <p className="square-info">Contact Number 1: {result.contactNumber1}</p>
              <p className="square-info">Contact Number 2: {result.contactNumber2}</p>
            </div>
            ))}
          </div>
        ) : (
          <p><h1>No accommodation results found.</h1></p>
        )
      ) : (
        <div className="grid-cont">
          {transportationResults.map((result) => (
            <div className="square" key={result._id}>
              <img className="square-image" src={result.imageUrl} alt={result.providerName} />
              <h3 className="square-title">{result.providerName}</h3>
              <p className="square-info">Location: {result.district}</p>
              <p className="square-info">Contact Number: {result.contactNumber}</p>
              <p className="square-info">Price: {result.price}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
