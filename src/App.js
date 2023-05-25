import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menubar';
//import SearchBar from './components/second';
//import Description from './components/descriptionhome';
//import OtherServices from './components/otherhome';
import Footer from './components/footer';
import AboutUs from './components/aboutus';
import Home from './components/home';
import ContactForm from './components/contact';
import PhotoGrid from './components/placestovisit';
import LoginPage from './components/login';
import Signup from './components/signup';


import { Routes,Route  } from 'react-router-dom';

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

       
        
        
        </Routes>
      
      
      <Footer/>
     
      

      

      
    </div>
  );
}

export default App;
