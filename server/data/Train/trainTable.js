//실시간 기차의 출발, 도착 시간
const axios = require('axios');
const key = require('../../config/train_key');
const baseURL = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=';
const displayopt = '&numOfRows=30&pageNo=1&_type=json'
const infos = '&depPlaceId=NAT010000&arrPlaceId=NAT011668&trainGradeCode=00'

/**
 * 선택한 출발지, 도착지에 따라서 정보를 출력한다.
 */
function makeURL(departId, arrivalId)  {
    return url = baseURL+key.train_key+displayopt+getCurrentDate()+ infos;
}

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


/**
 * train api 요청을 보내고 응답을 받아온다. 
 */
async function live_train() {
    const url = makeURL();
  
    try {
      const res = await axios.get(url);
      console.log('Status', res.status);
  
      const base = res.data.response.body.items.item;
  
      const trainList = base.map((trainInfo) => ({
        trainno: trainInfo.trainno,
        charge: trainInfo.adultcharge,
        depart: trainInfo.depplandtime,
        arrival: trainInfo.arrplandtime,
        traintype: trainInfo.traingradename,
      }));
  
      return {
        getSuccess: true,
        departId: departId,
        arrivalId: exampleInput.arrivalId,
        trainList: trainList,
      };
    } catch (error) {
      console.log('Error', error.message);
      return {
        getSuccess: false,
        error: error.message,
      };
    }
}

live_train().then(result => {
    console.log(result);
})






module.exports.live_train = live_train;