import React from 'react';
import Share from './Share';
import { toBlob } from 'html-to-image';
import { useRecoilState } from 'recoil';
import { boardState, imageUrlState, userState } from '../../../store/stateAtoms';
import { doc, setDoc } from 'firebase/firestore';
import { dbService } from '../../../firebase';
import { DAO } from '../../../util/data';

const Index = ({ imageRef }) => {
  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const { latestBoardType, dockey, name, team } = userData;

  const handleShare = async () => {
    if (!navigator.share) {
      alert('공유 기능을 사용할 수 없는 환경입니다.\n*안드로이드는 크롬브라우저, 아이폰은 사파리를 사용해주세요.');
      return;
    }

    if (!imageUrl['ORIGINAL'].url) {
      alert('사진이 없습니다.');
      return;
    }

    if (window.confirm('사진을 공유하시겠습니까?')) {
    } else {
      console.log('취소');
    }

    const newFile = await toBlob(imageRef.currnet);

    let files = [
      new File([newFile], 'shared-image.png', {
        type: newFile.type,
      }),
    ];

    try {
      await navigator.share({
        title: 'KT 보드판 사진공유',
        files: files,
      });
      console.log('공유 성공');
    } catch (e) {
      console.log('공유 실패');
    }

    const data = {};
    await setDoc(doc(dbService, 'post-collection', DAO(latestBoardType)), data);
  };

  return <Share {...{ handleShare }} />;
};

export default Index;

// const data = {
//   inspectName: '',
//   manageNumber: '',
//   constructionName: '',
//   constructionType: '',
//   constructionDescription: '',
//   constructInspector: userData.name,
//   addr: '',
//   date: '',
//   GPSLatitude: selectPositionData.latitude ? selectPositionData.latitude : currentPositionData.latitude,
//   GPSLongitude: selectPositionData.longitude ? selectPositionData.longitude : currentPositionData.longitude,
//   // attachmentUrl: postData.attachmentUrl,
//   branchType: '',
//   centerType: '',
//   boardType: userData.latestBoardType,
//   madeBy: userData.name,
//   uid: userData.uid,
//   createAt: new Date(),
// };

// boardData.forEach(({ title, content }) => {
//   if (INSPECT_NAME_TITLES.includes(title)) {
//     data.inspectName = content;
//   } else if (MANAGE_NUMBER_TITLES.includes(title)) {
//     data.manageNumber = content;
//   } else if (CONSTRUCT_NAME_TITLES.includes(title)) {
//     data.constructionName = content;
//   } else if (DESCRIPTION_TITLES.includes(title)) {
//     data.constructionDescription = content;
//   } else if (INSPECTOR_TITLES.includes(title)) {
//     data.constructInspector = content;
//   } else if (LOCATION_TITLES.includes(title)) {
//     data.addr = content;
//   } else if (DATE_TITLES.includes(title)) {
//     data.date = content;
//   }
// });
// let docKey = uuidv4();
// await setDoc(doc(dbService, 'post-collection', docKey), data);
