import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Map from './Map';
import Path from './Path';
import Search from './Search';
import './RoutePage.css';
import { get_route } from '../../../_actions/route_action'
import { useDispatch } from 'react-redux';

function RoutePage() {
  
  const dispatch = useDispatch();

  let body = {
    "startX": "127.02550910860451",
	  "startY": "37.63788539420793",
	  "endX": "127.030406594109",
	  "endY": "37.609094989686",
	  "count" : 5,
	  "lang": 0,
	  "format":"json",
    "searchDttm": '202301011200'
  }

  const search_handler = (e) => {
    dispatch(get_route(body))
        .then(response => {
          if(response.payload.getSuccess){
            console.log(response.payload);
          }
        })
  }

  return (
    <div>
      <Header />
      <div class='route'>
        <Search id='search'></Search>
        <button onClick={search_handler}>길찾기 검색</button>
        <div id = 'routeDisplay'>
          <Map className = 'map'></Map>
          <Path className ='path'></Path>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RoutePage;