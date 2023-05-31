/*const axios = require('axios');

var url = 'https://apis.data.go.kr/1613000/ExpBusInfoService/getExpBusTrminlList?serviceKey=%2BZv9hPmS6mOwrU8rWvnNbtY3fQm2aGk6SK4q3NcBQ9hmatKRNc50lC%2Fm5gAb0wOv5V71nzLUz1CASUqsYmYK8g%3D%3D&numOfRows=300&pageNo=1&_type=xml';

axios({
    method : 'get',
    url : url,
}).then((res) => {
    console.log('Status', res.status, res.statusText);
    console.log('Header', res.headers);
    console.log('Data', res.data);
})*/

var request = require('request');

var url = 'http://apis.data.go.kr/1613000/ExpBusArrInfoService/getExpBusTmnList';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=%2BZv9hPmS6mOwrU8rWvnNbtY3fQm2aGk6SK4q3NcBQ9hmatKRNc50lC%2Fm5gAb0wOv5V71nzLUz1CASUqsYmYK8g%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('300'); /* */
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});