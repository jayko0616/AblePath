import React, {useState, useEffect} from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Path from './Path';
import Search from './Search';
import './RoutePage.css';
import { get_route } from '../../../_actions/route_action'
import { useDispatch } from 'react-redux';

const testdata = require('./example.json');

function RoutePage() {
  
  const [routeList, setRouteList] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  // const [map, setMap] = useState(false);
  const [searchBody, setSearchBody] = useState();
  const { kakao } = window;
  const dispatch = useDispatch();
  var startKw, endKw;
  var startPo = new kakao.maps.LatLng();
  var endPo = new kakao.maps.LatLng();


  function initializeMap(props) {
    // 마커를 담을 배열입니다
    var markers = [];

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 2 // 지도의 확대 레벨
        };  

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();  

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow();
    
        // 키워드로 장소를 검색합니다
        const searchForm = document.getElementById("submit_btn");
        searchForm?.addEventListener("click", function (e) {
        e.preventDefault();
        searchPlaces();
        });
    
        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces() {
    
            var keyword = document.getElementById('keyword').value;
    
            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('키워드를 입력해주세요!');
                return false;
            }
    
            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch( keyword, placesSearchCB); 
        }
    
        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data);
    
                displayPagination(pagination);
    
                const bounds = new window.kakao.maps.LatLngBounds();
                for (let i = 0; i < data.length; i++) {
                  displayMarker(data[i]);
                  bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
                }
    
                map.setBounds(bounds);
              } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                alert("검색 결과가 존재하지 않습니다.");
              } else if (status === window.kakao.maps.services.Status.ERROR) {
                alert("검색 결과 중 오류가 발생했습니다.");
              }
        }
    
        function displayMarker(place) {
            const marker = new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(place.y, place.x),
            });
            window.kakao.maps.event.addListener(marker, "click", function (mouseEvent) {
                map.setLevel(2)
                infowindow.setContent(`
                <span>
                ${place.place_name}
                </span>
                `);
                infowindow.open(map, marker);
                const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
                map.panTo(moveLatLon);
              }
            );
          }
    
    
        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places) {
            const listEl = document.getElementById("placesList");
            const menuEl = document.getElementById("menu_wrap");
            const fragment = document.createDocumentFragment();
            // const bounds = new window.kakao.maps.LatLngBounds();
            removeAllChildNods(listEl);
            removeMarker();
            for (let i = 0; i < places.length; i++) {
              const placePosition = new window.kakao.maps.LatLng(
                places[i].y,
                places[i].x
              );
              const marker = addMarker(placePosition, i);
              const itemEl = getListItem(i, places[i]);
              // bounds.extend(placePosition);
              (function (marker, title) {
                window.kakao.maps.event.addListener(
                  marker,
                  "mouseover",
                  function () {
                    displayInfowindow(marker, title);
                  }
                );
    
                window.kakao.maps.event.addListener(
                  marker,
                  "mouseout",
                  function () {
                    infowindow.close();
                  }
                );
    
                itemEl.addEventListener("click", function (e) {
                  map.setLevel(2)
                  displayInfowindow(marker, title);
                  map.panTo(placePosition);

                // 출발지로 선택 버튼 누르면 해당 장소 선정
                const start_btn = document.getElementById("start_btn");
                start_btn?.addEventListener("click", function (e) {
                  document.getElementById("start_kw").innerText = title;
                  startKw = title;
                  startPo = placePosition;
                  console.log(startPo);
                });

                // 도착지로 선택 버튼 누르면 해당 장소 선정
                const end_btn = document.getElementById("end_btn");
                end_btn?.addEventListener("click", function (e) {
                  document.getElementById("end_kw").innerText = title;
                  endKw = title;
                  endPo = placePosition;
                });


                  
                });
              })(marker, places[i].place_name);
    
              fragment.appendChild(itemEl);
            }
    
            listEl?.appendChild(fragment);
            menuEl.scrollTop = 0;
    
            //map.panTo(bounds);
        }
    
        // 검색결과 항목을 Element로 반환하는 함수입니다
        function getListItem(index, places) {
            const el = document.createElement("li");
    
            let itemStr =
              '<span class="markerbg marker_' +
              (index + 1) +
              '"></span>' +
              '<div class="info">' +
              "   <h5>" +
              places.place_name +
              "</h5>";
    
            if (places.road_address_name) {
              itemStr +=
                "    <span>" +
                places.road_address_name +
                "</span>" +
                '   <span class="jibun gray">' +
                `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
                </img>` +
                places.address_name +
                "</span>";
            } else {
              itemStr += "    <span>" + places.address_name + "</span>";
            }
    
            itemStr +=
              '  <span class="tel">' + places.phone + "</span>" + "</div>";
    
            el.innerHTML = itemStr;
            el.className = "item";
    
            return el;
        }
    
        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
          const imageSize = new window.kakao.maps.Size(36, 37);
          const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
          };
    
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );
    
          const marker = new window.kakao.maps.Marker({
            position,
            image: markerImage,
          });
    
          marker.setMap(map);
          markers.push(marker);
    
          return marker;
        }
    
        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
        }
    
        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        function displayPagination(pagination) {
            const paginationEl = document.getElementById("pagination");
            const fragment = document.createDocumentFragment();
            while (paginationEl?.hasChildNodes()) {
              paginationEl.removeChild(paginationEl.lastChild);
            }
    
            for (let i = 1; i <= pagination.last; i++) {
              const el = document.createElement("a");
              el.href = "#";
              el.innerHTML = String(i);
    
              if (i === pagination.current) {
                el.className = "on";
              } else {
                el.onclick = (function (i) {
                  return function () {
                    pagination.gotoPage(i);
                  };
                })(i);
              }
    
              fragment.appendChild(el);
            }
            paginationEl?.appendChild(fragment);
        }
    
        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, title) {
            var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
            infowindow.setContent(content);
            infowindow.open(map, marker);
    
        }
    
        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        function removeAllChildNods(el) {   
            while (el.hasChildNodes()) {
                el.removeChild (el.lastChild);
            }
        }

  }
  





  
  // const start_btn = document.getElementById("test_btn");
  // start_btn?.addEventListener("click", function (e) {
  //   document.getElementById("test_txt").innerText = body;

  // });
  const search_handler = (e) => {
    console.log(startPo.getLat().toString());

    let body = {
      "startX": startPo.getLng().toString(),
      "startY": startPo.getLat().toString(),
      "endX": endPo.getLng().toString(),
      "endY": endPo.getLat().toString(),
      // "startNm": startKw,
      // "endNm": endKw,
      "count" : 5,
      "lang": 0,
      "format":"json",
      "searchDttm": '202301011200'
    }

    
    
    console.log(body)
  //길찾기 api 호출 횟수 제한 때문에, 미리 저장해둔 데이터로 테스트용 
  //setRouteList(testdata.metaData.plan.itineraries[0].legs);
  //setTotalTime(parseInt(testdata.metaData.plan.itineraries[0].totalTime));
  setSearchBody(body);
  
    dispatch(get_route(searchBody))
        .then(response => {
          if(response.payload.getSuccess){
            console.log(response.payload);
            setRouteList(response.payload.routeList.legs);
            setTotalTime(response.payload.routeList.totalTime)
          }
        })
        
 
  }


  useEffect(() => {
    initializeMap();
})

  return (
    <div>
      <Header />
      <div class='route'>

        <Search id='search'></Search>

        <div class="map_wrap">
        <div id="map" style={{width: '100%', height: '120%', position: 'relative', overflow: 'hidden'}}></div>
            <div id="menu_wrap" class="bg_white">
                <div class="option">
                    <div>
                        <form onsubmit="searchPlaces(); return false;">
                            키워드 : <input type="text" id="keyword" size="15"/> 
                            <button id = "submit_btn" type="submit">검색하기</button> 
                            
                        </form>
                    </div>
                </div>
                <hr/>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
            <p id='result'></p>
        </div>
        <div className='search'>
          <br></br><br></br><br></br>
          <button id = "start_btn" type="submit">출발지로 선택</button> 
          <div id='start_kw'></div>
          <button id = "end_btn" type="submit">도착지로 선택</button> 
          <div id='end_kw'></div>
          </div>
        <button className="route_search" onClick={search_handler}>길찾기 검색</button>

        <div id = 'routeDisplay'>
          {/*!map && <Map searchBody={searchBody}></Map>*/}
          {(routeList!==[]) && <Path className ='path' routeList={routeList} totalTime={totalTime}></Path>}
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default React.memo(RoutePage);