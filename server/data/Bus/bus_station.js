const axios = require('axios');
const config = require('../../config/bus_key');

// 좌표를 받아와서 해당 좌표 중심에서 지도에 있는 버스 정류장 위치를 반환
async function get_st_loc(dataToSubmit) {
    function makeURL(lat, lon){
        var baseURL ='http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList?serviceKey='
        var url = baseURL + config.bus_key + '&gpsLati=' + lat + '&gpsLong=' + lon;
        return url;
    }

    const url = makeURL(dataToSubmit.latitude, dataToSubmit.longitude);

    var busjson = {};
    try{
        const res = await axios.get(url);
        var json = res.data;
        var item = json.response.body.items.item;

        busjson.busStn = item;
        busjson.totalCnt = item.length;
        busjson.getSuccess= true;

        return busjson
    }
    catch(error){
        console.log("Failed to convert bus bus_station to get_st_loc.");
        busjson.getSuccess= false;
        return busjson
        
    }
    
}


module.exports.get_st_loc = get_st_loc;
