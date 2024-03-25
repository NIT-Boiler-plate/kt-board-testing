import React from 'react';
import { Link } from 'react-router-dom';
import Row from '../../blocks/Row';
import Main from '../../blocks/Main';

const Home = ({ boardData, handleFormChange, handleSubmit }) => {
  return (
    <div class="flex flex-col h-screen sm:py-6">
      <div class="bg-white overflow-auto px-3 pt-4 shadow-xl ring-1 ring-gray-900/5 h-screen sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-6">
        <div class="mx-auto max-w-md">
          <div className="flex justify-between items-center pb-8 text-black">
            <img className="h-7" src="/images/logo.png" alt="Your Company" />

            <div className="flex font-semibold  text-gray-500">
              {/* <Link className="mx-2 hover:text-black">Dash</Link> */}
              {/* <Link className="mx-2 hover:text-black">My page</Link> */}
              <Link className="mx-1 hover:text-black" to="/">
                Logout
              </Link>
            </div>
          </div>
          <div class="divide-y divide-gray-300/50">
            <div class="space-y-2 pb-4 text-base leading-5 text-gray-600">
              {boardData.map((data, index) => (
                <Row data={data} index={index} handleChange={handleFormChange} handleSubmit={handleSubmit} />
              ))}
              <ul class="space-y-2"></ul>

              <div className="flex justify-end items-center border-none space-x-2">
                <span class="bg-white ms-3  font-medium text-gray-900 dark:text-gray-300 ">공사 선택</span>
                <label class="inline-flex items-center cursor-pointer border-none">
                  <input type="checkbox" value="" class="sr-only peer" />
                  <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            {/* 토글버튼구현 */}
            <div class="border-top pt-2 text-base font-semibold leading-7">
              <Main />
            </div>
            {/* <div className="b">안녕</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
