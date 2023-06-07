const data = require('./stn_info.json');

function getObject(data, key, value, key2, value2) {
    return data.DATA.filter(function (object) {
        return object[key] === value && object[key2] === value2;
    })
}

/**
 * 경의중앙선의 line_nm은 '중앙선'임.
 * @param {*} dataToSubmit - stn_nm, line_nm 
 * @returns 
 */
async function stn_info(dataToSubmit) {
    const key = 'station';
    const key2 = 'line_name'
    const value = dataToSubmit.stn_nm;
    const value2 = dataToSubmit.line_nm

    try{
        const info = getObject(data, key, value, key2, value2);
        console.log(info);
        return {
            getSuccess: true,
            stn_telno: info[0].telno_info,
            elevater_txt: info[0].elevater_txt,
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
    stn_nm: '청량리',
    line_nm: '1호선'
}

console.log(stn_info(body));
*/


module.exports.stn_info = stn_info;