import React, { useState, useEffect } from 'react';
import './PhotoGrid.css';

const PhotoGrid = () => {
  const [words, setWords] = useState([]);
  const paragraph =
    '   Embark on a captivating journey through the mesmerizing wonders of Sri Lanka. Discover pristine beaches that beckon with their golden sands and azure waters, offering a blissful escape from the ordinary. Immerse yourself in the rich heritage of ancient civilizations, where majestic temples and ancient ruins whisper tales of a glorious past. Experience the vibrant spectacle of the Perahera festival, a dazzling extravaganza of music, dance, and ornately adorned elephants that ignites the senses. Venture into the enchanting hill country, where emerald-green tea plantations carpet rolling hills, and misty peaks invite you to explore breathtaking landscapes. Sri Lanka awaits, ready to mesmerize and enchant with its unrivaled beauty.';

  useEffect(() => {
    const wordsArray = paragraph.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < wordsArray.length) {
        setWords(prevWords => [...prevWords, wordsArray[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const imageUrls = [
      '../images/heritage.webp',
      '../images/colombo.jpg',
      '../images/festive.jpg',
      '../images/hill-country.jpg',
    ];

    const loadImage = (url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setLoadedImages(prevLoadedImages => [...prevLoadedImages, index]);
      };
    };

    imageUrls.forEach((url, index) => {
      const delay = 1000 * index;
      setTimeout(() => loadImage(url, index), delay);
    });
  }, []);

  return (
    <div className="photo-grid-container">
      <div className="background-video">
        <video autoPlay muted loop>
          <source src="../images/background-v.mp4" type="video/mp4" />
        </video>
      </div>
      <div>
        <p id="page-heading">
          {words.map((word, index) => (
            <span id="drop-text" key={index}>
              {word}{' '}
            </span>
          ))}
        </p>
        <div className="photo-grid">
          <div className={`photo-photo1 ${loadedImages.includes(0) ? 'loaded' : ''}`}>
            {loadedImages.includes(0) && (
              <>
                <a href="https://www.srilanka.travel/heritage-discover-the-past">
                  <img src="../images/heritage.webp" alt="Heritage" />
                  <p className="photo-name-photo1">Heritage</p>
                </a>
              </>
            )}
          </div>
          <div className={`photo-photo2 ${loadedImages.includes(1) ? 'loaded' : ''}`}>
            {loadedImages.includes(1) && (
              <>
                <a href="https://www.srilanka.travel/pristine-beach-holidays">
                  <img src="../images/beach.jpg" alt="Beaches" />
                  <p className="photo-name-photo2">Beaches</p>
                </a>
              </>
            )}
          </div>
          <div className={`photo-photo3 ${loadedImages.includes(2) ? 'loaded' : ''}`}>
            {loadedImages.includes(2) && (
              <>
                <a href="https://www.srilanka.travel/festive">
                  <img src="../images/festive.jpg" alt="Festives" />
                  <div className="photo-name-photo3">Festives</div>
                </a>
              </>
            )}
          </div>
          <div className={`photo photo4 ${loadedImages.includes(3) ? 'loaded' : ''}`}>
            {loadedImages.includes(3) && (
              <>
                <a href="https://www.srilanka.travel/scenic-beauty">
                  <img src="../images/hill-country.jpg" alt="Hill country" />
                  <div className="photo-name-photo4">Hill Country</div>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;
