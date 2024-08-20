import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';

import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Map from './components/pages/Map';

import { authService, dbService } from './firebase';
import { positionState, userState } from './store/stateAtoms';
import { collection, getDocs, query, where } from 'firebase/firestore';

const App = () => {
  const navigate = useNavigate();
  const [positionData, setPositonData] = useRecoilState(positionState);
  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    onAuthStateChanged(authService, user => {
      if (user) {
        querySnapShot(user.uid);
      }
    });

    async function querySnapShot(uid) {
      const q = query(collection(dbService, process.env.REACT_APP_FIREBASE_USER_COLLECTION), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const _userData = querySnapshot.docs.map(doc => ({
        ...doc.data(), //합쳐서 보여줌
      }))[0];

      setUserData(_userData);

      //DB에 유저 정보가 있어야 홈페이지로 이동
      if (_userData) {
        navigate('/home');
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude; // 위도
        let longitude = position.coords.longitude; // 경도
        console.log('현재 GPS 위치정보', latitude, longitude);

        setPositonData({ ...positionData, GPS: { latitude: latitude, longitude: longitude } });
      });
    } else {
      console.log(navigator);
      alert('위치정보를 허용해주세요.');
    }
  }, []);

  return (
    <div id="home" className="flex flex-col overflow-hidden items-center justify-center bg-gray-100">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
};

export default App;
