import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { collection, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { authService, dbService } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Index = ({ modalVisible, setModalVisible }) => {
  const SIGNIN_FORM = {
    name: '',
    team: '',
    email: '',
    password: '',
    checkedPassword: '',
  };
  const [signInForm, setSignInForm] = useState(SIGNIN_FORM);

  const handleChange = e => {
    const { name, value } = e.target;

    setSignInForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, team, email, password, checkedPassword } = signInForm;
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if ([name, team, email, password, checkedPassword].includes('')) {
      alert('빈칸 없이 입력해주세요.');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    // 비밀번호 유효성 검사
    if (!password || password.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (password !== checkedPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const _userCredential = await createUserWithEmailAndPassword(authService, email, password);
      if (!_userCredential) {
        alert('이미 사용중인 이메일입니다.');
        return;
      }
      const userRef = collection(dbService, process.env.REACT_APP_FIREBASE_COLLECTION);

      if (_userCredential.user) {
        const _dockey = uuidv4();
        await setDoc(doc(userRef, _dockey), {
          uid: _userCredential.user.uid, //firebase 제공 id
          dockey: _dockey, //uuid로 생성한 임의 아이디
          name: name,
          team: team,
          email: email,
          branchType: '서부광역본부',
          centerType: 'ICT기술담당',
          latestBoardType: 1,
          createAt: new Date(),
          // password: password,
        });
      } else {
        alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.log('회원가입 실패', error);
    }
  };

  return (
    <div>
      <Modal {...{ modalVisible }} {...{ setModalVisible }} {...{ handleChange }} {...{ handleSubmit }} />
    </div>
  );
};

export default Index;
