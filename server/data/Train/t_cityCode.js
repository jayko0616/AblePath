const axios = require('axios');
var convert = require('xml-js');
const key = require('../../config/train_key')
const baseURL = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyCodeList?serviceKey=';
const option = '&_type=xml'   //xml

var url;

function makeURL(){
    return url = baseURL+ key.train_key + option;
}
url = makeURL()


axios({
    method : 'get',
    url : url,
}).then((res) => {
    console.log('Status', res.status, res.statusText);
    var xml = res.data;
    var json = convert.xml2json(xml, {compact: true});  //xml -> json
    const items = JSON.parse(json);     //js에서 바로 변수로 사용할 수 있도록
    const base = items.response.body.items.item;
    Object.keys(base).forEach(function(i) {
        console.log("코드:", base[i].citycode._text);
        console.log("도시:", base[i].cityname._text)
      });
})
