import axios from 'axios'

/**
 * 
 * @param {*} dataToSubmit 
 * {stn_nm: "백석", stn_line: "1003"}
 * @return
 */
export async function get_realtime_arrival(dataToSubmit) {
    const request = await axios.post('/info/subway/realtimeArrival', dataToSubmit)
        .then(response => response.data)

    return {
        type: "sub_realtime_arrv",
        payload: request
    }
}

/**
 * 
 * @param {*} dataToSubmit - stn_nm, line_nm 
 * @returns getSuccess, stn_telno, elevater_txt
 * 경중의 line_nm = '중앙선'
 */
export async function get_stn_info(dataToSubmit) {
    const request = await axios.post('/info/subway/getStnInfo', dataToSubmit)
        .then(response => response.data)
    return {
        type: "sub_stn_info",
        payload: request,
    }
}
