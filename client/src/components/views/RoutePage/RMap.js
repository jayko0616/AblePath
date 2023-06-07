import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom"
import { Map, ZoomControl, MapTypeControl, CustomOverlayMap} from 'react-kakao-maps-sdk'


function RMap(props) {
  const {kakao} = window;

  var overlay = false;
  const [position, setPosition] = useState()
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  })

  const move_map = ()  => {
    setState({ center : {lat: 33.452617, lng: 126.570888}})
    overlay = true;
  }

 function CustomOverlayMap() {

  return (
    <CustomOverlayMap position={{ lat: 33.452613, lng: 126.570888 }}>
        <div
          style={{padding:"42px", backgroundColor:"#fff", color:"#000"}}
        >
        Custom Overlay!
        </div>
    </CustomOverlayMap>
  )
 }

 useEffect(() => {

 }, [state])
  return (
      <>
      <button onClick={move_map}></button>
      <Map id="routemap" 
        center={state.center} 
        isPanto={state.isPanto}
        level={3}
        style={{
          width: "100%", 
          height:"450px"}}
        onDragEnd={(map) => setPosition({
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        })}
      >
          <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
          <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT}/>
          
          {overlay && CustomOverlayMap()}

        </Map>
      </>
        
    );
  }
/**
 * <Map 
        center={mapState.center}
        isPanto={mapState.isPanto}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
        >

        </Map>
 */
  //<div id="routemap" style={{width:"80%", height:"400px", position:"absolute"}}>
  //</div>

export default RMap;