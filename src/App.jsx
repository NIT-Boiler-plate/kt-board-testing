import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Map from './components/pages/Map';
import { useRecoilState } from 'recoil';
import { geoState } from './store/stateAtoms';

const App = () => {
  const [geoData, setGeoData] = useRecoilState(geoState);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude; // 위도
        let longitude = position.coords.longitude; // 경도

        console.log('현재위치', latitude, longitude);
        setGeoData({ latitude: latitude, longitude: longitude });
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col overflow-hidden items-center justify-center bg-gray-100 h-full">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
