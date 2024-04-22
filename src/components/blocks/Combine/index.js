import React, { useEffect } from 'react';
import Combine from './Combine';
import { boardState, imageUrlState, positionState } from '../../../store/stateAtoms';
import { useRecoilState } from 'recoil';
import { toPng } from 'html-to-image';
import { LOCATION_TITLES } from '../../../constants/home';
import { getDetailAddress } from '../../../util/position';

const Index = ({ imageRef }) => {
  const [positonData, setPositonData] = useRecoilState(positionState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);

  useEffect(() => {
    console.log('useEffect에서 Combine 자동실행');
    handleCombine();

    // 지도에서 선택한 위치 존재 시 -> 테스팅 필요
    if (positonData['SELECT'].latitude) {
      let { latitude, longitude } = positonData['SELECT'];

      async function initSeletedGeolocation() {
        const seletedAddr = await getDetailAddress(latitude, longitude);
        setBoardData(
          boardData.map(data => {
            if (LOCATION_TITLES.includes(data.title)) {
              return { ...data, content: '*' + seletedAddr };
            }
            return data;
          }),
        );
      }

      initSeletedGeolocation();
    }
  }, [imageUrl['ORIGINAL'].url]);

  const handleCombine = async () => {
    console.log('handleCombine 실행');
    let _combinedUrl;

    try {
      for (let i = 0; i < 3; i++) {
        _combinedUrl = await toPng(imageRef.current);
      }
      setImageUrl({ ...imageUrl, COMBINE: { url: _combinedUrl } });
    } catch (error) {
      console.log('Result에서 toPng 에러');
    }
  };

  return <Combine {...{ handleCombine }} />;
};

export default Index;
