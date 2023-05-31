//실시간 지하철의 도착 정보 데이터
const axios = require('axios');

const config = require('../../config/subway_key');
const baseURL = 'http://swopenAPI.seoul.go.kr/api/subway/';

// 회기역 참조 예시 
var station = '회기'; 
var startIdx = 0;
var endIdx = 4;
var url; //완성된 url 넣을 변수

/**
 * 선택한 지하철역에 따라 호출 url 주소를 완성한다.
 */
function makeURL(station, startIdx, endIdx) {
    url = baseURL;
    url += config.subway_key;
    url += '/json/realtimeStationArrival/';
    url += startIdx + '/' + endIdx + '/';
    url += station;
    return url;
}

url = makeURL(station, startIdx, endIdx);

/**
 * subway api 요청을 보내고 응답을 받아온다. 
 */
var arrival_list = new Array();

axios({
    method : 'get',
    url : url,
}).then((res) => {
    console.log('Status', res.status);
    //console.log('Header', res.headers);
    console.log('Data', res.data);
    //console.log('Data-1', res.data.realtimeArrivalList[0]);
    arrival_list[0] = JSON.parse(JSON.stringify(res.data.realtimeArrivalList[0]));
    arrival_list[1] = JSON.parse(JSON.stringify(res.data.realtimeArrivalList[1]));
    arrival_list[2] = JSON.parse(JSON.stringify(res.data.realtimeArrivalList[2]));
    arrival_list[3] = JSON.parse(JSON.stringify(res.data.realtimeArrivalList[3]));
    
    console.log(arrival_list[0].trainLineNm + "열차\n" + arrival_list[0].arvlMsg2);
    console.log(arrival_list[1].trainLineNm + "열차\n" + arrival_list[1].arvlMsg2);
    console.log(arrival_list[2].trainLineNm + "열차\n" + arrival_list[2].arvlMsg2);
    console.log(arrival_list[3].trainLineNm + "열차\n" + arrival_list[3].arvlMsg2);
})


