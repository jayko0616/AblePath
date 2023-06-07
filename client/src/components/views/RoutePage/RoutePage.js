import React, {useState, useEffect} from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import RMap from './RMap';
import Path from './Path';
import Search from './Search';
import './RoutePage.css';
import { get_route } from '../../../_actions/route_action'
import { useDispatch } from 'react-redux';

const testdata = require('./example.json');

function RoutePage() {
  
  const [routeList, setRouteList] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [map, setMap] = useState(false);
  const [searchBody, setSearchBody] = useState();

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

  //길찾기 api 호출 횟수 제한 때문에, 미리 저장해둔 데이터로 테스트용 
  setRouteList(testdata.metaData.plan.itineraries[0].legs);
  setTotalTime(parseInt(testdata.metaData.plan.itineraries[0].totalTime));
  setSearchBody(body);
  /*
    dispatch(get_route(body))
        .then(response => {
          if(response.payload.getSuccess){
            console.log(response.payload);
            setRouteList(response.payload.routeList.legs);
            setTotalTime(response.payload.routeList.totalTime)
          }
        })
        */
 
  }
  

  return (
    <div>
      <Header />
      <div class='route'>

        <Search id='search'></Search>
        <button onClick={search_handler}>길찾기 검색</button>

        <div id = 'routeDisplay'>
          {/*!map && <Map searchBody={searchBody}></Map>*/}
          {<RMap></RMap>}
          {(routeList!==[]) && <Path className ='path' routeList={routeList} totalTime={totalTime}></Path>}
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default React.memo(RoutePage);