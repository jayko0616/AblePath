const express = require('express')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const stn_nm_code = require('./data/Subway/stn-nm-code');
const stn_info = require('./data/Subway/stn_info');
const get_stId  = require ('./data/Bus/lowbus');
const realtime_arrival = require('./data/Subway/realtimeArrivalSubway');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

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
    get_stId.get_stId(req.body)
    .then(result => {
        return res.status(200)
             .json(result);
    })
})

// 

// const express = require('express')
// const bodyParser = require('body-parser');
// const port = 5000;
// const app = express();

// 
// >>>>>>> Stashed changes