import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Map from './components/pages/Map';
import { useRecoilState } from 'recoil';
import { currentPositionState, userState } from './store/stateAtoms';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './firebase';

const App = () => {
  const [currentPositionData, setCurrentPositionData] = useRecoilState(currentPositionState);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authService, user => {
      if (user) {
        console.log(user);
        navigate('/home');
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude; // 위도
        let longitude = position.coords.longitude; // 경도
        console.log('현재 위치정보', latitude, longitude);

        setCurrentPositionData({ latitude: latitude, longitude: longitude });
      });
    } else {
      console.log(navigator);
      alert('위치정보를 허용해주세요.');
    }
  }, []);

  return (
    <>
      <div className="flex flex-col overflow-hidden items-center justify-center bg-gray-100 h-full">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
