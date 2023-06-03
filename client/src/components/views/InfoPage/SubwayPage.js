import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ReactComponent as SubwayMap } from '../../images/subway_map.svg';
import './/SubwayPage.css';
import LineComponent from './SubwayLine';
import { useDispatch } from 'react-redux';
import { get_realtime_arrival } from '../../../_actions/subway_action';
import RealtimeBox from './Subway_realtime';

function SubwayPage() {

  const [selectedComponent, setSelectedComponent] = useState("ALL"); //option에서 선택한 지하철 라인
  const [selectedStn, setSelectedStn] = useState("") // 선택한 역 이름
  const [selectedLine, setSelectedLine] = useState(""); //지하철 라인 코드 ex. '1001'
  const [selectedLineTxt, setSelectedLineTxt] = useState(""); //지하철 라인 텍스트  ex. '1호선'
  const [selected, setSelected] = useState(false); //ALL : false , Others : true
  const [realtime, setRealtime] = useState();
  const dispatch = useDispatch();
  
  //selectedComponent가 변경될 때마다 다시 렌더링
  useEffect(() => {
    console.log("Component ON!>>>", selectedComponent);
    return () => {
      console.log("Component OUT!");
    }
  }, [selectedComponent])

  /**
   * @param {*} 
   * 선택된 라인만 선명하게 보여준다. && 역 클릭시 도착 정보 표시 
   */
  const show_line = (e) => {
    if(e.target.value !== 'ALL'){
      setSelected(true);
      setSelectedComponent(e.target.value);
      const idx = e.target.selectedIndex;
      const opt = e.target.options[idx];
      setSelectedLine(opt.dataset.line);
      setSelectedLineTxt(opt.dataset.linetxt);
      
    }
    else {
      setSelected(false);
      setSelectedComponent("ALL");
      setSelectedStn("");
      setSelectedLine("");
      setSelectedLineTxt("");
      setRealtime();
    }
  }

  const clickHandler = (event) => {
    console.log("EVENT>>>>>", event.target); // 이거도 나중에 지우기
    if(selected){
      if(event.target.tagName === 'DIV'){
        setSelectedStn(event.target.textContent);
        console.log(event.target.textContent)
        //line은 selectedCoponent에 따라서 하면 될 듯 
        let body = {
          stn_nm: event.target.textContent,
          line: selectedLineTxt,
          stn_line: selectedLine,
        }

        dispatch(get_realtime_arrival(body))
        .then(response => {
          if(response.payload.getSuccess){
            //console.log(response.payload)
            //이제 이걸 화면에 이쁘게 띄우면 됨 ~!~!~!~!~! 
            setRealtime(response.payload);
            console.log(realtime);
          }
        })
      }
    }
}
  

  return (
    <div>
      <Header />
      <form>
        <select name="show_line_route" onChange={show_line}>
          <option value="ALL">전체</option>
          <option value="1" data-line="1001" data-linetxt= "1호선">1호선</option>
          <option value="2" data-line="1002" data-linetxt= "2호선">2호선</option>
          <option value="3" data-line="1003" data-linetxt= "3호선">3호선</option>
          <option value="4" data-line="1004" data-linetxt= "4호선">4호선</option>
          <option value="5" data-line="1005" data-linetxt= "5호선">5호선</option>
          <option value="6" data-line="1006" data-linetxt= "6호선">6호선</option>
          <option value="7" data-line="1007" data-linetxt= "7호선">7호선</option>
          <option value="8" data-line="1008" data-linetxt= "8호선">8호선</option>
          <option value="9" data-line="1009" data-linetxt= "9호선">9호선</option>
          <option value="GU" data-line="1063" data-linetxt= "경의중앙선">경의선</option>
          <option value="GG" data-line="" data-linetxt= "경강선">경강선</option>
          <option value="GC" data-line="" data-linetxt= "경춘선">경춘선</option>
          <option value="SU" data-line="1075" data-linetxt= "수인분당선">수인분당</option>
          <option value="SH" data-line="1077" data-linetxt= "신분당선">신분당</option>
          <option value="UI" data-line="1092" data-linetxt= "우이신설선">우이신설</option>
          <option value="SL" data-line="" data-linetxt= "신림선">신림선</option>
        </select>
      </form>
      
      <div className="subway-map-container" >
        
        <LineComponent selectedComponent = {selectedComponent} onClick={clickHandler}/>
        {(selectedStn !== "") && <RealtimeBox className="realtimeBox" selectedStn = {selectedStn} realtime={realtime}/> }

        {/**선택된 라인 외에는 흐리게 나타내기 위한 요소 */}
        <div className={selected? "visible":"hidden"}>
        <SubwayMap/>
        </div>

      </div>

    </div>
  );
}

export default SubwayPage;
