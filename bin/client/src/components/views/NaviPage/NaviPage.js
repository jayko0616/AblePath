import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const {kakao} = window;
function NaviPage() {
  useEffect(() => {
    // API 로딩이 완료되면 지도를 초기화합니다.
      const container = document.getElementById('map'); //지도 담을 영역의 DOM 레퍼런스
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),   //지도 중심 좌표
        level: 3
      };
      const map = new kakao.maps.Map(container, options);   //지도 생성 및 객체 리턴
    
  }, []);

  return (
    <div>
      <Header />
      {/* style 속성값은 중괄호로 감싸야 합니다. */}
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
      <Footer />
    </div>
  );
}

export default NaviPage;
