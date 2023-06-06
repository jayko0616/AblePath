import axios from 'axios';

export function get_route(dataToSubmit){
    const request = axios.post('/route/path', dataToSubmit)
    .then(response => response.data)

    return{
        type: "route_path",
        payload: request
    }
}
