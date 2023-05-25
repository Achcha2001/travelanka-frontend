import React from 'react';
import './SearchBar.css';
import "./OtherServices.css";
import './home.css';
import './Slideshow.css';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  return (
    <div className="travelanka">
      <div className="search-bar">
        <input type="text" placeholder="Search for your destination..." />
        <select name="category">
          <option value="select">Select Category</option>
          <option value="category1">Economical</option>
          <option value="category2">Deluxe</option>
          <option value="category3">Super Deluxe</option>
        </select>
        <button className='searchbar'>Search</button>
        <div className='post'>
        <button>POST YOUR ADD</button>
        </div>
      </div>
      <div className="description">
        <h2 className="description-header">
          Discover Your Perfect Journey with <span>Travelanka....</span>
        </h2>
        <p className="description-text">
          Embark on an unforgettable journey with Travelanka Tour Guide. Our
          web application helps you find the best hotels that cater to your
          budget and transportation needs, and connects you with experienced
          tour guides to enhance your travel experience. Whether you're looking
          for adventure or relaxation, Travelanka has got you covered. Start
          planning your dream vacation today and let us help you create memories
          that will last a lifetime!
        </p>
      </div>
      <div className="other-services">
        <h2 className="other-services-header">Other Services</h2>
        <div className="other-services-container">
          <div className="other-service">
            <a href="/placestovisit">
              <img
                src="../images/places-visit.jpg"
                alt="Places to visit"
                className="other-service-image"
              />
              <p className="other-service-name">Places to visit</p>
            </a>
          </div>
          <div className="other-service">
            <a href="">
              <img
                src=".\images\tour-guide.jpg"
                alt="Service 2"
                className="other-service-image"
              />
              <p className="other-service-name">Tour Guides</p>
            </a>
          </div>
        </div>
      </div>
      <div className="slideshow">
        <div className='Topic-transport' > Travel Around The Paradise... </div>
        <Carousel>
          <div>
            <img src="../images/slide-train1.webp" alt="Slide 1" />
            <p className="legend">Imagine the following: feeling the wind blowing softly against you as you sit in the open doorway of a train, towering mountains and lush forests offering a view that you won’t find anywhere else. This is the famous train ride from Kandy to Ella, one of Sri Lanka’s biggest tourist attractions. All that you need to experience it for yourself are the right tickets</p>
          </div>
          <div>
            <img src="../images/slide-buses1.webp" alt="Slide 2" />
            <p className="legend">The Colombo City Tour, the only open deck city sightseeing service in Sri Lanka is a venture by Sri Lanka Tourism & Ebert Silva Holidays. It offers unmatched experiences and exclusive glimpses into Sri Lanka's premier city of "Old & New".</p>
          </div>
          <div>
            <img src="../images/slide-tuks.jpg" alt="Slide 3" />
            <p className="legend">Tuk-tuk rides in Sri Lanka: vibrant, compact, and adorned vehicles, weaving through narrow streets, immersing tourists in local culture, creating unforgettable adventures in this beautiful island paradise.</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
