import React, {useEffect} from "react";

function RealtimeBox(props) {
    useEffect(() => {
        console.log("RealtimeBox Rendering>>>", props.selectedStn)
    }, [props.realtime])

    //props.realtime 에 들어있는 정보들 가지고
    
    return(
        <div className="realtime_container" >
            <img className="realtime_img" alt="realtimeArrival" src="../../images/tooltip.png"/>
            {props.selectedStn}
        </div>
    )
}

export default RealtimeBox;