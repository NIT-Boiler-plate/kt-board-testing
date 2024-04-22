import { useEffect, useState } from 'react';
import Board from './Board';
import { useRecoilState } from 'recoil';
import { boardState, userState } from '../../../store/stateAtoms';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { dbService } from '../../../firebase';
import { MANAGE_NUMBER_TITLES } from '../../../constants/home';

//Board의 렌더링과 입력을 책임진다.
const Index = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const { latestBoardType, dockey, name, team } = userData;

  const [selectedIndex, setSelectedIndex] = useState(null);

  // const [usedList, setUesdList] = useState([]);
  const arr = [];

  useEffect(() => {
    async function querySnapShot() {
      const ref = collection(dbService, 'post-collection');

      const q = query(ref, where('uid', '==', userData.uid), where('boardType', '==', latestBoardType));
      const querySnapshot = await getDocs(q);
      const _userData = querySnapshot.docs.map(doc => ({
        ...doc.data(), //합쳐서 보여줌
      }));

      // console.log('_userData는??', _userData);
      _userData.forEach(el => {
        // console.log('지금 타이틀은?', title);
        if (MANAGE_NUMBER_TITLES.includes(userData.title)) {
          console.log('el', el);
          arr.push(el.manageNumber);
        }
      });
    }

    // querySnapShot();
  }, []);

  // 순수하게 현재 boardData만 입력하는 함수
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

  // 1. 드랍다운의 버튼을 클릭한다.
  // 2. index를 얻을 수 있다.
  // 3. 해당 index만 toggle 버튼이 활성화 되게 한다.

  return <Board {...{ selectedIndex }} {...{ setSelectedIndex }} {...{ boardData }} {...{ handleFormChange }} />;
};

export default Index;
