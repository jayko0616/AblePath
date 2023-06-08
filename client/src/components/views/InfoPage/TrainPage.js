import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import axios from 'axios';
import { train_arrival } from '../../../_actions/data_action';
import { useDispatch } from 'react-redux';
import './TrainPage.css';

const baseURL = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList?serviceKey=';
const option = '&numOfRows=20&pageNo=1&_type=json';

function makeURL(cityNo) {
  return baseURL + 
  '%2BZv9hPmS6mOwrU8rWvnNbtY3fQm2aGk6SK4q3NcBQ9hmatKRNc50lC%2Fm5gAb0wOv5V71nzLUz1CASUqsYmYK8g%3D%3D' 
  + option 
  + '&cityCode=' 
  + cityNo;
}

function formatTime(timeNumber) {
  const timeString = timeNumber.toString();
  const year = timeString.substring(0, 4);
  const month = timeString.substring(4, 6);
  const day = timeString.substring(6, 8);
  const hour = timeString.substring(8, 10);
  const minute = timeString.substring(10, 12);
  return `${year}년 ${month}월 ${day}일 ${hour}시${minute}분`;
}

function getCurrentTimeInNumberFormat() {
  const now = new Date();
  const year = now.getFullYear().toString().padStart(4, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  return year + month + day + hour + minute + second;
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
  const [trainStationInfo, setTrainStationInfo] = useState([]);

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
          <option value="">기차역 선택(Station)</option>
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

    let body = {
      departId: DepartureSubRegion,
      arrivalId: ArrivalSubRegion,
    };

    console.log(body);

    dispatch(train_arrival(body))
      .then((response) => {
        if (response.payload.getSuccess) {
          const trainStationInfo = response.payload.trainList.map((trainStation) => ({
            trainno: trainStation.trainno,
            depplandtime: trainStation.depplandtime,
            arrplandtime: trainStation.arrplandtime,
            traingradename: trainStation.traingradename,
            adultcharge: trainStation.adultcharge
          }));
          setTrainStationInfo(trainStationInfo);
        }
      });
  };

  return (
    <div>
      <Header />
      <form onSubmit={onSubmitHandler} >
        <div>
          <div class="icon-label">
            <span class="icon icon-start"></span>
            <label class="labels">출발지</label>
          </div>
          <div className="city">
            <select value={DepartureRegion} onChange={onDepartureRegionHandler} required>
                <option type="submit" value="none">출발지 선택[City]</option>
                <option type="submit" value="11">서울특별시</option>
                <option type="submit" value="12">세종특별시</option>
                <option type="submit" value="21">부산광역시</option>
                <option type="submit" value="22">대구광역시</option>
                <option type="submit" value="23">인천광역시</option>
                <option type="submit" value="24">광주광역시</option>
                <option type="submit" value="25">대전광역시</option>
                <option type="submit" value="26">울산광역시</option>
                <option type="submit" value="31">경기도</option>       
                <option type="submit" value="32">강원도</option>
                <option type="submit" value="33">충청북도</option>
                <option type="submit" value="34">충청남도</option>
                <option type="submit" value="35">전라북도</option>
                <option type="submit" value="36">전라남도</option>
                <option type="submit" value="37">경상북도</option>
                <option type="submit" value="38">경상남도</option>
            </select>
          </div>
          {DepartureRegion !== "" && (
            <div className="sub-region" >
              {renderSubRegionOptions(DepartureRegion, DepartureSubRegion, onDepartureSubRegionHandler, DepartureTrainStations)}
            </div>
          )}
        </div>
        <div>
          <div class="icon-label">
            <span class="icon icon-start"></span>
            <label class="labels">도착지</label>
          </div>
          <div className="city">
            <select value={ArrivalRegion} onChange={onArrivalRegionHandler} required>
                <option type="submit" value="none">도착지 선택[City]</option>
                <option type="submit" value="11">서울특별시</option>
                <option type="submit" value="12">세종특별시</option>
                <option type="submit" value="21">부산광역시</option>
                <option type="submit" value="22">대구광역시</option>
                <option type="submit" value="23">인천광역시</option>
                <option type="submit" value="24">광주광역시</option>
                <option type="submit" value="25">대전광역시</option>
                <option type="submit" value="26">울산광역시</option>
                <option type="submit" value="31">경기도</option>       
                <option type="submit" value="32">강원도</option>
                <option type="submit" value="33">충청북도</option>
                <option type="submit" value="34">충청남도</option>
                <option type="submit" value="35">전라북도</option>
                <option type="submit" value="36">전라남도</option>
                <option type="submit" value="37">경상북도</option>
                <option type="submit" value="38">경상남도</option>
            </select>
          </div>
          {ArrivalRegion !== "" && (
            <div className="sub-region">
              {renderSubRegionOptions(ArrivalRegion, ArrivalSubRegion, onArrivalSubRegionHandler, ArrivalTrainStations)}
            </div>
          )}
        </div>
        <div className="search">
          <button class="train-button" type="submit">
            <span className="search-icon"></span>
          </button>
        </div>
      </form>
      <div>
      {trainStationInfo.map((trainStation, index) => {
            const currentTime = getCurrentTimeInNumberFormat();
          if (trainStation.depplandtime > currentTime) 
          //실시간보다 늦게 출발하는 기차만 보여줌
          {
          return (
              <div key={index}>
                  <p>기차: {trainStation.traingradename}     운임료: {trainStation.adultcharge}원</p>
                  <p>출발시간: {formatTime(trainStation.depplandtime)}</p>
                  <p>도착시간: {formatTime(trainStation.arrplandtime)}</p>
                  {trainStation.traingradename === 'KTX' && (
                    <>
                    <p>전동휠체어 이용석: 2호차 1A, 1C</p>
                    <p>휠체어 지정석: 2호차 1A, 2B, 2C</p>
                    </>
                  )}

                  {trainStation.traingradename === 'KTX-이음' && (
                    <>
                    <p>전동휠체어 이용석: 3호차 1D, 2A</p>
                    <p>휠체어 지정석: 3호차 2D, 3A(2인석), 3B(2인석)</p>
                    </>
                  )}

                  {trainStation.traingradename === 'ITX-청춘' && (
                    <>
                    <p>전동휠체어 이용석: 3호차 1A</p>
                    <p>휠체어 지정석:3호차 1D, 2A, 2D, 3A</p>
                    </>
                  )}

                  {trainStation.traingradename === 'ITX-새마을' && (
                    <>
                    <p>전동휠체어 이용석: 3호차 1A, 2D</p>
                    <p>휠체어 지정석: 3호차 2A, 3D</p>
                    </>
                  )}

                  {trainStation.traingradename === '누리로' && (
                    <>
                    <p>전동휠체어 이용석: 2호차 1D, 2D</p>
                    <p>휠체어 지정석: 2호차 1A, 2A, 3A, 3B, 3D</p>
                    </>
                  )}

                  {trainStation.traingradename === 'KTX-산천(A-type)' && (
                    <>
                    <p>전동휠체어 이용석: 1호차 12A, 12D</p>
                    <p>휠체어 지정석: 1호차 11A, 11C(2인석), 11D(2인석)</p>
                    </>
                  )}

                  {trainStation.traingradename === 'KTX-산천(B-type)' && (
                    <>
                    <p>전동휠체어 이용석: 1호차 12A, 12D</p>
                    <p>휠체어 지정석: 1호차 11A, 11C(2인석), 11D(2인석)</p>
                    </>
                    )}

                  {trainStation.traingradename === 'SRT' && (
                    <>
                    <p>전동휠체어 이용석: 1호차 12A, 12D</p>
                    <p>휠체어 지정석: 1호차 11A, 11C(2인석), 11D(2인석)</p>
                    </>
                    )}


                  <hr />
              </div>
          );}
          return null; // Skip rendering if the condition is not met
          })}
      </div>
      <Footer />
    </div>
  );
}

export default TrainPage;
