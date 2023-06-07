const axios = require('axios');
const key = require('../../config/train_key');
const baseURL = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=';
const displayopt = '&numOfRows=30&pageNo=1&_type=json';
//const infos = '&depPlaceId=NAT010000&arrPlaceId=NAT011668&trainGradeCode=00';

function makeURL(departId, arrivalId) {
  const currentDate = getCurrentDate();
  return `${baseURL}${key.train_key}${displayopt}&depPlaceId=${departId}&arrPlaceId=${arrivalId}&trainGradeCode=00&depPlandTime=${currentDate}`;
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let date = String(now.getDate()).padStart(2, '0');
  const currentDate = `${year}${month}${date}`;

  return currentDate;
}

async function live_train(dataToSubmit) {
  const url = makeURL('NAT010000', 'NAT011668');
  try {
    const res = await axios.get(url);
    console.log('Status:', res.status);
  
    return {
      getSuccess: true,
      data: res.data.response.body.items.item,
    };
  } catch (error) {
    console.log('Error:', error.message);
    return {
      getSuccess: false,
      error: error.message,
    };
  }
}


live_train()
  .then(result => {
    console.log(result);
  });

module.exports.live_train = live_train;