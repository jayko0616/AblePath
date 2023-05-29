import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitials';
import * as ReactDOMClient from "react-dom/client";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import { configureStore } from '@reduxjs/toolkit'


const devTools = window._REDUX_DEVTOOLS_EXTENSION_ &&
                window._REDUX_DEVTOOLS_EXTENSION_();

const store = configureStore({
  reducer: Reducer,
  middleware: [promiseMiddleware, ReduxThunk],
  //devTools: devTools
})

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
