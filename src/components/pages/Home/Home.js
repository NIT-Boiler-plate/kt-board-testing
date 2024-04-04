import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Row from '../../blocks/Row';
import Main from '../../blocks/Main';
import Board from '../../blocks/Board';
import { getAuth, signOut } from 'firebase/auth';

const Home = ({ userData, setUserData, currentPositionData }) => {
  const auth = getAuth();
  const navigator = useNavigate();

  return (
    <div class="flex flex-col h-screen sm:py-6">
      <div class="bg-white overflow-auto px-3 pt-4 shadow-xl ring-1 ring-gray-900/5 h-screen sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-6">
        <div class="mx-auto max-w-md">
          <div className="flex justify-between items-center pb-1.5 text-black">
            <img className="h-7" src="/images/logo.png" alt="kt logo" />
            <div
              onClick={() => {
                signOut(auth).then(() => {
                  console.log('로그아웃성공');
                  navigator('/');
                  // window.location.reload();
                });
              }}
              className="flex font-semibold  text-gray-500 mx-1 hover:text-black"
            >
              Logout
            </div>
          </div>
          <div class="divide-y divide-gray-300/50">
            <Board {...{ userData }} {...{ currentPositionData }} />
            <Main />{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
