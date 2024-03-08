import { useRecoilState } from 'recoil';

import Home from './Home';
import { formState } from '../../../store/stateAtoms';

const Index = () => {
  const [formData, setFormData] = useRecoilState(formState);

  const handleFormChange = (e, index) => {
    console.log('지금폼체인지는?', e, index);
    const { name, value } = e.target;
    setFormData(prevState => {
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
    console.log(formData);
  };

  return (
    <>
      <Home {...{ formData }} {...{ handleFormChange }} {...{ handleSubmit }} />
    </>
  );
};

export default Index;
