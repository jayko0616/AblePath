const axios = require('axios');

async function route_search(dataToSubmit) {
    
    const url = 'https://apis.openapi.sk.com/transit/routes';

    const headers = {
        accept: "application/json",
        appKey: "X0Ry9Cesoeax9bJHR1q9y9QtYQH5uUhq3KI7BYLN",
        "content-type": "application/json"
    }

    try{
        const res = await axios.post(url, dataToSubmit, {headers})
        console.log(res.status);
        console.log(res.data);
    }
    catch(error) {
        console.log(error);
    }
    
   /*
    const options = {
        method: 'POST',
        url: 'https://apis.openapi.sk.com/transit/routes',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          appKey: 'X0Ry9Cesoeax9bJHR1q9y9QtYQH5uUhq3KI7BYLN'
        },
        data: {
          startX: '126.926493082645',
          startY: '37.6134436427887',
          endX: '127.126936754911',
          endY: '37.5004198786564',
          lang: 0,
          format: 'json',
          count: 10,
          searchDttm: '202301011200'
        }
    };

    axios.request(options)
        .then(function (response) {
            console.log(response.data);
         })
        .catch(function (error) {
            console.error(error);
        });
        */
}

let body = {
    "startX": "127.02550910860451",
	"startY": "37.63788539420793",
	"endX": "127.030406594109",
	"endY": "37.609094989686",
	"count" : 1,
	"lang": 0,
	"format":"json"
}

route_search(body)

/**
 res.result 결과 

 */