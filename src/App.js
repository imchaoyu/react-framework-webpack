import { getKeyByDemo } from '@/services/demo';
import { Button } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [data, setData] = useState(null);
  const handleChange = async () => {
    const value = 'wo shi shei a';
    const demoKey = await getKeyByDemo({ name: 'test', age: 10 });
    console.log('demoKey: ', demoKey);
    setData(value);
  };
  return (
    <>
      <Button onClick={handleChange}>点我</Button>
      <div>{data}</div>
      <Outlet />
    </>
  );
}

export default App;
