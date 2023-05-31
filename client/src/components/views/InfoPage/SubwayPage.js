import React, { useEffect, useRef } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ReactComponent as SubwayStn} from '../../images/subway_stn5.svg';
import { ReactComponent as Line1 } from '../../images/line1.drawio.svg';
import { ReactComponent as Line2 } from '../../images/line2.drawio.svg';
import { ReactComponent as Line3 } from '../../images/line3.svg';
import { ReactComponent as Line4 } from '../../images/line4.svg';
import { ReactComponent as Line5 } from '../../images/line5.drawio.svg';
import { ReactComponent as Line6 } from '../../images/line6.svg';
import { ReactComponent as Line7 } from '../../images/line7.drawio.svg';
import { ReactComponent as Line8 } from '../../images/line8.drawio.svg';
import { ReactComponent as Line9 } from '../../images/line9.drawio.svg';
import { ReactComponent as River } from '../../images/han_river.drawio.svg';
import { ReactComponent as Gyeongui } from '../../images/gyeongui.svg';
import './/SubwayPage.css';

function SubwayPage() {

  

  return (
    <div>
      <Header />
      subway page 입니다.
      <div className="subway-map-container">
        <River className="line" id="river_line"/>
        <Line1 className="line" id="1_line"/>
        <Line2 className="line" id="2_line"/>
        <Line3 className="line" id="3_line"/>
        <Line4 className="line" id="4_line"/>
        <Line5 className="line" id="5_line"/>
        <Line6 className="line" id="6_line"/>
        <Line7 className="line" id="7_line"/>
        <Line8 className="line" id="8_line"/>
        <Line9 className="line" id="9_line"/>
        <Gyeongui className="line" id="gyeongui_line"/>
      </div>
      <Footer className="footer"/>
    </div>
  );
}

export default SubwayPage;