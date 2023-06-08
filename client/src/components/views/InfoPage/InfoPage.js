import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import './InfoPage.css';

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
  const toTrainPage = (event) => {
    navigate('./train')
  }

  return (
    <div>
      <Header />
        <button class="infobutton" id="subway" onClick={toSubwayPage}>
          지하철
        </button>
        <button class ="infobutton" id="bus" onClick={toBusPage}>
          버스
        </button>
        <button class = "infobutton" id="train" onClick={toTrainPage}>
          기차
        </button>
      <Footer />
    </div>
  );
}

export default InfoPage;