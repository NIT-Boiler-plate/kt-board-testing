import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

// import { createBrowserHistory } from "history";

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
);
