import React, { useState, useEffect } from 'react';
import './Footer.css';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux'




function Footer (){ 

    return (
<footer>
  <div class="inner">
    <div class="footer-message"> 주소: 서울시립대 정보기술관 205호</div>
    <div class="footer-contact">TEL: 010-2060-7486</div>
    <div class="footer-copyright">https://github.com/jayko0616/ablePath</div>
  </div>
</footer>
  )
}

export default Footer;