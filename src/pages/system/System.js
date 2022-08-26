import { useParams } from 'react-router-dom';
const System = () => {
  const params = useParams();
  console.log('params: ', params);
  return <h1>system-{params.id}</h1>;
};
export default System;
