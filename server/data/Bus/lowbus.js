const axios = require('axios');
var convert = require('xml-js');
const key = require('../../config/bus_key')


async function get_stId(dataToSubmit){
        if(dataToSubmit.region_nm == "seoul"){
            const baseURL = 'http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId?ServiceKey=';
            const stId = 112000001;
            var url;
            url = baseURL+ key.bus_key + '&stId=' + stId;

            try{
                const res = await axios.get(url);
                
                console.log('Status', res.status, res.statusText);
                var xml = res.data;
                var json = convert.xml2json(xml, {compact: true});  //xml -> json
                const items = JSON.parse(json);     //js에서 바로 변수로 사용할 수 있도록
                const base = items.ServiceResult.msgBody.itemList;
                Object.keys(base).forEach(function(i) {
                    console.log("버스 번호(서울)", base[i].busRouteAbrv._text);
                    console.log("남은 시간1", base[i].arrmsg1._text);
                    console.log("남은 시간2", base[i].arrmsg2._text);
                    console.log("");
                });

                return {
                    getSuccess: true
                    
                }
            }
            catch(err) {
                console.log("Failed to get info about lowbus.")
            }
        }

        else if(dataToSubmit.region_nm == "kyengi"){}

        else if(dataToSubmit.region_nm == "incheon"){}

        else if(dataToSubmit.region_nm == "sejong"){}

        else if(dataToSubmit.region_nm == "daejeon"){}

        else if(dataToSubmit.region_nm == "gwangju"){}

        else if(dataToSubmit.region_nm == "daegu"){}

        else if(dataToSubmit.region_nm == "busan"){
            
            const baseURL = 'http://apis.data.go.kr/6260000/BusanBIMS/';
            var url2getId;
            url2getId = baseURL + 'busStopList?serviceKey=' + key.bus_key + '&pageNo=1&numOfRows=4&bstopnm=' + dataToSubmit.station_nm;
            const res = await axios.get(url2getId);

            var xml = res.data;
            var json = convert.xml2json(xml, {compact: true});  //xml -> json
            const items = JSON.parse(json);     //js에서 바로 변수로 사용할 수 있도록
            const base = items.response.body.items.item;
            var stId;
            Object.keys(base).forEach(function(i) {
                if (base[i].bstopnm._text == dataToSubmit.station_nm){
                    console.log("버스정류장: " + dataToSubmit.station_nm);
                    stId = base[i].bstopid._text;
                }

            });

            var url;
            url = baseURL + 'stopArrByBstopid?serviceKey=' + key.bus_key + '&bstopid=' + stId;

            try{
                    const res = await axios.get(url);
                    console.log('Status', res.status, res.statusText);
                    var xml = res.data;
                    var json = convert.xml2json(xml, {compact: true});  //xml -> json
                    const items = JSON.parse(json);     //js에서 바로 변수로 사용할 수 있도록
                    // console.log(json)
                    const base = items.response.body.items.item;
                    Object.keys(base).forEach(function(i) {
                        console.log("버스 번호(부산)", base[i].lineno._text);
                        if (base[i].lowplate1 == 1){
                            console.log("남은 시간1", base[i].min1._text, '분');
                        }
                        else console.log("도착 정보 없음");

                        if (base[i].lowplate2 == 1){
                            console.log("남은 시간1", base[i].min2._text, '분');
                        }
                        else console.log("도착 정보 없음");

                    });

                return {
                    getSuccess: true
                
                }
            }
            catch(err) {
                console.log("Failed to get info about lowbus.")
            }
        }

        else if(dataToSubmit.region_nm == "ulsan"){}

        else if(dataToSubmit.region_nm == "jeju"){}


    

}

module.exports.get_stId = get_stId;