import { useEffect } from 'react';
import Board from './Board';
import { useRecoilState } from 'recoil';
import { boardState, userState } from '../../../store/stateAtoms';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '../../../firebase';

const Index = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const { latestBoardType, dockey, name } = userData;

  const BOARD_TYPES = {
    1: [
      { title: '점검명', content: '' },
      { title: '관리번호', content: '' },
      { title: '주소', content: '' },
      { title: '지점', content: '' },
      { title: '날짜', content: '' },
      { title: '점검자', content: name },
    ],
    2: [
      { title: '점검명', content: '' },
      { title: '공사장명', content: '' },
      { title: '주소', content: '' },
      { title: '지점', content: '' },
      { title: '날짜', content: '' },
      { title: '점검자', content: name },
    ],
    3: [
      { title: '점검일시', content: '' },
      { title: '점검자', content: name },
      { title: '점검장소', content: '' },
      { title: '작업내용', content: '' },
      { title: '점검결과', content: '' },
      { title: '', content: '' },
    ],
  };

  useEffect(() => {
    console.log('현재 home에서 받아온 타입', latestBoardType);
    if (boardData.length > 1) {
      setBoardData([...boardData]);
    } else {
      setBoardData(BOARD_TYPES[latestBoardType]);
    }
  }, []);

  const handleFormChange = (e, index) => {
    const { name, value } = e.target;
    setBoardData(prevState => {
      return prevState.map((state, i) => {
        if (i === index) {
          return { ...state, [name]: value };
        }
        return state;
      });
    });
  };

  const handleClick = async type => {
    const collectionRef = doc(dbService, process.env.REACT_APP_FIREBASE_COLLECTION, dockey);
    await updateDoc(collectionRef, {
      latestBoardType: type,
    });
    console.log('업로드하는 type', type);

    setUserData({ ...userData, latestBoardType: type });
    setBoardData(BOARD_TYPES[type]);
  };

  return (
    <Board
      {...{ userData }}
      {...{ setUserData }}
      {...{ latestBoardType }}
      {...{ boardData }}
      {...{ setBoardData }}
      {...{ handleFormChange }}
      {...{ handleClick }}
    />
  );
};

export default Index;
