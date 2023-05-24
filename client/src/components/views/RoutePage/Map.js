import React, { useEffect } from 'react';

function Map() {

  const { kakao } = window;
  
  function initializeMap() {
    const container = document.getElementById('map'); // 지도 담을 영역의 DOM 레퍼런스
    const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
    level: 3,
  };
  const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴;
  }


    useEffect(() => {
      initializeMap();
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
        <body>
          <div style={{ width: '100%', display: 'inline-block', marginLeft: '5px', marginRight: '5px' }}>
            <div id="map" style={{ width: '99%', height: '500px' }}></div>
          </div>
        </body>
      </div>
    );
  }


export default Map;