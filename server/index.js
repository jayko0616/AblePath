const express = require('express')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const stn_nm_code = require('./data/Subway/stn-nm-code');
const get_stId  = require ('./data/Bus/lowbus');
const trainTable = require('./data/Train/trainTable');


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
                console.log(`search_stn_id(${req.body.stn_nm}) getSuccess!`);
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

app.post ('/info/bus/get', function(req, res){
    get_stId.get_stId(req.body)
    .then(result => {
        return res.status(200)
             .json(result);
    })
})


app.post('/info/train/traindata', function(req, res) {
    const dataToSubmit = req.body;
  
    trainTable.live_train(dataToSubmit)
      .then(result => {
        console.log("실행 리턴값:\n", result);
  
        if (result.getSuccess === true) {
          console.log(`live_train(${dataToSubmit}) getSuccess!`);
          return res.status(200).json({
            getSuccess: true,
            trainList: result.trainList,
          });
        } else {
          console.log("err!");
          return res.json({
            getSuccess: false,
            error: result.error,
          });
        }
      });
  });



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