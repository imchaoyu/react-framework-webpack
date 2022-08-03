import { Button } from 'antd';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const handleChange = () => {
    const value = 'wo shi shei a';
    setData(value);
  };
  return (
    <>
      <Button onClick={handleChange}>点我</Button>
      <div>{data}</div>
    </>
  );
}

export default App;
