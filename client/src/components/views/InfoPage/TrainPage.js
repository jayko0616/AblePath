import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import axios from 'axios';
import { train_arrival } from '../../../_actions/data_action';
import { useDispatch } from 'react-redux';

const baseURL = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList?serviceKey=';
const option = '&numOfRows=20&pageNo=1&_type=json';

function makeURL(cityNo) {
  return baseURL + '%2BZv9hPmS6mOwrU8rWvnNbtY3fQm2aGk6SK4q3NcBQ9hmatKRNc50lC%2Fm5gAb0wOv5V71nzLUz1CASUqsYmYK8g%3D%3D' + option + '&cityCode=' + cityNo;
}

async function fetchTrainStations(cityNo) {
  const url = makeURL(cityNo);
  return axios.get(url)
    .then((res) => {
      const base = res.data.response.body.items.item;
      const trainStations = base.map((item) => ({
        name: item.nodeid,
        code: item.nodename
      }));
      return trainStations;
    });
}

function TrainPage() {
  const dispatch = useDispatch();

  const [DepartureRegion, setDepartureRegion] = useState("");
  const [DepartureSubRegion, setDepartureSubRegion] = useState("");
  const [ArrivalRegion, setArrivalRegion] = useState("");
  const [ArrivalSubRegion, setArrivalSubRegion] = useState("");
  const [DepartureTrainStations, setDepartureTrainStations] = useState([]);
  const [ArrivalTrainStations, setArrivalTrainStations] = useState([]);

  useEffect(() => {
    if (DepartureRegion !== "") {
      fetchTrainStations(DepartureRegion).then((stations) => {
        setDepartureTrainStations(stations);
      });
    }
  }, [DepartureRegion]);

  useEffect(() => {
    if (ArrivalRegion !== "") {
      fetchTrainStations(ArrivalRegion).then((stations) => {
        setArrivalTrainStations(stations);
      });
    }
  }, [ArrivalRegion]);

  const onDepartureRegionHandler = (event) => {
    setDepartureRegion(event.currentTarget.value);
    setDepartureSubRegion("");
  };

  const onDepartureSubRegionHandler = (event) => {
    setDepartureSubRegion(event.currentTarget.value);
  };

  const onArrivalRegionHandler = (event) => {
    setArrivalRegion(event.currentTarget.value);
    setArrivalSubRegion("");
  };

  const onArrivalSubRegionHandler = (event) => {
    setArrivalSubRegion(event.currentTarget.value);
  };

  const renderSubRegionOptions = (region, subRegionState, subRegionHandler, trainStations) => {
    if (region !== "") {
      return (
        <select value={subRegionState} onChange={subRegionHandler} required>
          <option value="">=== 선택 ===</option>
          {trainStations.map((station) => (
            <option key={station.name} value={station.name}>
              {station.code}
            </option>
          ))}
        </select>
      );
    }
    return null;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let dataset = {
      departId: DepartureSubRegion,
      arrivalId: ArrivalSubRegion,
    };

    console.log(dataset);

    dispatch(train_arrival(dataset))
      .then((response) => {
        if (response.payload.getSuccess) {
          console.log(response.payload.trainno);
          console.log(response.payload.charge);
          console.log(response.payload.depart);
          console.log(response.payload.arrival);
          console.log(response.payload.traintype);
        }
      });
  };

  return (
    <div>
      <Header />
      <form onSubmit={onSubmitHandler}>
        Train page 입니다.
        <div>
          <label>출발지</label>
          <div className="city">
            <select value={DepartureRegion} onChange={onDepartureRegionHandler} required>
              <option value="">=== 선택 ===</option>
              <option value="11">서울특별시</option>
              <option value="12">세종특별시</option>
              <option value="21">부산광역시</option>
              {/* 이하 생략 */}
            </select>
          </div>
          {DepartureRegion !== "" && (
            <div className="sub-region">
              {renderSubRegionOptions(DepartureRegion, DepartureSubRegion, onDepartureSubRegionHandler, DepartureTrainStations)}
            </div>
          )}
        </div>
        <div>
          <label>도착지</label>
          <div className="city">
            <select value={ArrivalRegion} onChange={onArrivalRegionHandler} required>
              <option value="">=== 선택 ===</option>
              <option value="11">서울특별시</option>
              <option value="12">세종특별시</option>
              <option value="21">부산광역시</option>
              {/* 이하 생략 */}
            </select>
          </div>
          {ArrivalRegion !== "" && (
            <div className="sub-region">
              {renderSubRegionOptions(ArrivalRegion, ArrivalSubRegion, onArrivalSubRegionHandler, ArrivalTrainStations)}
            </div>
          )}
        </div>
        <div className="search">
          <button type="submit">검색!</button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default TrainPage;
