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
        console.log(res.data.metaData.plan);

        var minTransfer = 10;
        var minTotaltime = 10000;
        var minIdx = 0;

        for(i = 0; i < dataToSubmit.count; i++){
            var transCnt = res.data.metaData.plan.itineraries[i].transferCount;
            var time = res.data.metaData.plan.itineraries[i].totalTime;
            
            if( transCnt < minTransfer){
                minTransfer = transCnt;
                minTotaltime = time;
                minIdx = i;
            }

            else if(transCnt == minTransfer){
                if(time < minTotaltime){
                    minTotaltime = time;
                    minIdx = i;
                }
            }
        }

        const list = res.data.metaData.plan.itineraries[minIdx];
    
        var json = {};
        json.routeList = list; 
        json.getSuccess = true;

        console.log(json);
        
        return json;

    }
    catch(error) {
        console.log(error);

        return {
            getSuccess: false
        };
    }

}

let body = {
    "startX": "127.02550910860451",
	"startY": "37.63788539420793",
	"endX": "127.030406594109",
	"endY": "37.609094989686",
	"count" : 5,
	"lang": 0,
	"format":"json",
    "searchDttm": '202301011200'
}

//route_search(body)

module.exports.route_search = route_search