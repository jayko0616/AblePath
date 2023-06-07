const axios = require('axios');
const kr_data = require( './kr_subway_info.json');
const config = require( '../../config/subway_key.js');

function makeURL(railOprCd, lnCd, stinCd) {
  var url = "https://openapi.kric.go.kr/openapi/convenientInfo/stationElevator?serviceKey=";
  url += config.rail_key //api key
  url += "&format=json&railOprIsttCd=" + railOprCd //철도운영기관 코드
  url += "&lnCd=" + lnCd; //선코드
  url += "&stinCd=" + stinCd //역코드
  return url;

}

function getObject(data, key, value, key2, value2) {
    return data.filter(function (object) {
        return (object[key] === value) && (object[key2] === value2);
    })
}

async function stn_elev(dataToSubmit) {
    const line_nm = dataToSubmit.line_nm;
    const stn_nm = dataToSubmit.stn_nm;
   
    try{
        const info = getObject(kr_data, "LN_NM", line_nm, "STIN_NM", stn_nm);
        console.log(info);
        
        const url = makeURL(info.RAIL_OPR_ISTT_CD, info.LN_CD, info.STIN_CD);
        
        const res = await axios.get(url)
        console.log(res.status);
        console.log(res.data);
    }
    catch(error) {
        console.log(error);
    }
}

let body = {
    stn_nm: "회기",
    line_nm: "경의중앙"
}

stn_elev(body);

https://openapi.kric.go.kr/openapi/convenientInfo/stationElevator?serviceKey=$2a$10$HJTTSJsRxlU3hIlmx/sAtuW78WuY1bJWk8pWH8msP6xBzhnbUZ8g2&format=json&railOprIsttCd=S1&lnCd=3&stinCd=322