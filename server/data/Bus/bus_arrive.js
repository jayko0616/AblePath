const axios = require('axios');
const config = require('../../config/bus_key');

async function get_arr_info(dataToSubmit){
    function makeURL(citycode, nodeid){
        var baseURL ='https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey='
        var url = baseURL + config.bus_key +'&_type=json' +'&cityCode=' + citycode + '&nodeId=' + nodeid;
        return url;
    }
    const url = makeURL(dataToSubmit.cityCode, dataToSubmit.nodeId);
    var busjson2 = {};
    try{
        const res = await axios.get(url);
        const item = res.data.response.body.items.item;

        busjson2.busArr = item;
        busjson2.totalCnt = item.length;
        busjson2.getSuccess= true;

        return busjson2

    }
    catch(error){
        console.log("Failed to convert bus bus_arrive to get_arr_info.");
        busjson2.getSuccess= false;
        return busjson2
    }
}

module.exports.get_arr_info = get_arr_info;