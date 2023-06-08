import React, { useState, useEffect } from 'react';
import './Footer.css';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux'




function Footer (){ 

    return (
<footer>
  <div class="inner">
    <div class="footer-message">합리적인 분들과 좋은 컨텐츠가 지속될 수 있는 선순환 시스템을 지향합니다</div>
    <div class="footer-contact">컨택: dream@fun-coding.org</div>
    <div class="footer-copyright">Copyrigh 2020 All ⓒ rights reserved</div>
  </div>
</footer>
  )
}

export default Footer;