import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tourguides.css';

function TourGuideList() {
  const [tourGuides, setTourGuides] = useState([]);
  const [words, setWords] = useState([]);

  const paragraph =
    ' Welcome to the tour guide section of Travelanka, where we pride ourselves on providing an exceptional travel experience. With our unwavering commitment to excellence, we offer you a seamless journey through the mesmerizing landscapes and rich cultural heritage of Sri Lanka. Our highly knowledgeable and passionate tour guides ensure that every aspect of your trip is meticulously planned and executed, leaving no stone unturned. From historical landmarks to hidden gems, we curate immersive itineraries that capture the essence of this enchanting island. Trust us to deliver unparalleled service, where every detail is thoughtfully crafted to exceed your expectations. Embark on an unforgettable adventure with Travelanka and discover the true essence of Sri Lanka.';

  useEffect(() => {
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

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetchTourGuides();
  }, []);

  const fetchTourGuides = async () => {
    try {
      const response = await axios.get('http://localhost:3000/guide/get');
      setTourGuides(response.data);
    } catch (error) {
      console.error('Error fetching tour guides:', error);
    }
  };

  return (
    <div>
      <div className="video-background1">
        <video autoPlay loop muted>
          <source src="../images/tourguide-back.mp4" type="video/mp4" />
        </video>
        <div className="paragraph1">
          <p id='tour-p1'>
            {words.map((word, index) => (
              <span id='white' key={index}>{word} </span>
            ))}
          </p>
        </div>
      </div>
      <h2 className='guides1'>Tour Guides</h2>
      <div className="tour-guide1">
        {tourGuides.map((tourGuide) => (
          <div key={tourGuide._id}>
            <h3>{tourGuide.fullname}</h3>
            <p>Age: {tourGuide.age}</p>
            <p>
              Language Skills:{' '}
              {Array.isArray(tourGuide.language)
                ? tourGuide.language.join(', ')
                : tourGuide.language}
            </p>
            <p>Registration Number: {tourGuide.registrationNumber}</p>
            <p>Validity: {tourGuide.validity}</p>
            <p>Contact Number: {tourGuide.contactnumber}</p>
            <p>Guide Type: {tourGuide.category}</p>
            {tourGuide.image.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourGuideList;
