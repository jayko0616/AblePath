import axios from 'axios';

export function get_bus(dataToSubmit){
    const request = axios.post('/info/bus/get', dataToSubmit)
    .then(response => response.data)

    return{
        type: "bus_search",
        payload: request
    }
}

export function train_arrival(body) {
    return dispatch => {
      return axios.post('/info/train/traindata', body)
        .then(response => {
          const payload = response.data; // 응답 데이터를 payload로 설정
          dispatch({
            type: "getTraindata",
            payload: payload
          });
          return payload; // 응답 데이터 반환
        });
    };
  }