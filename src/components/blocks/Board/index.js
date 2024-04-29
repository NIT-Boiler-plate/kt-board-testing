import { useEffect, useRef, useState } from 'react';
import Board from './Board';
import { useRecoilState } from 'recoil';
import { boardState, positionState, userState } from '../../../store/stateAtoms';
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { dbService } from '../../../firebase';
import { INSPECTOR_TITLES, LOCATION_TITLES, MANAGE_NUMBER_TITLES } from '../../../constants/home';
import { BOARD_TYPES } from '../../../constants/board';
import { getDetailAddress } from '../../../util/position';
import { DAO, DTO } from '../../../util/data';

//Board의 렌더링과 입력을 책임진다.
const Index = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [positonData, setPositonData] = useRecoilState(positionState);

  const { latestBoardType, name, team, uid } = userData;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [arr, setArr] = useState([]);

  let mountRef = useRef(true);

  // const [usedList, setUesdList] = useState([]);
  // const arr = [];

  useEffect(() => {
    // 지도에서 선택한 위치 존재 시 -> 선택위치로 지정
    if (mountRef.current && positonData['SELECT'].latitude) {
      mountRef.current = false;

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

    // 보드타입 변경 시 마다 초기화
    const _initBoardType = latestBoardType ? latestBoardType : 1;
    setBoardData(
      BOARD_TYPES[_initBoardType].map(data => {
        if (DAO(_initBoardType) === 'OSP_SAFECHECK' && data.title === '점검자') {
          return { ...data, content: team };
        } else if (DAO(_initBoardType) === 'OSP_PATROL' && data.title === '점검자') {
          return { ...data, content: name };
        } else if (DAO(_initBoardType) === 'SRT' && data.title === '점검자') {
          return { ...data, content: name };
        } else if (DAO(_initBoardType) === 'INSPECT_BUILDING' && data.title === '점검자') {
          return { ...data, content: team + ' ' + name };
        }
        return data;
      }),
    );

    // 개인 이력 불러오는 부분
    // 딱 한 번만 불러오는 데이터라서 마운트 값으로 여겨도 될 듯
    // 다만 한 번만 불러오고 싶으면 또 recoil로 새로운 데이터 만들어주긴 해야됨

    async function querySnapShot() {
      //최근 보드 5개 이력 불러오기
      const ref = collection(dbService, 'board-collection');
      const q = query(
        ref,
        where('uid', '==', uid),
        where('boardType', '==', DAO(latestBoardType)),
        orderBy('createAt', 'desc'),
        limit(5),
      );
      const querySnapshot = await getDocs(q);
      const originalData = querySnapshot.docs.map(doc => [
        ...doc.data().postItems, //합쳐서 보여줌
      ]);

      // const newGroupedData = Array.from({ length: originalData[0].length }, () => []);

      const newGroupedData = [[], [], [], [], [], []];
      // console.log('originalData', originalData);
      // 각 배열을 순회하며 데이터를 그룹화
      originalData.forEach(array => {
        array.forEach((item, index) => {
          // 공란과 중복 값 방지

          //공란방지

          if (!item.content) {
            console.log('공란', array);
            return;
          }
          //중복방지 -> 여기서 거르지를 못하네???
          if (newGroupedData[index].includes(item.content)) {
            console.log('이미존재', index, item.content);
            return;
          }

          // 아 위에서는 속성을 비교하고 아래서는 객체를 넣어버리네...
          // 이러니깐안돼지
          newGroupedData[index].push(item);
        });
      });

      setArr(newGroupedData.map(set => Array.from(set)));
    }
    querySnapShot();
  }, [latestBoardType]);

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

  // 해당 드랍다운 버튼을 클릭하면 값이 들어가게한다.
  const handleSelect = (index, value) => {
    console.log('보드에서 핸들샐럭트', index);
    setBoardData(
      boardData.map((data, i) => {
        if (i === index) {
          return { ...data, content: value };
        }
        return data;
      }),
    );
  };

  return (
    <Board
      {...{ arr }}
      {...{ selectedIndex }}
      {...{ setSelectedIndex }}
      {...{ boardData }}
      {...{ handleFormChange }}
      {...{ handleSelect }}
    />
  );
};

export default Index;
