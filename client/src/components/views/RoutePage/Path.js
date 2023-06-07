import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
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