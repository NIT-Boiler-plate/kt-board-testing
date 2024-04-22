import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

import { authService, dbService } from '../../../firebase';
import { boardState, imageUrlState, positionState, userState } from '../../../store/stateAtoms';
import { onAuthStateChanged } from 'firebase/auth';

import Home from './Home';
import Loding from '../../atoms/Loding';
import { BOARD_BUTTON_LIST, BOARD_TYPES } from '../../../constants/board';
import { getDetailAddress } from '../../../util/position';
import { LOCATION_TITLES } from '../../../constants/home';

const Index = () => {
  const navigator = useNavigate();
  const imageRef = useRef('<div><div/>');

  const [positonData, setPositonData] = useRecoilState(positionState);
  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);

  const { latestBoardType, dockey, name, team } = userData;
  const [seletedBoard, setSeletedBoard] = useState(BOARD_BUTTON_LIST[0]);

  useEffect(() => {
    window.history.pushState(null, '', '');

    onAuthStateChanged(authService, user => {
      if (user) {
        querySnapShot(user.uid);
      }
    });

    async function querySnapShot(uid) {
      const q = query(collection(dbService, process.env.REACT_APP_FIREBASE_COLLECTION), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const _userData = querySnapshot.docs.map(doc => ({
        ...doc.data(), //합쳐서 보여줌
      }))[0];

      console.log('_userData 재호출 시점', _userData);
      setUserData(_userData);

      let isEmpty = true;

      boardData.forEach(board => {
        if (board.content) {
          isEmpty = false;
        }
      });

      //보드 초기화 명령어
      if (isEmpty) {
        // 그냥 넣는게 아니라 여기 넣을 때, 초깃값 넣어줘서 해주기
        setBoardData(BOARD_TYPES[_userData.latestBoardType ? _userData.latestBoardType : 1]);
      }
      setSeletedBoard(BOARD_BUTTON_LIST[_userData.latestBoardType ? _userData.latestBoardType - 1 : 0]);
    }

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
  }, []);

  const Logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigator('/');
    });
  };

  // 선택한 드랍다운에서 item의 name과 type을 저장
  // item은 그냥 보여주기만 할거니깐 상관없고, type은 setUserData에 넣어줘야함.
  const handleSelect = async type => {
    console.log('현재클릭', type);

    const collectionRef = doc(dbService, process.env.REACT_APP_FIREBASE_COLLECTION, dockey);
    await updateDoc(collectionRef, {
      latestBoardType: type,
    });

    setUserData({ ...userData, latestBoardType: type });
    setBoardData(BOARD_TYPES[type]);
    BOARD_BUTTON_LIST.forEach((item, i) => {
      if (item.type === type) {
        setSeletedBoard(BOARD_BUTTON_LIST[i]);
      }
    });
  };

  return (
    <>
      {userData.name ? (
        <Home
          {...{ BOARD_BUTTON_LIST }}
          {...{ imageRef }}
          {...{ userData }}
          {...{ seletedBoard }}
          {...{ Logout }}
          {...{ handleSelect }}
        />
      ) : (
        <Loding />
      )}
    </>
  );
};

export default Index;
