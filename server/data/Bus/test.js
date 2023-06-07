const axios = require('axios');
const config = require('../../config/bus_key');

    function makeURL(citycode, nodeid){
        var baseURL ='https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey='
        var url = baseURL + config.bus_key + '&cityCode=' + citycode + '&nodeId=' + nodeid;
        return url;
    }
    // const url = makeURL(dataToSubmit.citycode, dataToSubmit.nodeId);
    const test = makeURL('25', 'DJB800221');
    console.log(test);
    const res = await axios.get(url);
    var json = res.data;
    console.log(json)
        

