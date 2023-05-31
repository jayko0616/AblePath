//실시간 지하철의 도착 정보 데이터
const axios = require('axios');

const config = require('../../config/subway_key');
const baseURL = 'http://swopenAPI.seoul.go.kr/api/subway/';


// 회기역 참조 예시 
var station = '회기'; 
var startIdx = 0;
var endIdx = 15;
//var url; //완성된 url 넣을 변수


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

/*
url = makeURL(station, startIdx, endIdx);

/**
 * subway api 요청을 보내고 응답을 받아온다. 
 */

/*
axios({
    method : 'get',
    url : url,
}).then((res) => {
    console.log('Status', res.status);
   
    var json = {};
    var cnt0 = 0; 
    var cnt1 = 0;

    for(i = 0; i < res.data.errorMessage.total; i++){
        if(cnt0 == 2 && cnt1 == 2) break;
        if(res.data.realtimeArrivalList[i].subwayId === '1001') {
            console.log("1호선");
            var ordkey = res.data.realtimeArrivalList[i].ordkey;
            if(ordkey[0] === '0') { //상행, 내선
                cnt0++;
                if(cnt0 <= 2){
                    if(ordkey[1] === '1'){ //첫번째 열차
                        json.up_1st_dest = ordkey.substring(5,ordkey.length);
                        json.up_1st_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                        json.up_1st_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                        json.up_1st_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                    }
                    else if(ordkey[1] === '2'){ //두번째 열차
                        json.up_2nd_dest = ordkey.substring(5,ordkey.length);
                        json.up_2nd_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                        json.up_2nd_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                        json.up_2nd_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                    }
                }
                else continue;
            }
            else if(ordkey[0] === '1') { //히행, 외선
                cnt1++;
                if(cnt1 <= 2){
                    if(ordkey[1] === '1'){ //첫번째 열차
                        json.dn_1st_dest = ordkey.substring(5,ordkey.length);
                        json.dn_1st_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                        json.dn_1st_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                        json.dn_1st_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                    }
                    else if(ordkey[1] === '2'){ //두번째 열차
                        json.dn_2nd_dest = ordkey.substring(5,ordkey.length);
                        json.dn_2nd_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                        json.dn_2nd_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                        json.dn_2nd_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                    }
                }
                else continue;
            }
        }
    json.cnt0 = cnt0; 
    json.cnt1 = cnt1;
    console.log(json);
    }
})


*/

async function realtime_arrival(dataToSubmit) {
    const startIdx = 0;
    const endIdx = 10;

    const stn_nm = dataToSubmit.stn_nm;
    const stn_line = dataToSubmit.stn_line;

    const url = makeURL(stn_nm, startIdx, endIdx);

    try{
        const res = await axios.get(url);
        console.log('Get realtime_arrival Status', res.status);

        var json = {};
        var cnt0 = 0; 
        var cnt1 = 0;

        for(i = 0; i < res.data.errorMessage.total; i++){
            console.log(res.data.errorMessage.total);
            if(cnt0 == 2 && cnt1 == 2) break;
            if(res.data.realtimeArrivalList[i].subwayId === stn_line) {
                console.log("1호선");
                var ordkey = res.data.realtimeArrivalList[i].ordkey;
                if(ordkey[0] === '0') { //상행, 내선
                    cnt0++;
                    if(cnt0 <= 2){
                        if(ordkey[1] === '1'){ //첫번째 열차
                            json.up_1st_dest = ordkey.substring(5,ordkey.length);
                            json.up_1st_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.up_1st_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.up_1st_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                        }
                        else if(ordkey[1] === '2'){ //두번째 열차
                            json.up_2nd_dest = ordkey.substring(5,ordkey.length);
                            json.up_2nd_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.up_2nd_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.up_2nd_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                        }
                    }
                else continue;
                }
                else if(ordkey[0] === '1') { //히행, 외선
                    cnt1++;
                    if(cnt1 <= 2){
                        if(ordkey[1] === '1'){ //첫번째 열차
                            json.dn_1st_dest = ordkey.substring(5,ordkey.length);
                            json.dn_1st_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.dn_1st_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.dn_1st_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                        }
                        else if(ordkey[1] === '2'){ //두번째 열차
                            json.dn_2nd_dest = ordkey.substring(5,ordkey.length);
                            json.dn_2nd_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.dn_2nd_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.dn_2nd_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                        }
                    }
                else continue;
                }
            }
        }
        json.cnt0 = cnt0; 
        json.cnt1 = cnt1;
        console.log(json);
    }
    catch(error) {
        console.log("Failed to get realtime_arrival data");
    }
}

/*
const body = {
    stn_nm: "회기",
    stn_line: "1001",
}

realtime_arrival(body);
*/

module.exports.realtime_arrival = realtime_arrival;