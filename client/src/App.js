import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import MainPage from './components/views/MainPage/MainPage'
import AbleLabelPage from './components/views/AbleLabelPage/AbleLabelPage'
import AboutUsPage from './components/views/AboutUsPage/AboutUsPage'
import NaviPage from './components/views/NaviPage/NaviPage'
import TransportationPage from './components/views/TransportationPage/TransportationPage'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<MainPage/>}></Route>
      <Route exact path="/ablelabel" element={<AbleLabelPage/>}></Route>
      <Route exact path="/aboutus" element={<AboutUsPage/>}></Route>
      <Route exact path="/navi" element={<NaviPage/>}></Route>
      <Route exact path="/transporation" element={<TransportationPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
