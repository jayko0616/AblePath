import axios from 'axios';

export function get_bus(dataToSubmit){
    const request = axios.get('/info/bus/get', dataToSubmit)
    .then(response => response.data)

    return{
        payload: request
    }
}
