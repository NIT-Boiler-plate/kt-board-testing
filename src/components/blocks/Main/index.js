import { useRecoilState } from 'recoil';
import { useCallback, useEffect, useRef, useState } from 'react';

import Main from './Main';
import exifr from 'exifr';

import { boardState, geoState, postState } from '../../../store/stateAtoms';
import { toPng, toBlob } from 'html-to-image';
import { TelegramIcon, TelegramShareButton } from 'react-share';

const Index = () => {
  const { kakao } = window;
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [geoData, setGeoData] = useRecoilState(geoState);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [isMounted, setIsMounted] = useState(false);
  const [completeImageUrl, setCompleteImageUrl] = useState('');
  const [postData, setPostData] = useRecoilState(postState);

  const imageRef = useRef('<div></div>');
  const geocoder = new kakao.maps.services.Geocoder();

  useEffect(() => {
    // try {
    //   alert(geoData.latitude);
    // } catch (error) {}

    console.log('Main 렌더링실행');
    if (postData.imageUrl) {
      setSelectedImage(postData.imageUrl);
    }
  }, []);

  const handleShare = async () => {
    console.log('시작', imageRef.current);
    const newFile = await toBlob(imageRef.current);
    console.log('newFile', newFile);
    // const data = {
    //   files: [
    //     new File([newFile], 'image.png', {
    //       type: newFile.type,
    //     }),
    //   ],
    //   // title: 'myImage',
    //   // text: '왜 안될까.',
    // };
    let files = [
      new File([newFile], 'image.png', {
        type: newFile.type,
      }),
    ];

    const telegramBotUrl = 'https://t.me/share/url?url=' + encodeURIComponent(completeImageUrl);

    try {
      await navigator.share({
        title: 'KT 보드판 점검이미지',
        // text: '',
        files: files,
        // url: 'https://wormwlrm.github.io',
      });
      console.log('공유 성공');
    } catch (e) {
      console.log('공유 실패');
      // alert('공유실패');
    }

    try {
      // window.open('https://telegram.me/share/url?url=' + completeImageUrl);
      // await navigator.share(data);
    } catch (err) {
      // const text = '내용 입력';
      // const url = 'https://sample.com/index.php';
      // alert('에러');
      // alert(completeImageUrl);
      // window.open('https://telegram.me/share/url?url=' + completeImageUrl);
    }
  };

  const handleConfirm = async () => {
    let dataUrl = await toPng(imageRef.current);
    setCompleteImageUrl(dataUrl);
  };

  const handleClick = async () => {
    if (!postData.imageUrl) {
      return;
    }

    let dataUrl;
    try {
      for (let i = 0; i < 3; i++) {
        console.log('png실행', i);
        dataUrl = await toPng(imageRef.current);
      }
      setCompleteImageUrl(dataUrl);
    } catch (error) {}

    if (window.confirm('사진을 다운받으시겠습니까?')) {
    } else {
      return;
    }

    const link = document.createElement('a');
    link.download = 'my-image-name.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let imageAddr = '';
    let imageData = '';

    if (!file) {
      return;
    }

    try {
      reader.onload = () => {
        setSelectedImage(reader.result);
        setPostData({ ...postData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);

      let { latitude, longitude } = await exifr.gps(file);
      let { DateTimeOriginal } = await exifr.parse(file);
      // alert('메타데이터 추출하기', latitude, longitude, DateTimeOriginal);

      // alert(latitude);
      // alert(longitude);
      // console.log('사진 위경도', latitude, longitude);
      imageAddr = await getDetailAddress(latitude, longitude);
      imageData = displayDateTimeParts(DateTimeOriginal);
      // alert(imageAddr);
      // alert(imageData);
    } catch (error) {
      console.log(error);
      if (!geoData.latitude) {
        alert(
          '[오류] 사진의 위치정보가 존재하지 않습니다.\n\nㅇ 위치기반 재촬영 방법 \nAndroid : 1. 설정>위치>사용 활성화 \n2. 카메라>좌측 톱니바퀴 아이콘>위치 태그 활성화 \niOS : 설정>카메라>포맷>높은 호환성>재촬영 후 사진 보관함에서 사진 선택',
        );
        return;
      }

      imageAddr = await getDetailAddress(geoData.latitude, geoData.longitude);
      imageData = displayDateTimeParts(new Date());
    }

    setBoardData(
      boardData.map(data => {
        if (data.title === '점검위치') {
          return { ...data, content: imageAddr };
        }
        if (data.title === '점검일') {
          return { ...data, content: imageData };
        }
        return data;
      }),
    );

    console.log('랜덜');
    let dataUrl = await toPng(imageRef.current);
    setCompleteImageUrl(dataUrl);

    console.log('이게맞나...');
  };

  const displayDateTimeParts = currentDateTime => {
    var year = currentDateTime.getFullYear() + '년';
    var month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2) + '월';
    var day = ('0' + currentDateTime.getDate()).slice(-2) + '일';
    var hour = ('0' + currentDateTime.getHours()).slice(-2) + '시';
    var minute = ('0' + currentDateTime.getMinutes()).slice(-2) + '분';

    return year + ' ' + month + ' ' + day + ' ' + hour + minute;
  };

  // 모바일 IP Local에서 호출실패 -> 도메인 이슈로 예상
  const getDetailAddress = async (latitude, longitude) => {
    const _detailArr = await new Promise((resolve, reject) => {
      geocoder.coord2Address(longitude, latitude, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = !!result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;
          resolve(detailAddr);
        } else {
          console.log('getDetailAddress 불러오기 실패');
          reject(new Error('Geocoding failed'));
        }
      });
    });

    return _detailArr;
  };

  return (
    <Main
      {...{ boardData }}
      {...{ setBoardData }}
      {...{ handleShare }}
      {...{ handleConfirm }}
      {...{ selectedImage }}
      {...{ setSelectedImage }}
      {...{ completeImageUrl }}
      {...{ postData }}
      {...{ setPostData }}
      {...{ handleClick }}
      {...{ handleImageChange }}
      {...{ imageRef }}
    />
  );
};

export default Index;
