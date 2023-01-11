import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const setParams = () => {
    navigate('/system/dashboard/100');
  };
  return (
    <>
      <Button type="primary" onClick={setParams}>
        pararms
      </Button>
      <h1>home</h1>
    </>
  );
};
export default Home;
