//실시간 지하철의 도착 정보 데이터
const axios = require('axios');
const config = require('../../config/subway_key');


/**
 * 지하철 역별 열차 시간표 url 
 * week : 1 평일 / 2 토요일 / 3 휴일, 일요일
 * updn : 1 상행, 내선 / 2 하행, 외선
 */
function makeURL(station_CD, startIdx, endIdx, week, updn) {
    var url = 'http://openAPI.seoul.go.kr:8088/';
    url += config.ordinary_key;
    url += '/json/SearchSTNTimeTableByIDService/';
    url += startIdx + '/' + endIdx + '/';
    url += station_CD + '/' + week + '/' + updn + '/'
    return url;
}


/**
 * subway api 요청을 보내고 응답을 받아온다. 
 */
async function stn_time_table(dataToSubmit) {

    const startIdx = 1;
    const endIdx = 5;
    

    const url = makeURL(dataToSubmit.stn_cd, startIdx, endIdx, 
        dataToSubmit.week, dataToSubmit.updn);

    try{
        const res = await axios.get(url);
        console.log('Status', res.status);
    
        //res.data.SearchSTNTimeTableByIDService.list_total_count 만큼 .. ! 
        console.log(res.data.SearchSTNTimeTableByIDService);
    }
    
    catch(error) {
        console.log(error);
    }
}


let body = {
    stn_cd: '4126',
    week: '1',
    updn: '1'
};

stn_time_table(body);