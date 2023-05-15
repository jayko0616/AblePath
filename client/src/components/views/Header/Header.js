import React from 'react';
import { Link } from 'react-router-dom';


const MenuItem = ({active, children, to}) => (
  <Link to={to} className='menu-item'>{children}</Link>
);

const Header = () => {


  return(
    <header className='header'>
      <div>
        <div className='menu'>
          <MenuItem to={'/'}>홈</MenuItem>
          <MenuItem to={'/aboutus'}>About us</MenuItem>
          <MenuItem to= {'/transportation'}>교통 서비스</MenuItem>
          <MenuItem to={'/ablelabel'}>에이블딱지</MenuItem>
          <MenuItem to={'/navi'}>내비</MenuItem>
        </div>
      </div>
    </header>
  )
}

export default Header;