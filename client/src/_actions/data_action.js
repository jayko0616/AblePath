import axios from 'axios';

export function get_bus(dataToSubmit){
    const request = axios.post('/info/bus/get', dataToSubmit)
    .then(response => response.data)

    return{
        type: "bus_search",
        payload: request
    }
}
