import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Home from './Home';
import { userState, boardState, geoState } from '../../../store/stateAtoms';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../../../firebase';

const Index = () => {
  const [boardData, setBoardData] = useRecoilState(boardState);
  const [userData, setUserData] = useRecoilState(userState);
  const [geoData, setGeoData] = useRecoilState(geoState);

  useEffect(() => {
    console.log('user', userData);
    // alert('나 홈이야');

    onAuthStateChanged(authService, user => {
      if (user) {
        const _uid = user.uid;
        console.log('홈페이지아이디', _uid);
        setUserData({ ...userData, uid: _uid });
      } else {
        console.log('로그인x');
      }
    });
  }, []);

  const handleFormChange = (e, index) => {
    const { name, value } = e.target;
    setBoardData(prevState => {
      return prevState.map((state, i) => {
        if (i === index) {
          return {
            ...state,
            [name]: value,
          };
        }
        return state;
      });
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 폼 데이터 전송 또는 다른 작업 수행
    console.log(boardData);
  };

  return (
    <>
      <Home {...{ boardData }} {...{ handleFormChange }} {...{ handleSubmit }} />
    </>
  );
};

export default Index;
