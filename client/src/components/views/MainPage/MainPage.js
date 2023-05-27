import React, {useEffect} from 'react';
import Footer from '../Footer/Footer';
import '../MainPage/MainPage.css';
import { useNavigate } from 'react-router';

function MainPage() {

  /**
   * 페이지 이동 관련 변수와 함수들
   * func name : 'to' + pagename
   */
  const navigate = useNavigate();

  const toInfoPage = (event) => {
    navigate('/info')
  }

  const toRouterPage = (event) => {
    navigate('/route')
  }

  return (
    <div>
      <body>
        <button id="info" onClick={toInfoPage}>
          교통 정보
        </button>
        <button id="route" onClick={toRouterPage}>
          길찾기
        </button>
      </body>
      <Footer/>
    </div>

  )
}

export default MainPage;
  