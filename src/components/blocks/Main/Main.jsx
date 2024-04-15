import React, { useCallback, useRef, useState } from 'react';
import Share from '../../../assets/svg/Share';
import Camera from '../../../assets/svg/Camera';
import ListBullet from '../../../assets/svg/List-bullet';
import Cog8tooth from '../../../assets/svg/Cog-8-tooth';

const Main = ({
  boardData,
  handleUpload,
  handleConfirm,
  selectedImage,
  completeImageUrl,
  handleImageChange,
  imageRef,
}) => {
  return (
    <>
      <div className="flex justify-between items-center pt-1">
        <div id="camera-button">
          <label
            className="flex items-center space-x-1 py-1.5 px-3 cursor-pointer bg-gray-100 font-semibold text-sm rounded-md transition-transform duration-10 transform hover:scale-105"
            htmlFor="camera"
          >
            <Camera />
            <span>촬영</span>
          </label>
          <input
            onChange={e => {
              handleImageChange(e, 'camera');
            }}
            type="file"
            id="camera"
            accept="image/*"
            capture="camera"
            style={{ display: 'none' }}
          />
        </div>
        <div id="photo-button">
          <label
            className="flex items-center space-x-1 py-1.5 px-3 cursor-pointer bg-gray-100 font-semibold text-sm rounded-md transition-transform duration-10 transform hover:scale-105"
            htmlFor="photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span>사진</span>
          </label>
          <input
            onChange={e => {
              handleImageChange(e, 'photo');
            }}
            type="file"
            id="photo"
            // accept="image/*"
            // capture="gallery"
            style={{ display: 'none' }}
          />
        </div>
        <div
          id="confirm-button"
          onClick={handleUpload}
          className="flex items-center space-x-1 py-1.5 px-3 cursor-pointer bg-gray-100 font-semibold text-sm rounded-md transition-transform duration-10 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>

          <span>업로드</span>
        </div>

        <div
          id="confirm-button"
          onClick={handleConfirm}
          className="flex items-center space-x-1 py-2 px-3 cursor-pointer bg-gray-100 font-semibold text-sm rounded-md transition-transform duration-10 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>확인</span>
        </div>
      </div>
      <div className="mb-1 border-none"></div>
      <div className="text-sky-500 flex items-center text-sm border-none hover:text-sky-600">
        <span className="mr-1">사진을 꾹 누르시면 이미지 저장과 공유가 가능해요</span>
        <p className={`${completeImageUrl ? 'animate-bounce' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v4.59L7.3 9.24a.75.75 0 0 0-1.1 1.02l3.25 3.5a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </p>
      </div>
      <div className="relative border-none">
        {completeImageUrl && <img className="absolute z-20" src={completeImageUrl} alt="보드판 이미지" />}
      </div>
      <div ref={imageRef} className={`relative border-none`}>
        {selectedImage ? (
          <>
            <img className="w-full cursor-pointer " src={selectedImage} alt="선택 이미지" />
            <tbody className="absolute left-0 bottom-0 bg-white text-xs">
              {boardData.map((data, index) => {
                const { title, content } = data;
                return (
                  <tr key={index} style={{ fontSize: '10px', fontWeight: '500', lineHeight: '1' }}>
                    {title && <td class="border truncate w-10">{title}</td>}
                    {title && <td class="border truncate">{content}</td>}
                  </tr>
                );
              })}
            </tbody>
            <img id="logo-image" src="/images/logo.png" className="absolute bottom-2 right-2 h-5" />
          </>
        ) : (
          <p className="flex h-24 justify-center items-center "></p>
        )}
      </div>
      {selectedImage && <div className="h-72"></div>}
    </>
  );
};

export default Main;
