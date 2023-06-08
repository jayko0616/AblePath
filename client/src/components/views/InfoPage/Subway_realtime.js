import React from "react";
import './Subway_realtime.css';

function RealtimeBox(props) {
    var up_1st_dest = "";
    var up_1st_arvlMsg2 = "";
    var up_2nd_dest = "";
    var up_2nd_arvlMsg2 = "";

    var dn_1st_dest = "";
    var dn_1st_arvlMsg2 = "";
    var dn_2nd_dest = "";
    var dn_2nd_arvlMsg2 = "";

    var telno = "";
    var elev = "";

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

    if(props.stnInfo.isTelno) telno = props.stnInfo.stn_telno;
    if(props.stnInfo.isElev) elev = props.stnInfo.elevater_txt;

    return(
        <div className="realtime_container" >
            <h2 className="lineNm">{props.selectedStn} {props.selectedLineTxt}</h2>
            <div className="realtime_content">
                <div className="up">
                    <h3 className="updn" id="upline">상행</h3>
                    <div className="uprealtime"> 
                        <span>{props.realtime.cnt0 == 0 && "열차 없음"}</span>
                        <span>{up_1st_dest} {up_1st_arvlMsg2}</span><br></br>
                        <span>{up_2nd_dest} {up_2nd_arvlMsg2}</span>
                    </div>
                </div>
                <div claeeName="dn">
                    <h3 className="updn" id="dnline">하행</h3>
                    <div claeeName="dnrealtime">
                    <span>{props.realtime.cnt1 == 0 && "열차 없음"}</span>
                        <span>{dn_1st_dest} {dn_1st_arvlMsg2}</span><br></br>
                        <span>{dn_2nd_dest} {dn_2nd_arvlMsg2}</span>
                    </div>
                </div>
            </div>
            <div className="stn_info">
                <div className="telno">{telno}</div> <br></br>
                <div className="elev">{elev}</div>
            </div>
        </div>
    )
}

export default RealtimeBox;