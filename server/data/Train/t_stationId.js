const axios = require('axios');
var convert = require('xml-js');
const key = require('../../config/train_key')
const baseURL = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList?serviceKey=';
const option = '&numOfRows=10&pageNo=1&_type=xml'   //출력 Page 개수 + row 개수
const cityNo = 11;  //도시 코드 : 받아와야할 듯
var url;

function makeURL(){
    return url = baseURL+ key.train_key + option+'&cityCode='+cityNo;
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
        console.log("코드:", base[i].nodeid._text);
        console.log("역이름:", base[i].nodename._text)
      });

})
