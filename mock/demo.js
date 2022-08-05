import Mock from 'mockjs';
const demoData = () => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(
      Mock.mock({
        id: Mock.Random.guid(),
        serviceName: `${Mock.Random.protocol()} --${Mock.Random.id()}`,
        'port|8000-9000': 1,
        ip: Mock.Random.ip(),
        status: Mock.Random.pick(['passing', 'Critical', 'critical', 'null']),
        'node|0-2': 1,
      }),
    );
  }
  return data;
  // return Mock.mock('/api/v0/key', 'post', demo);
};
export const demo = Mock.mock('/api/v0/key', 'post', demoData);
