import React, { useCallback, useRef, useState } from 'react';
import Share from '../../../assets/svg/Share';
import Camera from '../../../assets/svg/Camera';
import ListBullet from '../../../assets/svg/List-bullet';
import Cog8tooth from '../../../assets/svg/Cog-8-tooth';

import { toPng } from 'html-to-image';

const Main = ({ formData }) => {
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  }, [ref]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <label
          className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105"
          htmlFor="camera"
        >
          <Camera />
          <span>사진</span>
        </label>
        <input type="file" id="camera" onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
        <div className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105">
          <Cog8tooth />
          <span>설정</span>
        </div>
        <div className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105">
          <ListBullet />
          <span>편집</span>
        </div>
        <div className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-gray-100 rounded transition-transform duration-10 transform hover:scale-105">
          <Share />
          <button
            onClick={() => {
              console.log('ㅎㅇ', window.navigator);
              if (navigator.share) {
                navigator
                  .share({
                    title: 'WebShare API Demo',
                    url: selectedImage,
                  })
                  .then(() => {
                    console.log('Thanks for sharing!');
                  })
                  .catch(console.error);
              } else {
                // fallback
              }
            }}
          >
            공유
          </button>
        </div>
      </div>
      <p class="text-sky-500  hover:text-sky-600">선택한 사진 &rarr;</p>
      <div ref={ref} className="relative" onClick={onButtonClick}>
        <img className="cursor-pointer" src={selectedImage} />

        {selectedImage ? (
          <>
            <div>
              <tbody className="absolute left-0 bottom-0 bg-white text-xs">
                {formData.map(data => {
                  const { title, content } = data;
                  return (
                    <tr>
                      <td class="border p-1">{title}</td>
                      <td class="border p-1">{content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </div>
            <img src="/images/logo.png" className="absolute bottom-2 right-2 h-5" />
          </>
        ) : (
          <p className="flex h-72 justify-center items-center">사진이 없습니다.</p>
        )}
      </div>
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
