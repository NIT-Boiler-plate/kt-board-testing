import React from 'react';
import Result from './Result';
import { useRecoilState } from 'recoil';
import { boardState, imageUrlState } from '../../../store/stateAtoms';

// 결과물을 보여주는 컴포넌트
const Index = ({ imageRef }) => {
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);

  return <Result {...{ imageRef }} {...{ boardData }} {...{ imageUrl }} />;
};

export default Index;
