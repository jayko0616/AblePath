//실시간 지하철의 도착 정보 데이터
const axios = require('axios');
const config = require('../../config/subway_key');
const baseURL = 'http://openapi.seoul.go.kr:8088/';


/**
 * 선택한 지하철역에 따라 호출 url 주소를 완성한다.
 */
function makeURL(station, startIdx, endIdx) {
    var url = baseURL;
    url += config.ordinary_key;
    url += '/json/SearchInfoBySubwayNameService/';
    url += startIdx + '/' + endIdx + '/';
    url += station + '/';
    return url;
}


/**
 * subway api 요청을 보내고 응답을 받아온다. 
 */
async function search_stn_id(dataToSubmit) {

    const startIdx = 1;
    const endIdx = 5;
    var stn_cd

    const url = makeURL(dataToSubmit.stn_nm, startIdx, endIdx);

    try{
        const res = await axios.get(url);
        console.log('Status', res.status);
    
        const json = JSON.parse(JSON.stringify(res.data.SearchInfoBySubwayNameService));
            
        for(i = 0; i < json.list_total_count; i++) {
            //console.log(json.row[i].LINE_NUM);
            if(json.row[i].LINE_NUM == dataToSubmit.line){
                stn_cd = json.row[i].STATION_CD; 
                break;
            }
        }

        return {
            getSuccess: true,
            stn_nm: dataToSubmit.stn_nm,
            stn_line: dataToSubmit.line,
            stn_cd: stn_cd,
        };
    }
    
    catch(error) {
        console.log("Failed to convert subway stn_nm to stn_cd.");
    }
}


let body = {
    line: '경의선',
    stn_nm: '회기',
};

search_stn_id(body).then(result => {
    console.log(result);
})


module.exports.search_stn_id = search_stn_id;