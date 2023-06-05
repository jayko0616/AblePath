import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Map from './Map';
import Path from './Path';
import Search from './Search';
import './RoutePage.css';


function RoutePage() {
  

  return (
    <div>
      <Header />
      <div class='route'>
        <Search id='search'></Search>
        
        <div id = 'routeDisplay'>
          <Map id = 'map'></Map>
          <Path id ='path'></Path>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RoutePage;