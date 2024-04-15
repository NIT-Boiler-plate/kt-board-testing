import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from '../../../firebase';
import Row from './Row';
import { userState } from '../../../store/stateAtoms';
import { useRecoilState } from 'recoil';
import { MANAGE_NUMBER_TITLES } from '../../../constants/home';

const Index = ({ userData, boardItem, index, handleFormChange, handleSubmit }) => {
  const [usedList, setUesdList] = useState([]);
  const arr = [];
  const { title, content } = boardItem;
  const { latestBoardType, name, uid } = userData;

  useEffect(() => {
    console.log('현재 row는', title, content);
    async function querySnapShot() {
      const ref = collection(dbService, 'post-collection');

      const q = query(ref, where('uid', '==', uid), where('boardType', '==', latestBoardType));
      const querySnapshot = await getDocs(q);
      const _userData = querySnapshot.docs.map(doc => ({
        ...doc.data(), //합쳐서 보여줌
      }));

      // console.log('_userData는??', _userData);
      _userData.forEach(el => {
        // console.log('지금 타이틀은?', title);
        if (MANAGE_NUMBER_TITLES.includes(title)) {
          console.log('el', el);
          arr.push(el.manageNumber);
        }
      });
    }

    // querySnapShot();
  }, []);

  return <Row {...{ arr }} {...{ boardItem }} {...{ index }} {...{ handleFormChange }} {...{ handleSubmit }} />;
};

export default Index;
