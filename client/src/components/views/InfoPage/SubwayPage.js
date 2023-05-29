import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ReactComponent as Subway_stn2 } from '../../images/subway_stn2.svg';

function SubwayPage() {

  return (
    <div>
      <Header />
      subway page 입니다.
      <Subway_stn2/>
      <Footer />
    </div>
  );
}

export default SubwayPage;