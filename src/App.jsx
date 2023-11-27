import axios from 'axios';

const App = async () => {
  try {
    const response = await axios.get('https://map.naver.com/v5/api/bookmark/sync');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return (
    <div className="App">
      <p>안녕</p>
    </div>
  );
};

export default App;
