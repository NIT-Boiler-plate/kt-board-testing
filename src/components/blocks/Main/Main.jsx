import React, { useCallback, useRef, useState } from 'react';
import Share from '../../../assets/svg/Share';
import Camera from '../../../assets/svg/Camera';
import ListBullet from '../../../assets/svg/List-bullet';
import Cog8tooth from '../../../assets/svg/Cog-8-tooth';

const Main = ({
  boardData,
  setBoardData,
  handleShare,
  handleConfirm,
  selectedImage,
  setSelectedImage,
  completeImageUrl,
  postData,
  setPostData,
  handleClick,
  handleImageChange,
  imageRef,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div
          onClick={handleConfirm}
          className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path
              fill-rule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>적용</span>
        </div>

        <label
          className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105"
          htmlFor="camera"
        >
          <Camera />
          <span>사진</span>
        </label>
        <input onChange={handleImageChange} type="file" id="camera" accept="image/*" style={{ display: 'none' }} />

        {/* <div
          onClick={handleShare}
          className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105"
        >
          <Share />
          <button>공유</button>
        </div> */}
      </div>
      {/* <div className="mb-3"></div> */}
      <div className="text-sky-500 flex items-center text-sm hover:text-sky-600">
        <span className="ml-2 mr-1">사진을 꾹 누르시면 이미지 저장과 공유가 가능해요</span>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
          <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
        </svg> */}

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
      <div className="relative">
        {completeImageUrl && <img className="absolute z-20" src={completeImageUrl} alt="보드판 이미지"></img>}
      </div>
      <div ref={imageRef} className={`relative`} onClick={handleClick}>
        {selectedImage ? (
          <>
            <img className="w-full cursor-pointer " src={selectedImage} alt="선택 이미지" />
            <div id="board-table">
              <tbody className="left-0 bottom-0 bg-white text-xs">
                {boardData.map((data, index) => {
                  const { title, content } = data;
                  return (
                    <tr key={index}>
                      <td class="border p-1 truncate w-10">{title}</td>
                      <td class="border p-1 truncate">{content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </div>
            <img id="logo-image" src="/images/logo.png" className="absolute bottom-2 right-2 h-5" />
          </>
        ) : (
          <p className="flex h-24 justify-center items-center">사진이 없습니다.</p>
        )}
      </div>
      {selectedImage && <div className="h-72"></div>}
    </>
  );
};

export default Main;

// 0. arrow-down-circle : pull dowun 이미지
// 1. camera
// 2.arrow-left-start-on-rectangle: 사진첩
// 3.cog-6-tooth: setting
// 4. list-bullet
// 5. share

{
  /* <div className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105">
          <Cog8tooth />
          <span>설정</span>
        </div>
        <div className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105">
          <ListBullet />
          <span>편집</span>
        </div> */
}
