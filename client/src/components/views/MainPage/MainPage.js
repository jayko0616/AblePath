import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import '../MainPage/MainPage.css';

const { kakao } = window;

function MainPage() {
    useEffect(() => {
      // API 로딩이 완료되면 지도를 초기화합니다.
      const container = document.getElementById('map'); //지도 담을 영역의 DOM 레퍼런스
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도 중심 좌표
        level: 3,
      };
      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴;
    }, []);
  
    const openModal = () => {
      setIsOn(true);
    };
  
    const closeModal = () => {
      setIsOn(false);
    };
  
    function renderModal() {
      return (
        <>
          <div className="dim"> </div>
          <div className="modal">
            <div>
              <button className="exitBtn" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="input">
              <input type="text" placeholder="검색어를 입력하세요" />
            </div>
          </div>
        </>
      );
    }
  
    const [isOn, setIsOn] = React.useState(false);
  
    return (
      <div className="center">
        <Header />
        <body>
          <h1>Main Page</h1>
          <h1>
            <div>
              <button className="searchBtn" onClick={openModal}>
                Search
              </button>
              {isOn ? renderModal() : ''}
            </div>
          </h1>
          <div style={{ width: '100%', display: 'inline-block', marginLeft: '5px', marginRight: '5px' }}>
            <div id="map" style={{ width: '99%', height: '500px' }}></div>
          </div>
        </body>
        <Footer />
      </div>
    );
  }
  
  export default MainPage;
  