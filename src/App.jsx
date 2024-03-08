import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Map from './components/pages/Map';

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 h-full">
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
