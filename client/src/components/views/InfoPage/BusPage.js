import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { get_bus } from '../../../_actions/data_action';


function BusPage() {
  const dispatch = useDispatch();

  const [Region, setRegion] = useState("");
  const [Station, setStation] = useState("");

  const onRegionHandler = (event) => {
    setRegion(event.currentTarget.value);
  }
  const onStationHandler = (event) => {
    setStation(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      region_nm: Region,
      station_nm: Station,
    }

    console.log(body);
    
    dispatch(get_bus(body))
      .then(response => {
      if(response.payload.getSuccess){
        console.log(response.payload);
    }
  })

  }
  return (
    <div>
      <Header />
        <form onSubmit={onSubmitHandler}>
            Bus page 입니다.
            <label>지역</label>
            <div className='region'>
              <select value={Region} onChange={onRegionHandler} required>
                <option type="submit" value="none">=== 선택 ===</option>
                <option type="submit" value="seoul">서울</option>
                <option type="submit" value="kyengi">경기</option>
                <option type="submit" value="incheon">인천</option>
                <option type="submit" value="sejong">세종</option>
                <option type="submit" value="daejeon">대전</option>
                <option type="submit" value="gwangju">광주</option>
                <option type="submit" value="daegu">대구</option>
                <option type="submit" value="busan">부산</option>
                <option type="submit" value="ulsan">울산</option>       
                <option type="submit" value="jeju">제주</option>

              </select>
            </div>
            <div className='station'>
              <input type="text" value={Station} onChange={onStationHandler} placeholder="버스 정류장 입력" required></input>
            </div>
            <div className='search'>
                  <button>
                    검색!
                  </button>
            </div>
        </form>
      <Footer />
    </div>
  );
}



export default BusPage;