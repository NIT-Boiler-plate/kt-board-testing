import { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../atoms/Input';
import Dropdown from '../../atoms/Dropdown';

import ArrowDownCircle from '../../../assets/svg/Arrow-down-circle';
import MapPin from '../../../assets/svg/Map-pin';

const Board = ({ selectedIndex, setSelectedIndex, boardData, handleFormChange }) => {
  const readOnlyList = ['점검위치', '점검장소', '주소', '점검일시', '장소', '날짜', '점검일'];

  return (
    <div class="space-y-1 text-base leading-5 text-gray-600">
      {boardData.map(({ title, content }, index) => (
        <div class="flex justify-center items-center space-x-2 ">
          <Input className="w-1/4 m-0 text-center" name="title" value={title} index={index} readOnly={true} />
          <Input
            className="w-3/4"
            name="content"
            value={content}
            index={index}
            onChange={handleFormChange}
            readOnly={readOnlyList.includes(title) ? true : false}
          />
          <div className="relative cursor-pointer">
            {title === '점검장소' || title === '주소' ? (
              <Link to="/map">
                <MapPin className="hover:animate-bounce" />
              </Link>
            ) : (
              <div
                onClick={() => {
                  // 동일한 버튼 클릭시 닫기
                  if (selectedIndex === index) {
                    setSelectedIndex(null);
                  } else {
                    setSelectedIndex(index);
                  }
                }}
              >
                <ArrowDownCircle />
                <Dropdown isOpend={selectedIndex === index} />
              </div>
            )}
          </div>
        </div>
      ))}
      <ul class="space-y-2"></ul>
      <div className="flex justify-between"></div>
    </div>
  );
};

export default Board;
