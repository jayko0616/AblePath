import axios from 'axios';

export function get_bus(dataToSubmit){
    const request = axios.post('/info/bus/get', dataToSubmit)
    .then(response => response.data)

    return{
        type: "bus_search",
        payload: request
    }
}

export function get_arrive(dataToSubmit){
    const request = axios.post('/info/bus/arrive', dataToSubmit)
    .then(response => response.data)
    return{
        type: "bus_arrive",
        payload: request
    }
}
/*export async function train_arrival(dataToSubmit) {
  console.log("action reached")
  console.log(dataToSubmit.departId)
  console.log(dataToSubmit.arrivalId)
  const request = await axios.post('/info/train/getTraintable', dataToSubmit)
      .then(response => response.data)
  return {
      type: TRAINTABLE,
      payload: request
  }
}*/

export function train_arrival(dataToSubmit){
    const request = axios.post('/info/train/getTraintable', dataToSubmit)
    .then(response => response.data)
    return{
        type: "getTraintable",
        payload: request
    }
}
