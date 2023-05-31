import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ReactComponent as Line1 } from '../../images/line1.svg';
import { ReactComponent as Line2 } from '../../images/line2.svg';
import { ReactComponent as Line3 } from '../../images/line3.svg';
import { ReactComponent as Line4 } from '../../images/line4.svg';
import { ReactComponent as Line5 } from '../../images/line5.svg';
import { ReactComponent as Line6 } from '../../images/line6.svg';
import { ReactComponent as Line7 } from '../../images/line7.svg';
import { ReactComponent as Line8 } from '../../images/line8.svg';
import { ReactComponent as Line9 } from '../../images/line9.svg';
import { ReactComponent as River } from '../../images/han_river.svg';
import { ReactComponent as Gyeongui } from '../../images/gyeongui.svg';
import { ReactComponent as Gyeonggang } from '../../images/gyeonggang.svg';
import { ReactComponent as Gyeongchun } from '../../images/gyeongchun.svg';
import { ReactComponent as Suin } from '../../images/suinbundang.svg';
import { ReactComponent as Ui } from '../../images/ui.svg';
import { ReactComponent as Sillim } from '../../images/sillim.svg';
import { ReactComponent as Shinbundang } from '../../images/shinbundang.svg';
import './/SubwayPage.css';

function SubwayPage() {

  const [visibleH, setVisibleH] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  const [visibleGU, setVisibleGU] = useState(false); //Gyeongui 경의선
  const [visibleGG, setVisibleGG] = useState(false); //GyeongGang 경강선
  const [visibleGC, setVisibleGC] = useState(false); //Gyeonchun 경춘선
  const [visibleSU, setVisibleSU] = useState(false); //Suin 수인분당
  const [visibleUI, setVisibleUI] = useState(false); //Ui 우이신설
  const [visibleSL, setVisibleSL] = useState(false); //Sillim 신림선
  const [visibleSH, setVisibleSH] = useState(false); //Shinbundang 신분당

  /**
   * @param {*} 
   * 선택된 라인만 선명하게 보여준다. && 역 클릭시 도착 정보 표시 
   */
  const show_line = (e) => {
    console.log(e.target.value);
    const selected = e.target.value;
    if(selected === "1") setVisible1(true);
    else if(selected === "2") setVisible2(true);
    else if(selected === "3") setVisible3(true);
    else if(selected === "4") setVisible4(true);
    else if(selected === "5") setVisible5(true);
  }

  return (
    <div>
      <Header />
      <form>
        <select name="show_line_route" onChange={show_line}>
          <option value="ALL">전체</option>
          <option value="1">1호선</option>
          <option value="2">2호선</option>
          <option value="3">3호선</option>
          <option value="4">4호선</option>
          <option value="5">5호선</option>
          <option value="6">6호선</option>
          <option value="7">7호선</option>
          <option value="8">8호선</option>
          <option value="9">9호선</option>
          <option value="GU">경의선</option>
          <option value="GG">경강선</option>
          <option value="GC">경춘선</option>
          <option value="SU">수인분당</option>
          <option value="SH">신분당</option>
          <option value="UI">우이신설</option>
          <option value="SL">신림선</option>
        </select>
      </form>
      
      <div className="subway-map-container">
        <River className={`line ${visibleH? 'on':''}`} id="river_line"/>
        <Line1 className={`line ${visible1? 'on':''}`} id="1_line"/>
        <Line2 className={`line ${visible2? 'on':''}`} id="2_line"/>
        <Line3 className={`line ${visible3? 'on':''}`} id="3_line"/>
        <Line4 className={`line ${visible4? 'on':''}`} id="4_line"/>
        <Line5 className={`line ${visible5? 'on':''}`} id="5_line"/>
        <Line6 className={`line ${visible6? 'on':''}`} id="6_line"/>
        <Line7 className={`line ${visible7? 'on':''}`} id="7_line"/>
        <Line8 className={`line ${visible8? 'on':''}`} id="8_line"/>
        <Line9 className={`line ${visible9? 'on':''}`} id="9_line"/>
        <Gyeongui className={`line ${visibleGU? 'on':''}`} id="gyeongui_line"/>
        <Gyeonggang className={`line ${visibleGG? 'on':''}`} id="gyeonggang_line"/>
        <Gyeongchun className={`line ${visibleGC? 'on':''}`} id="gyeongchun_line"/>
        <Suin className={`line ${visibleSU? '':'out'}`} id="suin_line"/>
        <Ui className={`line ${visibleUI? '':'out'}`} id="ui_line"/>
        <Sillim className={`line ${visibleSL? 'on':''}`} id="sillim_line"/>
        <Shinbundang className={`line ${visibleSH? 'on':''}`} id="shinbundang_line"/>
      </div>

      <Footer className="footer"/> 
    </div>
  );
}

export default SubwayPage;