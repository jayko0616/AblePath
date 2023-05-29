import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { get_bus } from '../../../_actions/data_action';


function BusPage() {
  const dispatch = useDispatch();

  const [Region, setRegion] = useState("");
  const [BusNum, setBusNum] = useState("");

  const onRegionHandler = (event) => {
    setRegion(event.currentTarget.value);
  }
  const onBusNumHandler = (event) => {
    setBusNum(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      region_nm: Region,
      bus_num: BusNum,
    }

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
                <option type="submit" value="busan">부산</option>       
              </select>
            </div>
            <div className='busnum'>
              <input type="text" value={BusNum} onChange={onBusNumHandler} required>버스 번호 입력</input>
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