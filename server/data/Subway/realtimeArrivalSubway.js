//실시간 지하철의 도착 정보 데이터
const axios = require('axios');

const config = require('../../config/subway_key');
const baseURL = 'http://swopenAPI.seoul.go.kr/api/subway/';


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

/**
 * 
 * @param {*} dataToSubmit 
 * {stn_nm: "백석", stn_line: "1003"}
 * @return
 */
async function realtime_arrival(dataToSubmit) {
    const startIdx = 0;
    const endIdx = 20;

    const stn_nm = dataToSubmit.stn_nm;
    const stn_line = dataToSubmit.stn_line;

    const url = makeURL(stn_nm, startIdx, endIdx);
    var json = {};
    var cnt0 = 0; 
    var cnt1 = 0;

    
    try{ 
        const res = await axios.get(url);
        console.log('Get realtime_arrival Status', res.status);
        for(i = 0; i < res.data.errorMessage.total; i++){
            if(res.data.realtimeArrivalList[i].subwayId === stn_line) {
                var ordkey = res.data.realtimeArrivalList[i].ordkey;
                
                if(ordkey[0] === '0') { //상행, 내선
                    if(cnt0 < 2){
                        if(cnt0 === 0){ //첫번째 열차
                            json.up_1st_dest = res.data.realtimeArrivalList[i].bstatnNm;
                            json.up_1st_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.up_1st_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.up_1st_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;                            
                            cnt0++;
                        }
                        else if(cnt0 === 1){ //두번째 열차
                            json.up_2nd_dest = res.data.realtimeArrivalList[i].bstatnNm;
                            json.up_2nd_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.up_2nd_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.up_2nd_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                            cnt0++;
                        }
                    }    
                    else continue;               
                }
                else if(ordkey[0] === '1') { //히행, 외선
                    if(cnt1 < 2){
                        if(cnt1 === 0){ //첫번째 열차
                            json.dn_1st_dest = res.data.realtimeArrivalList[i].bstatnNm;
                            json.dn_1st_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.dn_1st_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.dn_1st_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                            cnt1++;
                        }
                        else if(cnt1 === 1){ //두번째 열차
                            json.dn_2nd_dest = res.data.realtimeArrivalList[i].bstatnNm;
                            json.dn_2nd_barvlDt = res.data.realtimeArrivalList[i].barvlDt;
                            json.dn_2nd_arvlMsg2 = res.data.realtimeArrivalList[i].arvlMsg2;
                            json.dn_2nd_arvlMsg3 = res.data.realtimeArrivalList[i].arvlMsg3;
                            cnt1++;
                        }
                    }
                    else continue;
                }
            }
        }
        json.cnt0 = cnt0; 
        json.cnt1 = cnt1;
        json.getSuccess = true;
        console.log(json);
        return json;

    }catch(errer){
        console.log(errer)
        return {
            getSuccess: false
        }
    }
}
/*
const body = {
    stn_nm: "백석",
    stn_line: "1003",
}

realtime_arrival(body);
*/

module.exports.realtime_arrival = realtime_arrival