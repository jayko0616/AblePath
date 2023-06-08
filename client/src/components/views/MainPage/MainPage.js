import React, {useEffect} from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
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
      <Header/>
      <body>
        <div className='btns'>
        <button class = "mainbutton" id="info" onClick={toInfoPage}>
          교통 정보
        </button>
        <button class = "mainbutton" id="route" onClick={toRouterPage}>
          길찾기
        </button>
        </div>
      </body>
      <Footer/>
    </div>

  )
}

export default MainPage;
  