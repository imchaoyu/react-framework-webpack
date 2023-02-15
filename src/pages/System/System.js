import { useParams } from 'react-router-dom';
console.log('10000000');
const System = () => {
  const params = useParams();
  console.log('params: ', params);
  return <h1>system-{params.id}</h1>;
};
export default System;
