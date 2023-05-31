const axios = require('axios');
var convert = require('xml-js');
const key = require('../../config/api_key')
const baseURL = 'http://apis.data.go.kr/6260000/BusanBIMS/stopArrByBstopid?serviceKey=';

const stId = 505780000;
var url;
function makeURL(stId){
    return url = baseURL+ key.bus_key + '&bstopid=' + stId;
}
url = makeURL(stId)


axios({
    method : 'get',
    url : url,
}).then((res) => {
    console.log('Status', res.status, res.statusText);
    var xml = res.data;
    var json = convert.xml2json(xml, {compact: true});  //xml -> json
    const items = JSON.parse(json);     //js에서 바로 변수로 사용할 수 있도록
    // console.log(json)
    const base = items.response.body.items.item;
    Object.keys(base).forEach(function(i) {
        console.log("버스 번호", base[i].lineno._text);
        if (base[i].lowplate1 == 1){
            console.log("남은 시간1", base[i].min1._text, '분');
        }
        if (base[i].lowplate2 == 1){
            console.log("남은 시간1", base[i].min2._text, '분');
        }
        if (base[i].lowplate1 == base[i].lowplate2 == 0){
            console.log("도착 정보 없음");
        }

      });
})

