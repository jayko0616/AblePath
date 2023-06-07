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