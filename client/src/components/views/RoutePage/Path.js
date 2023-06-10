import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { get_realtime_arrival, get_stn_info } from '../../../_actions/subway_action';
import './Path.css';
/**
 * props.routeList = res.data.metaData.plan.itineraries
 * routeList.legs 단위로 컴포넌트를 만들어서 리스트로 띄울 것임 
 * 
 * ex. 버스 리스트 / 지하철 리스트 / 환승 리스트 / 도보 리스르 등
 * 
 * obj : props.routeList.legs
 * 
 * list.mode에 따라서 형태가 달라진다. 
 */

function RouteList({obj}){

  const dispatch = useDispatch();
  if(obj.mode === "BUS"){
    return(
      <div className="routelist" >
        <div className='mode'>
          버스<span id="bus_num">{obj.route}</span>
        </div>

        <div className="bus_route">

          <div clessName="icon" id="bus_icon"></div>

          <div clessName="route_text">
            <div className='start'>{obj.start.name}</div>
            <div className='end'>{obj.end.name}</div>
            <div className='section_time'>소요시간: {obj.sectionTime}</div>
          </div>
        </div>
      </div>
    )
  }

  else if(obj.mode === "SUBWAY"){
    
    //subway 관련 정보 - 도착 정보, 역 엘리베이터, 역무실 전화번호를 받아온다. 
    var realtimes;
    var stnInfo;
    var isSet = 0;

    // stn_nm = obj.start.name 
    // stn_line = obj.type -> 처리 필요!
    const stn_nm = obj.start.name;
    var stn_line; //line code ex. "1001"
    var line_nm; //  line 이름 ex. "1호선"
    var isData = true; //해당 열차의 실시간 도착 정보를 가져올 수 있는지 여부

    
    
    async function setting() {
      var rst;
    switch(obj.type) {
      case 1: stn_line = "1001"; line_nm="1호선"; break; //1호선
      case 2: stn_line = "1002"; line_nm="2호선";break; //2호선
      case 3: stn_line = "1003"; line_nm="3호선";break;
      case 4: stn_line = "1004"; line_nm="4호선";break;
      case 5: stn_line = "1005"; line_nm="5호선";break;
      case 6: stn_line = "1006"; line_nm="6호선";break;
      case 7: stn_line = "1007"; line_nm="7호선";break;
      case 8: stn_line = "1008"; line_nm="8호선";break;
      case 9: stn_line = "1009"; line_nm="9호선";break;
      case 21: isData = false; break; //인천1호선 - info x
      case 22: isData = false; break; //인천2호선 - info x
      case 100: stn_line = "1007"; line_nm="분당선"; break; //수인분당선
      case 101: stn_line = "1065"; line_nm="공항선"; break; //공항철도
      case 104: stn_line = "1063"; line_nm="중앙선"; break; //경의중앙선
      case 107: isData = false; break; //에버라인 - info X 
      case 108: stn_line = "1067"; break; //경춘선 - info X
      case 109: stn_line = "1077"; break; //신분당 - info X 
      case 110: isData = false; break; //의정부경전철 - info X
      case 112: isData = false; break; //경강선 - info X 
      case 113: stn_line = "1092"; break; //우이신설 - info x
      case 115: isData = false; break; //김포골드라인 - info x
      case 116: isData = false; break; //신림선 - info x
      //급행 라인은 그냥 일반 열차와 같은 검색 결과를 보여준다. 
      case 117: stn_line = "1001"; line_nm="1호선"; break; //1호선 급행 
      case 119: stn_line = "1004"; line_nm="4호선"; break; //4호선 급행 
      case 120: stn_line = "1009"; line_nm="4호선"; break; //9호선 급행
      case 121: stn_line = "1007"; line_nm="분당선"; break; //수인분당선 급행
      case 122: stn_line = "1063"; line_nm="중앙선"; break; //경의중앙선 급행
      case 123: stn_line = "1067"; break; //경춘선 급행
      case 124: stn_line = "1065"; line_nm="공항선"; break; //공항철도 급행
      default: isData = false; break;
    }

    try{ 
    if(isData) { 
      let body = {
        stn_nm: stn_nm,
        stn_line: stn_line
      }
      await dispatch(get_realtime_arrival(body))
      .then(response => {
        if(response.payload.getSuccess) {

         
        }
      })
    }

    if(line_nm !== null) {
      let body = {
        stn_nm: stn_nm,
        line_nm: line_nm
      }
      await dispatch(get_stn_info(body))
      .then(response => {
        if(response.payload.getSuccess) {
          stnInfo = {
            stn_telno: (response.payload.isTelno) ? response.payload.stn_telno:null,
            elevater_txt: (response.payload.isElev) ? response.payload.elevater_txt:null,
        }
        }
      })
    }
    }catch(e) { console.log(e); }
    }

    console.log(setting())

    return(
      <div className='routelist'>
        <div className='mode'>
          지하철<span id="subway_line">{obj.route}</span>
        </div>
        <div className='subway_route'>

          <div clessName="icon" id="subway_icon"></div>
          <div clessName="route_text">
            <div className='start'>{obj.start.name}</div>
            <div className='end'>{obj.end.name}</div>
            <div className='section_time'>소요시간 {obj.sectionTime}</div>
          </div>
          <div id='stn_info'></div>
          <div id="divtag"></div>
        </div>
      </div>
      
    )
  }
  
  else if(obj.mode === "TRANSFER"){
    return(
      <div className='routelist'>
        <h3>환승</h3>
        <div className='transfer_route'>
        
          <div clessName="icon" id="trans_icon"></div>
          <div clessName="route_text">
            <div className='start'>{obj.start.name}</div>
            <div className='end'>{obj.end.name}</div>
            <div className='section_time'>소요시간 {obj.sectionTime}</div>
          </div>
        </div>
      </div>
    )
  }

  else if(obj.mode === "WALK") {
    return(
      <div className='routelist'>
        <h3>도보</h3>
        <div className='walk_route'>
        <div clessName="icon" id="walk_icon"></div>
        <div clessName="route_text">
            <div className='start'>{obj.start.name}</div>
            <div className='end'>{obj.end.name}</div>
            <div className='section_time'>소요시간 {obj.sectionTime}</div>
          </div>
        </div>
      </div>
    )
  }

  else{
    return(
      <div className='routelist'>
        <div className='other_route'>
        <h3>{obj.mode}</h3>
        출발지는 {obj.start.name}
        도착지는 {obj.end.name}
        </div>
      </div>
    )
  }
  

}
function Path(props) {
   //이거 자체가 props.routeList와 대응한다
  //const list = rawroute.metaData.plan.itineraries[0].legs

  //props.routeList 정보들을 정리해서 화면에 뿌려줄 것임. 
  //지하철인 경우 -> 도착 시간 정보, 역사 전화번호 같이 띄워 줄 것임 
  //버스인 경우 -> 도착 시간 띄워 줄 것임
  //지하철, 버스 -> 중간에 지나는 역 정보도 볼 수 있게 
 

  var list = props.routeList;

  return (
    <div>
      {(props.totalTime !== 0) && <span>소요 시간 {props.totalTime}</span>}
      {(list !== [])? list.map(obj => <RouteList obj={obj}/>) : null}
    </div>
  );
}

export default React.memo(Path);