import logo from './logo.png';
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import MainPage from './components/views/MainPage/MainPage'
import RoutePage from './components/views/RoutePage/RoutePage'
import InfoPage from './components/views/InfoPage/InfoPage'
import SubwayPage from './components/views/InfoPage/SubwayPage'
import BusPage from './components/views/InfoPage/BusPage'
import TrainPage from './components/views/InfoPage/TrainPage'


function App() {
  return (
    <div >
      <div className='App-header'>
        <img src={logo} className="App-logo" alt="logo"/>
          <a>Able Path</a>
      </div>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<MainPage/>}></Route>
      <Route exact path="/route" element={<RoutePage/>}></Route>
      <Route exact path="/info" element={<InfoPage/>}></Route>
      <Route exact path="/info/subway" element={<SubwayPage/>}></Route>
      <Route exact path="/info/bus" element={<BusPage/>}></Route>
      <Route exact path="/info/train" element={<TrainPage/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;