import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';


function InfoPage() {

  /**
   * 페이지 이동 관련 변수와 함수들
   * func name : 'to' + pagename
   */
  const navigate = useNavigate();

  const toSubwayPage = (event) => {
    navigate('./subway')
  }
  const toBusPage = (event) => {
    navigate('./bus')
  }
  const toMegaBusPage = (event) => {
    navigate('./megabus')
  }
  const toTrainPage = (event) => {
    navigate('./train')
  }
  const toTaxiPage = (event) => {
    navigate('./taxi')
  }

  return (
    <div>
      <Header />
      
      <button id="subway" onClick={toSubwayPage}>
          지하철
        </button>
        <button id="bus" onClick={toBusPage}>
          버스
        </button>
        <button id="megabus" onClick={toMegaBusPage}>
          시외/고속 버스
        </button>
        <button id="train" onClick={toTrainPage}>
          기차
        </button>
        <button id="taxi" onClick={toTaxiPage}>
          택시
        </button>
      <Footer />
    </div>
  );
}

export default InfoPage;