const axios = require('axios');
var convert = require('xml-js');
const key = require('../../config/api_key')




export function get_stId(){
    const baseURL = 'http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId?ServiceKey=';
    const stId = 112000001;
    var url;
    url = baseURL+ key.bus_key + '&stId=' + stId;

    axios({
        method : 'get',
        url : url,
    }).then((res) => {
        console.log('Status', res.status, res.statusText);
        var xml = res.data;
        var json = convert.xml2json(xml, {compact: true});  //xml -> json
        const items = JSON.parse(json);     //js에서 바로 변수로 사용할 수 있도록
        const base = items.ServiceResult.msgBody.itemList;
        Object.keys(base).forEach(function(i) {
            console.log("버스 번호", base[i].busRouteAbrv._text);
            console.log("남은 시간1", base[i].arrmsg1._text);
            console.log("남은 시간2", base[i].arrmsg2._text);
            console.log("");
        });
    })

}