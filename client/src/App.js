import logo from './logo.svg';
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



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<MainPage/>}></Route>
      <Route exact path="/route" element={<RoutePage/>}></Route>
      <Route exact path="/info" element={<InfoPage/>}></Route>
      <Route exact path="/info/subway" element={<SubwayPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
