const axios = require('axios');
const config = require('../../config/subway_key');
const data = require('./stn_info.json');

/**
 * 
 * @param {*} startIdx 
 * @param {*} endIdx 
 * @returns 역사별 승강기 시설 정보 URL
 */
function makeURL(startIdx, endIdx) {
    var url = 'http://openapi.seoul.go.kr:8088/';
    url += config.ordinary_key;
    url += '/json/SeoulMetroFacilInfo/';
    url += startIdx + '/' + endIdx + '/';
    return url;
}

async function facil_info(dataToSubmit) {
    const startIdx = 0;
    const endIdx = 5;
    const url = makeURL(startIdx, endIdx);

    try{
        const res = await axios.get(url);
        console.log(res.status);
        console.log(res)
        
    }
    catch(error) {
        console.log(error);
    }
}


function getObject(data, key, value) {
    return data.DATA.filter(function (object) {
        return object[key] === value;
    })
}

async function stn_info(dataToSubmit) {
    const key = 'station';
    const value = dataToSubmit.stn_nm;

    const startIdx = 0;
    const endIdx = 10;
    const url = makeURL(startIdx, endIdx);

    try{
        const res = await axios.get(url);
        
        console.log(res.status);
        console.log(res.data)

        const info = getObject(data, key, value);
        
        return {
            getSuccess: true,
            stn_telno: info[0].telno_info
        }
    }
    catch(error) {
        console.log(error);
        
        return {
            getSuccess: false
        }
    }
}

/*

let body = {
    stn_nm: '정발산'
}

stn_info(body);
*/

module.exports.stn_info = stn_info;