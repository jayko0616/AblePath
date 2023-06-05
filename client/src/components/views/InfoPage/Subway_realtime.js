import React, {useEffect, useState} from "react";
import './Subway_realtime.css';

function RealtimeBox(props) {

   // const [up_1st_dest, setUp_1st_dest] = useState("");
    //const [up_2nd_dest, setUp_2nd_dest] = useState("");
    //const [dn_1st_dest, setDn_1st_dest] = useState("");
    //const [dn_2nd_dest, setDn_2nd_dest] = useState("");

    var up_1st_dest = "";
    var up_1st_arvlMsg2 = "";
    var up_2nd_dest = "";
    var up_2nd_arvlMsg2 = "";

    var dn_1st_dest = "";
    var dn_1st_arvlMsg2 = "";
    var dn_2nd_dest = "";
    var dn_2nd_arvlMsg2 = "";

    //props.realtime 에 들어있는 정보들 가지고

    if(props.realtime.cnt0 === 1) {
        up_1st_dest = props.realtime.up_1st_dest;
        up_1st_arvlMsg2 = props.realtime.up_1st_arvlMsg2;
    }
    else if(props.realtime.cnt0 === 2){
        up_1st_dest = props.realtime.up_1st_dest;
        up_1st_arvlMsg2 = props.realtime.up_1st_arvlMsg2;
        up_2nd_dest = props.realtime.up_2nd_dest;
        up_2nd_arvlMsg2 = props.realtime.up_2nd_arvlMsg2;
    }

    if(props.realtime.cnt1 === 1) {
        dn_1st_dest = props.realtime.dn_1st_dest;
        dn_1st_arvlMsg2 = props.realtime.dn_1st_arvlMsg2;
    }
    else if(props.realtime.cnt1 === 2){
        dn_1st_dest = props.realtime.dn_1st_dest;
        dn_1st_arvlMsg2 = props.realtime.dn_1st_arvlMsg2;
        dn_2nd_dest = props.realtime.dn_2nd_dest;
        dn_2nd_arvlMsg2 = props.realtime.dn_2nd_arvlMsg2;
    }


    return(
        <div className="realtime_container" >
            <h2 className="lineNm">{props.selectedStn} {props.selectedLineTxt}</h2>
            <div className="realtime_content">
                <div className="up">
                    <h3 className="updn" id="upline">상행</h3>
                    <div className="uprealtime">
                        <h4>{up_1st_dest} {up_1st_arvlMsg2}</h4>
                        <h4>{up_2nd_dest} {up_2nd_arvlMsg2}</h4>
                    </div>
                </div>
            
                <div claeeName="dn">
                    <h3 className="updn" id="dnline">하행</h3>
                    <div claeeName="dnrealtime">
                        <h4>{dn_1st_dest} {dn_1st_arvlMsg2}</h4>
                        <h4>{dn_2nd_dest} {dn_2nd_arvlMsg2}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RealtimeBox;