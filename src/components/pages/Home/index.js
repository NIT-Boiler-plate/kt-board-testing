import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

import { authService, dbService } from '../../../firebase';
import { boardState, userState } from '../../../store/stateAtoms';
import { onAuthStateChanged } from 'firebase/auth';

import Home from './Home';
import Loding from '../../atoms/Loding';
import { BOARD_BUTTON_LIST, BOARD_TYPES } from '../../../constants/board';

const Index = () => {
  const navigator = useNavigate();
  const imageRef = useRef('<div><div/>');

  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);

  const { latestBoardType, dockey, name, team } = userData;
  const [seletedBoard, setSeletedBoard] = useState(BOARD_BUTTON_LIST[0]);

  useEffect(() => {
    window.history.pushState(null, '', '');
    console.log('latestBoardTyp???e', latestBoardType);

    onAuthStateChanged(authService, user => {
      if (user) {
        console.log('홈페이지 접속', user.uid);
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
      setBoardData(BOARD_TYPES[_userData.latestBoardType ? _userData.latestBoardType : 1]);
      setSeletedBoard(BOARD_BUTTON_LIST[_userData.latestBoardType ? _userData.latestBoardType - 1 : 0]);
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
