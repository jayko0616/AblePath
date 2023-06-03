import axios from 'axios'

export async function get_realtime_arrival(dataToSubmit) {
    const request = await axios.post('/info/subway/realtimeArrival', dataToSubmit)
        .then(response => response.data)

    return {
        type: "sub_realtime_arrv",
        payload: request
    }
}

