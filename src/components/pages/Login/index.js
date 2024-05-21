import { useState } from 'react';

import Login from './Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const LOGIN_FORM = {
    email: '',
    password: '',
  };
  const [loginForm, setLoginForm] = useState(LOGIN_FORM);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    const { email, password } = loginForm;

    e.preventDefault();

    await signInWithEmailAndPassword(authService, email, password)
      .then(userCredential => {
        if (userCredential.uid) {
          navigate('/home');
        }
      })
      .catch(error => {
        console.log(error);
        alert('아이디 혹은 비밀번호가 틀렸습니다.');
      });
  };

  return <Login {...{ loginForm }} {...{ handleChange }} {...{ handleSubmit }} />;
};

export default Index;
