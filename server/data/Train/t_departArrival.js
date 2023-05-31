const axios = require('axios');
const key = require('../../config/train_key')
const baseURL = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey='
const displayopt = '&numOfRows=10&pageNo=1&_type=json'
const infos = '&depPlaceId=NAT010000&arrPlaceId=NAT011668&trainGradeCode=00'


function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();

    if (month < 10) {
      month = '0' + month;
    
    } 
    if (date < 10) {
      date = '0' + date;
    }

    const currentDate = `${year}${month}${date}`;
    return currentDate;
}

var url;

function makeURL(){
    return url = baseURL+ key.train_key + displayopt+infos +'&depPlandTime='+ getCurrentDate();
}
url = makeURL()

axios({
    method : 'get',
    url : url,
}).then((res) => {
    
    console.log('Status', res.status, res.statusText);
    const base = res.data.response.body.items.item

    Object.keys(base).forEach(function(i) {
        console.log("기차 번호", base[i].trainno);
        console.log("운임료:", base[i].adultcharge);
        console.log("출발: ", base[i].arrplandtime);
        console.log("도착: ", base[i].depplandtime);
        console.log("기차종류: ", base[i].traingradename);
        console.log(" ");
    });
})