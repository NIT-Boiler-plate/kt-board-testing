import React from 'react';
import { Link } from 'react-router-dom';
import Row from '../../blocks/Row';
import Main from '../../blocks/Main';

const Home = ({ formData, handleFormChange, handleSubmit }) => {
  console.log('Home', formData);
  return (
    <div class="relative flex flex-col overflow-hidden bg-gray-100 sm:py-6">
      <div class="relative bg-white px-3 pt-4 shadow-xl ring-1 ring-gray-900/5 h-screen sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-6">
        <div class="mx-auto max-w-md">
          <div className="flex justify-between items-center pb-8 text-black">
            <Link to="/map">
              <img className="h-5" src="/images/logo.png" alt="Your Company" />
            </Link>

            <div className="flex font-semibold  text-gray-500">
              <Link className="mx-2 hover:text-black">Dash</Link>
              <Link className="mx-2 hover:text-black">My page</Link>
              <Link className="mx-1 hover:text-black" to="/">
                Logout
              </Link>
            </div>
          </div>
          <div class="divide-y divide-gray-300/50">
            <div class="space-y-2 pb-4 text-base leading-5 text-gray-600">
              {formData.map((data, index) => (
                <Row data={data} index={index} handleChange={handleFormChange} handleSubmit={handleSubmit} />
              ))}
              <ul class="space-y-2"></ul>
            </div>
            <div class="border-top pt-2 text-base font-semibold leading-7">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
