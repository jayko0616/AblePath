import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'


const MenuItem = ({active, children, to}) => (
  <Link to={to} className='menu-item'>{children}</Link>
);

const Header = () => {
  return(
    
    <header className='header'>
    <div className="header">
      <title>Nav Bar</title>
    </div>

    <div className="body">
      <nav className="navbar">
        <div className="navbar__logo">
          <i className="fas fa-blog"></i>
          <a href="">Able Path</a>
        </div>
        <ul className="navbar__menu">
          <li><MenuItem to={'/'}>홈</MenuItem></li>
          <li><MenuItem to={'/route'}>길찾기</MenuItem></li>
          <li><MenuItem to= {'/info'}>교통정보</MenuItem></li>
        </ul>
        
        <a href="#" className="navbar__toggleBtn">메뉴</a>
      </nav>
    </div>
    <script src="main.js"></script> 
    </header>
  )
}

export default Header;