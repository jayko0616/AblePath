const axios = require('axios');

var url = 'http://swopenAPI.seoul.go.kr/api/subway/72636764687476313735426a59646c/json/realtimePosition/0/5/1호선 ';

axios({
    method : 'get',
    url : url,
}).then((res) => {
    console.log('Status', res.status, res.statusText);
    console.log('Header', res.headers);
    console.log('Data', res.data);
})
