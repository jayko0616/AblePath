const express = require('express')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const get_route = require('./data/Route/route_search');
const stn_nm_code = require('./data/Subway/stn-nm-code');
const bus_station  = require ('./data/Bus/bus_station');

const stn_info = require('./data/Subway/stn_info');
const get_stId  = require ('./data/Bus/lowbus');
const trainTable = require('./data/Train/trainTable');
const realtime_arrival = require('./data/Subway/realtimeArrivalSubway');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());

app.listen(port, () => console.log(`AblePath app listening on port ${port}`))

/**
 * req : client가 보낸 요청 전체
 * req.body : 그 중 우리가 정의한 인수들 -- dataToSubmit
 * res : client에게 돌려줄 응답 결과 - 성공 여부(status)와 data(json)
 * */
app.post('/info/subway/getStnCd', (req, res) => {
    stn_nm_code.search_stn_id(req.body)
        .then(result => {
            console.log("search_stn_id 실행 리턴값:\n", result);

            if(result.getSuccess === true){
                console.log(`search_stn_id(${req.body.stn_nm}) Success!`);
                return res.status(200)
                    .json(result)

            }
            else{
                console.log("err!");
                return res.json({
                    getSuccess: false
                });
            }
                
        })
})

app.post('/info/subway/realtimeArrival', (req, res) => {
    realtime_arrival.realtime_arrival(req.body)
        .then(result => {
            if(result.getSuccess === true) {
                console.log(`realtimaArrival(${req.body.stn_nm}) Success!`);
                return res.status(200)
                .json(result)
            }

            else {
                return res.json(result)
            }
        })
})

app.post('/route/path', (req, res) => {
    get_route.route_search(req.body) 
        .then(result => {
            if(result.getSuccess === true) {
                console.log("route_search Success!");
                return res.status(200)
                        .json(result)
            }
            else {
                return res.json(result);
            }
        })
})

app.post('/info/subway/getStnInfo', (req, res) => {
    stn_info.stn_info(req.body)
        .then(result => {

            if(result.getSuccess === true) {
                console.log(`>>>>get_stn_info(${req.body.stn_nm}) Success!`)
                return res.status(200)
                    .json(result)
            }
            else {
                console.log("get_stn_info failed");
                return res.json(result)
            }
        })
})

app.post ('/info/bus/get', function(req, res){
    bus_station.get_st_loc(req.body)
    .then(result => {
        if(result.getSuccess === true){
            return res.status(200)
             .json(result);
        }
        else{
            return  res.json(result);

        }

    })
})


app.get('/route/map', (req, res) => {
    const map_key = require('./config/map_key.js')
    console.log("send map key.");
    return res.send(map_key.tmap_key);
});

app.post ('/info/train/getTraintable', function(req, res){
    console.log("index reached")
    trainTable.live_train(req.body)
    .then(result => {
        if(result.getSuccess === true){
            return res.status(200)
             .json(result);
        }
        else{
            return  res.json(result);
        }
    })
})




// 

// const express = require('express')
// const bodyParser = require('body-parser');
// const port = 5000;
//const app = express();

// 
// >>>>>>> Stashed changes


/*


// 다른 라우터와 앱 설정...

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});

*/

