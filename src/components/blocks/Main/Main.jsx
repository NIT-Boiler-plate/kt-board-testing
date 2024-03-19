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
      <button onClick={handleConfirm}>확인</button>
      <div onChange={handleImageChange} className="flex justify-between items-center">
        <label
          className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105"
          htmlFor="camera"
        >
          <Camera />
          <span>사진</span>
        </label>
        <input type="file" id="camera" accept="image/*" style={{ display: 'none' }} />
        <div className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105">
          <Cog8tooth />
          <span>설정</span>
        </div>
        <div
          onClick={handleShare}
          className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105"
        >
          <Share />
          <button>공유</button>
        </div>
      </div>
      <p class="text-sky-500 hover:text-sky-600">사진을 꾹 눌러주세요 &rarr;</p>
      <div className="relative">
        {completeImageUrl && <img className="absolute z-20" src={completeImageUrl} alt="완벽해"></img>}
      </div>
      <div ref={imageRef} className={`relative`} onClick={handleClick}>
        {selectedImage ? (
          <>
            <img className="cursor-pointer" src={selectedImage} alt="선택 이미지" />
            <div id="board-table">
              <tbody className="absolute left-0 bottom-0 bg-white text-xs">
                {boardData.map((data, index) => {
                  const { title, content } = data;
                  return (
                    <tr key={index}>
                      <td class="border p-1">{title}</td>
                      <td class="border p-1">{content}</td>
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
