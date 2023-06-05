import React, { useEffect } from "react";
import {ReactComponent as SubwayMap} from '../../images/subway_map.svg'
import {ReactComponent as Line1} from '../../images/line1.svg';
//import Line1 from './Line1'
import {ReactComponent as Line2} from '../../images/line2.svg';
import {ReactComponent as Line3} from '../../images/line3.svg';
import {ReactComponent as Line4} from '../../images/line4.svg';
import {ReactComponent as Line5} from '../../images/line5.svg';
import {ReactComponent as Line6} from '../../images/line6.svg';
import {ReactComponent as Line7} from '../../images/line7.svg';
import {ReactComponent as Line8} from '../../images/line8.svg';
import {ReactComponent as Line9} from '../../images/line9.svg';
import {ReactComponent as Gyeongui} from '../../images/gyeongui.svg';
import {ReactComponent as Gyeonggang} from '../../images/gyeonggang.svg';
import {ReactComponent as Gyeongchun} from '../../images/gyeongchun.svg';
import {ReactComponent as Suin } from '../../images/suinbundang.svg';
import {ReactComponent as Shinbundang} from '../../images/shinbundang.svg';
import {ReactComponent as Ui} from '../../images/ui.svg';
import {ReactComponent as Sillim} from '../../images/sillim.svg';





const line = {
    1: Line1,
    2: Line2,
    3: Line3,
    4: Line4, 
    5: Line5,
    6: Line6, 
    7: Line7, 
    8: Line8, 
    9: Line9, 
    GU: Gyeongui,
    GG: Gyeonggang,
    GC: Gyeongchun,
    SU: Suin,
    SH: Shinbundang,
    UI: Ui,
    SL: Sillim,
    ALL: SubwayMap,
};

function LineComponent(props) {
    /*
    useEffect(() => {
        console.log('LineComponent 렌더링:', props.selectedComponent)
    }, [props.selectedComponent]);
    */

    
    const SelectLine = line[props.selectedComponent];
    
    return <SelectLine selectedComponent = {props.selectedComponent} onClick={props.onClick}/>;
}

export default LineComponent;