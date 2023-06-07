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
        Bus page 입니다.
      </div>
      <Footer />
    </div>
  );
}

export default BusPage;