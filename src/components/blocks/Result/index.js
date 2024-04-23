import React from 'react';
import Result from './Result';
import { useRecoilState } from 'recoil';
import { boardState, imageUrlState } from '../../../store/stateAtoms';

// 결과물을 보여주는 컴포넌트
const Index = ({ imageRef }) => {
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);

  const handleDownload = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // 아이폰은 꾹 눌러서 다운로드 받게하기
    if (isIOS) {
      return;
    }

    if (!imageUrl['ORIGINAL'].url) {
      alert('사진이 없습니다.');
    }

    const a = document.createElement('a');
    a.href = imageUrl['COMBINE'].url;
    a.download = 'downloaded_image.jpg'; // 다운로드할 파일 이름
    a.click(); // 링크 클릭 유도
  };

  return <Result {...{ imageRef }} {...{ boardData }} {...{ imageUrl }} {...{ handleDownload }} />;
};

export default Index;
