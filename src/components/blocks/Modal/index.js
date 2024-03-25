import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { authService, dbService } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Index = ({ modalVisible, setModalVisible }) => {
  const SIGN_IN_FORM = {
    email: '',
    password: '',
    checkedPassword: '',
  };
  const defaultObjectToSend = {
    name: '',
    team: '',
    createdSignAt: '',
    email: '',
    postedBoards: [
      {
        constructionName: '',
        constructionType: '',
        date: '',
        imageUrl: '',
        location: '',
        createdAt: '',
        kind: '',
      },
    ],
  };

  const [signInForm, setSignInForm] = useState(SIGN_IN_FORM);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;

    setSignInForm(prevState => ({
      ...prevState,
      [name]: value,
    }));

    console.log(signInForm);
  };

  const handleSubmit = async () => {
    const { email, password, checkedPassword } = signInForm;
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if ([email, password, checkedPassword].includes('')) {
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
      // createUserWithEmailAndPassword(authService, email, password).then(a => {
      // console.log(a.user);
      // });
      const _userCredential = await createUserWithEmailAndPassword(authService, email, password);
      const { uid } = _userCredential.user;

      console.log('회원가입 성공', uid);

      const userRef = collection(dbService, 'kt-board-firestore');

      if (uid) {
        await setDoc(doc(userRef, uid), {
          ...defaultObjectToSend,
          email: email,
        });

        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal {...{ modalVisible }} {...{ setModalVisible }} {...{ handleChange }} {...{ handleSubmit }} />
    </div>
  );
};

export default Index;
