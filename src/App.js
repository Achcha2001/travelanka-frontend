import logo from './logo.svg';
import './App.css';

// import Axios from "axios";

import MenuBar from './components/menubar';

import Footer from './components/footer';
import AboutUs from './components/aboutus';
import Home from './components/home';
import ContactForm from './components/contact';
import PhotoGrid from './components/placestovisit';
import LoginPage from './components/login';
import Signup from './components/signup';
import GuideregistrationForm from './components/guideregister';
import AccommodationRegistrationForm from './components/accregister';
import Payment from './components/payment';
import MapComponent from './components/sitemap';
import TourGuideList from './components/tourguides';

import PostaddForm from './components/postadd';

import SearchResultsPage from './components/results';
import { Routes,Route  } from 'react-router-dom';
//import { useEffect, useState } from 'react';


function App() {
  
  return (
    
    <div className="App">
      <MenuBar/>
    
      <Routes>
        <Route exact path='/'Component={Home}/>
        <Route  path='/aboutus'Component={AboutUs}/>
        <Route path='/placestovisit'Component={PhotoGrid}/>
        <Route path='/contact-us'Component={ContactForm}/>
        <Route path='/login'Component={LoginPage}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/Tourguide'Component={GuideregistrationForm}/>
        <Route path='/service1' Component={AccommodationRegistrationForm}/>
        <Route path='/payment' Component={Payment}/>
        <Route path='/site-map' Component={MapComponent}/>
         <Route path='/postadd' Component={PostaddForm}/>
         <Route path='/results' Component={SearchResultsPage}/>
         <Route path='/tourguides' Component={TourGuideList}/>
        
        
        </Routes>
      <Footer/>
     
     

      

      
    </div>
  );
}

export default App;
