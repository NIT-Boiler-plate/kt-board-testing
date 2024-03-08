import { useRecoilState } from 'recoil';

import Main from './Main';
import { formState } from '../../../store/stateAtoms';

const Index = () => {
  const [formData, setFormData] = useRecoilState(formState);

  return <Main {...{ formData }} />;
};

export default Index;
