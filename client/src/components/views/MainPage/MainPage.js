import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';


function MainPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  return (
    <div>
      <Header/>
      <body>
        <h1>메인 페이지</h1>
      </body>
      <Footer/>
    </div>
  )
}

export default MainPage;