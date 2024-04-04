import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toPng, toBlob } from 'html-to-image';
import imageCompression from 'browser-image-compression';
import exifr from 'exifr';
import { v4 as uuidv4 } from 'uuid';

import Main from './Main';
import {
  CONSTRUCT_NAME_TITLES,
  DATE_TITLES,
  DESCRIPTION_TITLES,
  INSPECTOR_TITLES,
  INSPECT_NAME_TITLES,
  LOCATION_TITLES,
  MANAGE_NUMBER_TITLES,
  NAME_TITLES,
  NUMBER_TITLES,
  POINT_TITLES,
  RESULT_TITLES,
} from '../../../constants/home';
import { boardState, currentPositionState, postState, selectPositionState, userState } from '../../../store/stateAtoms';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from '../../../firebase';

const Index = () => {
  const { kakao } = window;
  const [selectPositionData, setSelectPositionData] = useRecoilState(selectPositionState);
  const [currentPositionData, setCurrentPositionData] = useRecoilState(currentPositionState);
  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [postData, setPostData] = useRecoilState(postState);

  const [selectedImage, setSelectedImage] = useState(null);
  const [completeImageUrl, setCompleteImageUrl] = useState('');

  const imageRef = useRef('<div></div>');
  const geocoder = new kakao.maps.services.Geocoder();

  useEffect(() => {
    if (postData.attachmentUrl) {
      setSelectedImage(postData.attachmentUrl);
    }
    if (selectPositionData.latitude) {
      let { latitude, longitude } = selectPositionData;

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
  }, []);

  const handleShare = async () => {
    const newFile = await toBlob(imageRef.current);

    let files = [
      new File([newFile], 'image.png', {
        type: newFile.type,
      }),
    ];

    try {
      await navigator.share({
        title: 'KT 보드판 점검이미지',
        files: files,
      });
      console.log('공유 성공');
    } catch (e) {
      console.log('공유 실패');
    }
  };

  const handleConfirm = async () => {
    if (!selectedImage) {
      alert('사진을 선택해주세요.');

      return;
    }
    let dataUrl;
    try {
      for (let i = 0; i < 3; i++) {
        dataUrl = await toPng(imageRef.current);
      }
      setCompleteImageUrl(dataUrl);
    } catch (error) {}
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let imageAddr = '';
    let imageData = '';
    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (!file) {
      return;
    }

    try {
      const compressedFile = await imageCompression(file, options);
      reader.onload = () => {
        setSelectedImage(reader.result);
        setPostData({ ...postData, attachmentUrl: reader.result });
      };
      reader.readAsDataURL(compressedFile);

      let { latitude, longitude } = await exifr.gps(file);
      let { DateTimeOriginal } = await exifr.parse(file);

      imageAddr = await getDetailAddress(latitude, longitude);
      imageData = displayDateTimeParts(DateTimeOriginal);
    } catch (error) {
      console.log(error);
      if (!currentPositionData.latitude) {
        alert(
          '[오류] 사진의 위치정보가 존재하지 않습니다.\n\nㅇ 위치기반 재촬영 방법 \nAndroid : 1. 설정>위치>사용 활성화 \n2. 카메라>좌측 톱니바퀴 아이콘>위치 태그 활성화 \niOS : 설정>카메라>포맷>높은 호환성>재촬영 후 사진 보관함에서 사진 선택',
        );
        return;
      }

      imageAddr = await getDetailAddress(currentPositionData.latitude, currentPositionData.longitude);
      imageData = displayDateTimeParts(new Date());
    }

    setBoardData(
      boardData.map(data => {
        if (LOCATION_TITLES.includes(data.title)) {
          return { ...data, content: imageAddr };
        }
        if (DATE_TITLES.includes(data.title)) {
          return { ...data, content: imageData };
        }
        return data;
      }),
    );

    let dataUrl = await toPng(imageRef.current);
    setCompleteImageUrl(dataUrl);
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

  const handleUpload = async () => {
    if (!postData.attachmentUrl) {
      alert('사진을 업로드 해주세요');
      return;
    }

    if (window.confirm('현재 내용을 서버에 업로드 하시겠습니까?')) {
    } else {
      console.log('취소');
    }

    const data = {
      inspectName: '',
      manageNumber: '',
      constructionName: '',
      constructionType: '',
      constructionDescription: '',
      constructInspector: userData.name,
      addr: '',
      date: '',
      GPSLatitude: selectPositionData.latitude ? selectPositionData.latitude : currentPositionData.latitude,
      GPSLongitude: selectPositionData.longitude ? selectPositionData.longitude : currentPositionData.longitude,
      attachmentUrl: postData.attachmentUrl,
      branchType: '',
      centerType: '',
      boardType: userData.latestBoardType,
      madeBy: userData.name,
      uid: userData.uid,
      createAt: new Date(),
    };

    boardData.forEach(({ title, content }) => {
      console.log(title, content);

      if (INSPECT_NAME_TITLES.includes(title)) {
        data.inspectName = content;
      } else if (MANAGE_NUMBER_TITLES.includes(title)) {
        data.manageNumber = content;
      } else if (CONSTRUCT_NAME_TITLES.includes(title)) {
        data.constructionName = content;
      } else if (DESCRIPTION_TITLES.includes(title)) {
        data.constructionDescription = content;
      } else if (INSPECTOR_TITLES.includes(title)) {
        data.constructInspector = content;
      } else if (LOCATION_TITLES.includes(title)) {
        data.addr = content;
      } else if (DATE_TITLES.includes(title)) {
        data.date = content;
      }
    });
    let docKey = uuidv4();
    await setDoc(doc(dbService, 'post-collection', docKey), data);
  };

  return (
    <Main
      {...{ boardData }}
      {...{ setBoardData }}
      {...{ handleShare }}
      {...{ handleConfirm }}
      {...{ handleUpload }}
      {...{ selectedImage }}
      {...{ setSelectedImage }}
      {...{ completeImageUrl }}
      {...{ postData }}
      {...{ setPostData }}
      {...{ handleImageChange }}
      {...{ imageRef }}
    />
  );
};

export default Index;
