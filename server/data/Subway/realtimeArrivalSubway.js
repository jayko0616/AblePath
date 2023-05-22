//실시간 지하철의 도착 정보 데이터
const axios = require('axios');

const baseURL = 'http://swopenAPI.seoul.go.kr/api/subway/72636764687476313735426a59646c/json/realtimeStationArrival/0/5/';

// 회기역 참조 예시 

var station = '서울'; 
var url; //완성된 url 넣을 변수

/**
 * 선택한 지하철역에 따라 호출 url 주소를 완성한다.
 */
function makeURL(station) {
    return url = baseURL + station;
}

url = makeURL(station);

axios({
    method : 'get',
    url : url,
}).then((res) => {
    console.log('Status', res.status, res.statusText);
    console.log('Header', res.headers);
    console.log('Data', res.data);
})
