import Row from './Row';

const Index = ({ data, index, handleChange, handleSubmit }) => {
  return <Row {...{ data }} {...{ index }} {...{ handleChange }} {...{ handleSubmit }} />;
};

export default Index;
