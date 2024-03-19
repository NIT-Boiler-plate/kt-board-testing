import { useEffect, useState } from 'react';
import Login from './Login';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../../store/stateAtoms';
import { useRecoilState } from 'recoil';

const Index = () => {
  const LOGIN_FORM = {
    email: '',
    password: '',
  };
  const [loginForm, setLoginForm] = useState(LOGIN_FORM);
  const [userData, setUserData] = useRecoilState(userState);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authService, user => {
      if (user) {
        const uid = user.uid;
        console.log('지금로그인중???', uid);
        setUserData({ ...userData, uid: uid });
        // navigate('/home');
      } else {
        console.log('로그인x');
      }
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(loginForm);
  };

  const handleSubmit = async e => {
    const { email, password } = loginForm;

    e.preventDefault();

    await signInWithEmailAndPassword(authService, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('로그인 버튼 클릭', user);
        // ...
        navigate('/home');
      })
      .catch(error => {
        console.log(error);
        alert('아이디 혹은 비밀번호가 틀렸습니다.');
      });
  };

  return <Login {...{ loginForm }} {...{ handleChange }} {...{ handleSubmit }} />;
};

export default Index;
