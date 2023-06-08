import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import BusPageMap from './BusPageMap';
import './BusPage.css';


function BusPage() {
  return (
    <div>
      <Header />
      <div className='buspage'>
      <BusPageMap id = 'map'></BusPageMap>
      </div>
    </div>
  );
}

export default BusPage;